from typing import List
from chalicelib.models.project import Project
from chalicelib.mongodb import get_mongo_client
from datetime import datetime

PROJECTS_DATABASE = "test"
PROJECTS_COLLECTION = "projects"
METADATA_DATABASE = "test"
METADATA_COLLECTION = "scraperMetadata"


def update_metadata(hearingsScraped: int, scrapedProjects: List[Project]):
    newProjects = 0
    newSCHProjects = 0

    client = get_mongo_client()
    if client:
        try:
            metadataCollection = client[METADATA_DATABASE][METADATA_COLLECTION]
            projectsCollection = client[PROJECTS_DATABASE][PROJECTS_COLLECTION]
        except Exception:
            print("A collection was not found")
            return

        # find new projects by county file num and date
        for project in scrapedProjects:
            fileNum = project.county_file_number
            hearingDate = project.hearing_date
            projectMatch = projectsCollection.find_one({'$and': [
                {'county_file_number': fileNum},
                {'hearing_date': hearingDate}
                ]})

            if projectMatch is None:                    # newely scraped
                newProjects += 1
                if project.sch_number is not None:      # contains SCH num
                    newSCHProjects += 1

        # update the metadata document in collection
        # date uses iso format for conversion between
        # python datetime to TS Date objects
        metadataCollection.update_one({}, {
            '$set': {'lastRan': datetime.now().isoformat()},
            '$inc': {
                'totalHearingsScraped': hearingsScraped,
                'totalProjectsScraped': newProjects,
                'totalSCHProjectsScraped': newSCHProjects
                }
            },
            upsert=True
        )
