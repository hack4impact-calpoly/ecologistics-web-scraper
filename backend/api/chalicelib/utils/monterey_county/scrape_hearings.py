import requests
import time
from bs4 import BeautifulSoup
from datetime import datetime

from mongodb import get_mongo_client

def scrape_hearings():
    """
    Scrape the upcoming hearing links and dates from the Monterey County Legistar site
    """
    client = get_mongo_client()
    if client:
        try:
            collection = client["monterey"]["hearings"]
        except Exception as e:
            print(f"Failed to connect to hearings collection: {e}")

    url = "https://monterey.legistar.com/Calendar.aspx"
    response = requests.get(url)
    
    soup = BeautifulSoup(response.content, "html.parser")
    upcoming_events_table = soup.find("table", class_="rgMasterTable")
    
    upcoming_hearings = []
    
    if upcoming_events_table:
        events = upcoming_events_table.find_all("tr", class_="rgRow")
        
        for event in events:
            date = event.find("td", class_="rgSorted")
            date_string = date.get_text(strip=True)
            date_time = datetime.strptime(date_string, "%m/%d/%Y %I:%M %p")
            date_unix = int(time.mktime(date_time.timetuple()))
            
            link = event.find("a")
            if link:
                meeting_link = link["href"]
                
                if not in_db(date_unix, collection):
                    
                    collection.insert_one(
                        {"id": date_unix, "link": meeting_link, "date": date_string}
                    )
    else:
        print("Table not found or empty.")
        
    return upcoming_hearings


def in_db(id: int, collection) -> bool:
    """
    Given a meeting id, return if the meeting is in the database
    """
    result = collection.find_one({"id: id"})
    return result is not None
    