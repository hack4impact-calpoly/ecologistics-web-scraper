from chalice import Blueprint

slo_county_blueprint = Blueprint(__name__)

@slo_county_blueprint.route('/')
def hello_world():
    return {'message': 'Hello World!'}