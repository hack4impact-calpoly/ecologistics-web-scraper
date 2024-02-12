from chalice import Chalice
from dotenv import load_dotenv
from routes.slo_county import slo_county_blueprint

# Load .env file
load_dotenv()

app = Chalice(app_name="api")
app.register_blueprint(slo_county_blueprint)


@app.route("/")
def index():
    return {"hello": "world"}


# The view function above will return {"hello": "world"}
# whenever you make an HTTP GET request to '/'.
#
# Here are a few more examples:
#
# @app.route('/hello/{name}')
# def hello_name(name):
#    # '/hello/james' -> {"hello": "james"}
#    return {'hello': name}
#
# @app.route('/users', methods=['POST'])
# def create_user():
#     # This is the JSON body the user sent in their POST request.
#     user_as_json = app.current_request.json_body
#     # We'll echo the json body back to the user in a 'user' key.
#     return {'user': user_as_json}
#
# See the README documentation for more examples.
#
