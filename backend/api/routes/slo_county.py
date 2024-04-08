from chalice import Blueprint
from utils.slo_county.scrape_hearings import scrape_hearings
from utils.slo_county.scrape_agenda import scrape_agenda

# from mongodb import get_mongo_client
# import json

slo_county_blueprint = Blueprint(__name__)


@slo_county_blueprint.route("/slo_county")
def hello_world():
    return {"message": "Hello World!"}


@slo_county_blueprint.route("/slo_county/hearings")
def get_hearings():
    hearings = scrape_hearings()
    hearing_agendas = []
    for hearing_url in hearings:
        agenda = scrape_agenda(hearing_url)
        hearing_agendas.append(agenda)      
        # could switch this to "extend" if we want one list of all agendas.
        # Currently with "append" we get a list of lists, with 
        # each list corresponding to the agendas for one hearing

    return {"current hearing agendas": hearing_agendas}  

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

@slo_county_blueprint.route("/slo_county/atest")
# this is just to test functionality, can & should be removed
def test_scrape_agenda():
    agenda = scrape_agenda("http://agenda.slocounty.ca.gov/iip/sanluisobispo/meeting/details/1697")
    
    return {"agenda": agenda}
