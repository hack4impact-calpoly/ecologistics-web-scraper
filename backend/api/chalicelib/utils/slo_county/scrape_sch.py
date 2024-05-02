import requests
from bs4 import BeautifulSoup
from chalice import Chalice


def scrape_sch():
    app = Chalice(app_name="ecologistics-web-scraper")

    url = (
        "https://ceqanet.opr.ca.gov/Search?"
        "LeadAgency=San+Luis+Obispo+County&"
        "County=San+Luis+Obispo"
    )

    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")

    projects_table = soup.find("table", class_="table table-striped")

    project_data = {}  # Key is project title; value is corresponding SCH link

    # Check if the table is found
    if projects_table:
        # Find all <tr> tags (table rows) within projects_table
        # excluding the header row
        projects = projects_table.find_all("tr")[1:]

        for project in projects:
            td_tags = project.find_all("td")
            
            # Get the title
            title = project.find("td", itemprop="name")
            # Extract the title itself from title element
            # assume each project has an associated title
            if title:
                title_text = title.text.strip()

            # Get the SCH link (which is in the first data cell)
            a_tag = td_tags[0].find("a", class_="btn btn-info")
            
            # Extract the href attribute from link element (<a>)
            # Return the absolute link
            if a_tag:
                link = "https://ceqanet.opr.ca.gov" + a_tag.get("href")


            sch_number = td_tags[0].find(itemprop="reportNumber")
            if sch_number:
                sch = sch_number.text.strip()
               

            try:
                # If title and/or a_tag don't exist, then raise an error
                # Else add the title and corresponding SCH link to project_data
                project_data[title_text] = [link, sch ]

            except Exception as e:
                app.log.error(f"The title and/or SCH number don't exist {e}")
                return {"error": "Title and/or SCH number don't exist"}, 404
    else:
        print("Table not found or empty.")

    return project_data

scrape_sch()