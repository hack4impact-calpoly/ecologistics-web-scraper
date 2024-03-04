import requests
import time
from bs4 import BeautifulSoup
from datetime import datetime


def scrape_hearings():
    url = "https://slocounty.granicus.com/ViewPublisher.php?view_id=48"
    response = requests.get(url)

    soup = BeautifulSoup(response.content, "html.parser")
    upcoming_events_table = soup.find("table", class_="listingTable")
    
    detail_links = []
    detail_ids = []

    # Check if the table is found
    if upcoming_events_table:
        # Find all <tr> tags within the upcoming events table
        events = upcoming_events_table.find_all('tr', class_='listingRow')

        for event in events:
            link = event.find(
                'td', class_='listItem', headers='ItemDocumentsUpcoming')

            if link:
                # Extract the href attribute from each <a> tag
                a_tag = link.find('a')
                if a_tag:
                    detail_links.append(a_tag['href'])

                    # Generate unique ID based on time of event
                    date = event.find('td', class_='listItem', headers='Date')
                    date_string = date.get_text(strip=True)
                    id = date_to_unix(date_string)
                    detail_ids.append(id)

        # Print the extracted links
        for i, link in enumerate(detail_links):
            print(link)
            print(detail_ids[i])

    else:
        print("Table not found or empty.")

    return detail_links


def date_to_unix(date: str) -> int:
    '''
    Given a date string of format "January 1, 2024 - 9:00 AM",
    return its unix timestamp
    '''
    date_object = datetime.strptime(date, "%B %d, %Y - %I:%M %p")
    unix_time = time.mktime(date_object.timetuple())
    return int(unix_time)


scrape_hearings()
