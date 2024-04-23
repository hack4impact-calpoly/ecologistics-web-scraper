from chalice import Chalice
from chalicelib.mongodb import get_mongo_client
from dotenv import load_dotenv
from chalicelib.routes.slo_county import slo_county_blueprint
from chalicelib.routes.sb_county import sb_county_blueprint
from chalicelib.routes.monterey_county import monterey_county_blueprint
from chalicelib.routes.example import example_blueprint


# Load .env file
load_dotenv()

app = Chalice(app_name="api")
app.register_blueprint(slo_county_blueprint)
app.register_blueprint(sb_county_blueprint)
app.register_blueprint(monterey_county_blueprint)
app.register_blueprint(example_blueprint)

client = get_mongo_client()


@app.route("/")
def index():
    return {"hello": "world"}


# The view function above will return {"hello": "world"}
# whenever you make an HTTP GET request to '/'.


# dummy endpoint retuns the data of the first user doc in users collection
@app.route("/test")
def test_endpoint():
    db = client["test"]
    collection = db["users"]
    doc = collection.find_one()

    if doc is not None:
        return {
            "id": str(doc["_id"]),
            "email": doc["email"],
            "password": doc["password"],
        }

# @app.route("/scraping")
# def test_endpoint():
#     try:
#         db = client["test"]
#         collection = db["users"]
#         doc = collection.find_one()

#         if doc is not None:
#             return {
#                 "id": str(doc["_id"]),
#                 "email": doc["email"],
#                 "password": doc["password"],
#             }
#         return {"status": "success", "message": "Data scraped successfully"}
#     except Exception as e:
#         return {"status": "error", "message": str(e)}

# dummy post method
@app.route("/users", methods=["POST"])
def create_user():
    try:
        # This is the JSON body the user sent in their POST request.
        user_as_json = app.current_request.json_body
        collection = client["test"]["users"]

        collection.insert_one(user_as_json)

    except Exception as e:
        print(f"Failed to post: {e}")
