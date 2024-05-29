import json
import re
from chalice import Blueprint

import sys
from pathlib import Path

from chalicelib.utils.slo_county.update_metadata import update_metadata

# in the api directory run
# >> python3 routes/slo_county.py
# this is so that we can import local modules by adding
# "direct/path/to/ecologistics-web-scraper/backend" to sys.path
path_root = Path(__file__).parents[2]
sys.path.append(str(path_root))

from chalicelib.utils.slo_county.scrape_hearings import scrape_hearings
from chalicelib.utils.slo_county.scrape_agenda import scrape_agenda
from chalicelib.utils.slo_county.scrape_sch import scrape_sch
from chalicelib.models.project import Project
from chalicelib.mongodb import get_mongo_client

slo_county_blueprint = Blueprint(__name__)


@slo_county_blueprint.route("/slo_county")
def hello_world():
    return {"message": "Hello World!"}


@slo_county_blueprint.route("/slo_county/hearings", cors=True)
def get_hearings():
    try:
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
        
        sch_projects = scrape_sch()
        #iterate through projects, and check if county file number is in sch_projects title. -- if it is, insert necessary data. 
        for project in projects: 
            for title in sch_projects.items():
                if project.county_file_number in title:
                    #updating title
                    project.title = title

                    #updating sch_link
                    project.sch_page_link = sch_projects[title][0]

                    #updating link
                    project.sch_page_link = sch_projects[title][1]

        update_metadata(len(hearings), projects)     
        add_projects_to_mongo(projects)
        
        return {"status": "success", "message": "OK"}, 200
    except Exception as e:
        return {"status": "error", "message": f"Failed to process data: {str(e)}"}, 500

      
def add_projects_to_mongo(projects):
    client = get_mongo_client()

    if client:
        try:
            collection = client["test"]["projects"]
            #collection.drop()
            
            for project in projects:
                collection.insert_one(project.to_dict())               
        except Exception as e:
            print(f"Failed to add hearings to DB: {e}")


@slo_county_blueprint.route("/slo_county/projects", cors=True)
def get_projects():
    client = get_mongo_client()

    if client:
        try:
            collection = client["test"]["projects"]
            projects = list(collection.find({}))
            for project in projects:
                project['_id'] = str(project['_id'])
            return {"projects": projects}
        except Exception as e:
            return {"error": f"Failed to retrieve projects: {e}"}
    else:
        return {"error": "Failed to connect to MongoDB"}


if __name__ == '__main__':
    get_hearings()
