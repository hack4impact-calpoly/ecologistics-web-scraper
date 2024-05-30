from chalice import Blueprint

sb_county_blueprint = Blueprint(__name__)


@sb_county_blueprint.route("/sb_county")
def hello_world():
    return {"message": "Hello World!"}
