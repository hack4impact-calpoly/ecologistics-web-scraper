import requests
from bs4 import BeautifulSoup


def scrape_hearings():
    # url = ??
    # response = requests.get(url)

    # soup = BeautifulSoup(response.content, "html.parser")
    # table = soup.find("table", class_="listingTable")

    # detail_links = []

    # Check if the table is found
    # if table:
    #     # Find all <a> tags within <td> tags with class "listItem" and headers "ItemDocumentsUpcoming"
    #     item_detail_links = table.find_all(
    #         'td', class_='listItem', headers='ItemDocumentsUpcoming')

    #     # Extract the href attribute from each <a> tag
    #     for link in item_detail_links:
    #         a_tag = link.find('a')
    #         if a_tag:
    #             detail_links.append(a_tag['href'])

    #     # Print the extracted links
    #     for link in detail_links:
    #         print(link)
    # else:
    #     print("Table not found or empty.")

    # return detail_links
    pass


scrape_hearings()
