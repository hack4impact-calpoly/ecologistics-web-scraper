from chalice import Blueprint
import requests
from bs4 import BeautifulSoup

example_blueprint = Blueprint(__name__)


@example_blueprint.route("/example")
def hello_world():
    # Make a request to target website
    response = requests.get("https://en.wikipedia.org/wiki/Batman")
    # Parse the HTML content of the website
    soup = BeautifulSoup(response.content, "html.parser")
    # Find the first h1 tag
    h1_tag = soup.find("h1")
    # Get the contents of the h1 tag
    h1_contents = h1_tag.text

    return {"message": h1_contents}
