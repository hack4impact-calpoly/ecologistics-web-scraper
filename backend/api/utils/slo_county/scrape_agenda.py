import requests
from bs4 import BeautifulSoup

def scrape_agenda(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")

    looking_for_strings = ["County File Number:", "County File No:"]
    agenda_infos = []

    for div in soup.find_all('div'):
        for looking_for_string in looking_for_strings:
            if looking_for_string in div.text:
                important_text = div.text[div.text.find(looking_for_string):]
                agenda_info = [line for line in important_text.splitlines() if line.strip()][0]
                if agenda_info not in agenda_infos:
                    agenda_infos.append(agenda_info)
                
    return agenda_infos