import requests
from bs4 import BeautifulSoup

def scrape_sch():
    url = "https://ceqanet.opr.ca.gov/Search?LeadAgency=San+Luis+Obispo+County&County=San+Luis+Obispo"
    response = requests.get(url)

    soup = BeautifulSoup(response.content, "html.parser")
    projects_table = soup.find("table", class_="table table-striped")
    
    project_data = {} # Key is project title; value is corresponding SCH link

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
            if title: title_text = title.text.strip()
            else: 
                title_text = None
                print("Project has no title \n", project)
            
            # Get the SCH link (which is in the first data cell)
            a_tag = td_tags[0].find("a", class_="btn btn-info")

            # Extract the href attribute from link element (<a>)
            if a_tag: link = a_tag.get('href')
            else: 
                link = None
                print("Project has no SCH link \n", project)
            
            if a_tag and title:
                project_data[title_text] = link
    else:
        print("Table not found or empty.")

    return project_data

data = scrape_sch()
print(data)