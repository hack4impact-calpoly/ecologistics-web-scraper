from chalice import Chalice
import mongodb
import json

app = Chalice(app_name="api")

client = mongodb.get_mongo_client()


@app.route("/")
def index():
    return {"hello": "world"}

# The view function above will return {"hello": "world"}
# whenever you make an HTTP GET request to '/'.

# dummy endpoint
@app.route("/test")
def sample_comment():
    db = client["test"]
    collection = db["users"]
    doc = collection.find_one()
    return {"hi": "hello"}

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
