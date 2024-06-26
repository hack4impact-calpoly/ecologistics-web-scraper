import requests
import time
from bs4 import BeautifulSoup
from datetime import datetime

# in the utils directory run
# >> python slo_county/scrape_hearings.py
# this is so that we can import local modules by adding
# "direct/path/to/ecologistics-web-scraper/backend/api/chalicelib" to sys.path
import sys
from pathlib import Path

path_root = Path(__file__).parents[2]
sys.path.append(str(path_root))

from mongodb import get_mongo_client

def scrape_hearings():
    # Set up MongoDB Connection
    client = get_mongo_client()
    if client:
        try:
            collection = client["test"]["hearings"]
        except Exception as e:
            print(f"Failed to connect to hearings collection: {e}")
    
    url = "https://slocounty.granicus.com/ViewPublisher.php?view_id=48"
    response = requests.get(url)

    soup = BeautifulSoup(response.content, "html.parser")
    upcoming_events_table = soup.find("table", class_="listingTable")

    upcoming_hearings = []

    # Check if the table is found
    if upcoming_events_table:
        # Find all <tr> tags within the upcoming events table
        events = upcoming_events_table.find_all("tr", class_="listingRow")

        for event in events:
            link = event.find("td", class_="listItem", headers="ItemDocumentsUpcoming")

            if link:
                # Extract the href attribute from each <a> tag
                a_tag = link.find("a")
                if a_tag:
                    meeting_link = a_tag["href"]
                    date = event.find("td", class_="listItem", headers="Date")
                    if date.get_text(strip=True) == "Watch Live Video|Listen to Live Audio":
                        continue
                    date_string = date.get_text(strip=True).replace("\xa0", " ")

                    # Generate unique ID based on time of event
                    id = date_to_unix(date_string)
                    if not in_db(id, collection):
                        print(f"adding project with id {id} to [test][hearing] collection")
                        upcoming_hearings.append(
                            {"link": meeting_link, "date": date_string}
                        )
                        collection.insert_one(
                            {"id": id, "link": meeting_link, "date": date_string}
                        )
    else:
        print("Table not found or empty.")

    return upcoming_hearings


def date_to_unix(date: str) -> int:
    """
    Given a date string of format "January 1, 2024 - 9:00 AM",
    return its unix timestamp
    """
    date_object = datetime.strptime(date, "%B %d, %Y - %I:%M %p")
    unix_time = time.mktime(date_object.timetuple())
    return int(unix_time)


def in_db(id: int, collection) -> bool:
    """
    Given a meeting id, return if the meeting is in the database
    """
    # connect to mongoDB database
    # loop through all meetings in the mongoDB database
    #   if the meeting id is stored
    #       check for equality
    #   if the date is stored but not the id
    #       convert date to unixtime/id
    #       check for equality
    #   if the link is stored but neither the date nor id are
    #       scrape the link and grab the date of the meeting
    #       convert date to unixtime/id
    #       check for equality
    result = collection.find_one({"id": id})
    return True if result is not None else False