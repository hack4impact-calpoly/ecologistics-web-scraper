from chalice import Blueprint

from chalicelib.utils.monterey_county.scrape_hearings import scrape_hearings

monterey_county_blueprint = Blueprint(__name__)


@monterey_county_blueprint.route("/monterey_county")
def hello_world():
    return {"message": "Hello World!"}


@monterey_county_blueprint.route("/monterey_county/hearings", cors=True)
def get_hearings():
    try:
        hearings = scrape_hearings()
        print(hearings)
    except Exception as e:
        pass
    return {"message": "Hello World!"}