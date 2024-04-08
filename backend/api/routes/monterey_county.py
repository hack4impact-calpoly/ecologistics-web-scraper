from chalice import Blueprint

monterey_county_blueprint = Blueprint(__name__)


@monterey_county_blueprint.route("/monterey_county")
def hello_world():
    return {"message": "Hello World!"}
