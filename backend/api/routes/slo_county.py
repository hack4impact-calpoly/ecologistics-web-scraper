from chalice import Blueprint
from utils.slo_county.scrape_hearings import scrape_hearings

# from mongodb import get_mongo_client
# import json

slo_county_blueprint = Blueprint(__name__)


@slo_county_blueprint.route("/slo_county")
def hello_world():
    return {"message": "Hello World!"}


@slo_county_blueprint.route("/slo_county/hearings")
def get_hearings():
    hearings = scrape_hearings()
    return {"current hearings": hearings}  # returns list of URLS, remove later

    # Code for adding the returned URLS to our database
    # Will need to import json, and get_mongo_client

    # client = get_mongo_client()

    # if client:
    #     try:
    #         collection = client["nameOfDB"]["nameOfCollection"]

    #         for URL in hearings:
    #             URL_as_json = json.dumps({"URL": URL})
    #             collection.insert_one(URL_as_json)

    #     except Exception as e:
    #         print(f"Failed to add hearings to DB: {e}")
