import json
from chalice import Blueprint

import sys
from pathlib import Path

# in the api directory run
# >> python3 routes/slo_county.py
# this is so that we can import local modules by adding
# "direct/path/to/ecologistics-web-scraper/backend" to sys.path
path_root = Path(__file__).parents[2]
sys.path.append(str(path_root))

from api.utils.slo_county.scrape_hearings import scrape_hearings
from api.utils.slo_county.scrape_agenda import scrape_agenda
from api.utils.slo_county.scrape_sch import scrape_sch
from api.models.project import Project
from api.mongodb import get_mongo_client

slo_county_blueprint = Blueprint(__name__)


@slo_county_blueprint.route("/slo_county")
def hello_world():
    return {"message": "Hello World!"}


@slo_county_blueprint.route("/slo_county/hearings", cors=True)
def get_hearings():
    hearings = scrape_hearings()
    projects = []
    for hearing in hearings:
        # scrape projects from each hearing
        hearing_projects = scrape_agenda(hearing["link"])
        for project in hearing_projects:
            # create a Project object for each project
            projects.append(
                Project(
                    county_file_number=project["county_file_number"],
                    hearing_date=hearing["date"],
                    review_status=None,
                    location="San Luis Obispo",
                    apn=project["assessor_parcel_number"],
                    date_accepted=project["date_accepted"],
                    requesting_party=project["requesting_party"],
                    sch_number=None,
                    title=None,
                    public_hearing_agenda_link=hearing["link"],
                    sch_page_link=None,
                    additional_notes=None,
                )
            )

    # sch_projects = scrape_sch()
    # To do: cross-reference projects in sch and fill in missing data

    # TEMPORARY: print out projects for debugging purposes
    for project in projects:
        print(project.county_file_number)
        print(project.apn)
        print(project.date_accepted)
        print(project.requesting_party)
        print(project.public_hearing_agenda_link)
        print(project.hearing_date)

    # serialize projects to json
    projects_dict = [project.to_dict() for project in projects]
    projects_json = json.dumps(projects_dict)
    
    #add_projects_to_mongo(projects_json)

    return {"scraped_projects": projects_json}

def add_projects_to_mongo(projects):
    client = get_mongo_client()

    if client:
        try:
            collection = client["test"]["project"]
            
            for project in projects:
                # URL_as_json = json.dumps({"URL": URL})
                collection.insert_one(project)

        except Exception as e:
            print(f"Failed to add hearings to DB: {e}")

if __name__ == '__main__':
    get_hearings()