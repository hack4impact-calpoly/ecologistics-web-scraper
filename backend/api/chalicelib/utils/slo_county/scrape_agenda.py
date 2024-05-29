import requests
from bs4 import BeautifulSoup
import re


def scrape_agenda(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")

    scraped_projects = []

    # regex patterns to match project data
    requesting_party_pattern = r"request by\s+(.*?)\s+for a"
    county_file_number_pattern = r"County File (Number|No):\s*(\S+)"
    assessor_parcel_number_pattern = r"Assessor Parcel Numbers?:\s*([\d-]+)"
    date_accepted_pattern = r"Date Accepted:\s*([A-Za-z]+ \d{1,2}, \d{4})"

    agenda_items = soup.find_all("div", class_="meetingitem")
    for item in agenda_items:
        # get content
        content_div = item.find_all("div")[1]
        item_text = content_div.get_text(strip=True)
        if validate_project(item_text):
            # match patterns to extract project data
            requesting_party_match = re.search(requesting_party_pattern, item_text)
            county_file_number_match = re.search(county_file_number_pattern, item_text)
            assessor_parcel_number_match = re.search(
                assessor_parcel_number_pattern, item_text
            )
            date_accepted_match = re.search(date_accepted_pattern, item_text)
            # extract data if match is found
            requesting_party = (
                requesting_party_match.group(1) if requesting_party_match else None
            )
            county_file_number = (
                county_file_number_match.group(2) if county_file_number_match else None
            )
            assessor_parcel_number = (
                assessor_parcel_number_match.group(1)
                if assessor_parcel_number_match
                else None
            )
            date_accepted = (
                date_accepted_match.group(1) if date_accepted_match else None
            )

            scraped_projects.append(
                {
                    "requesting_party": requesting_party,
                    "county_file_number": county_file_number,
                    "assessor_parcel_number": assessor_parcel_number,
                    "date_accepted": date_accepted,
                }
            )
        else:
            continue

    print("Scraped projects: ", scraped_projects)
    return scraped_projects


def validate_project(item):
    pattern = (
        r".*County File (Number|No):.*"
        r"Assessor Parcel Numbers?:.*"
        r"Supervisorial District:.*"
        r"Date Accepted:.*"
        r"Project Manager:.*"
        r"Recommendation:.*"
    )

    # make sure all required project fields are present
    match = re.search(pattern, item, re.DOTALL)

    if match:
        return True
    else:
        return False
