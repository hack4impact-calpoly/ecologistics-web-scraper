from pymongo.mongo_client import MongoClient
import certifi
from dotenv import load_dotenv
import os

load_dotenv()
uri = os.environ.get('MONGO_URI')

# Create a new client and connect to the server
client = MongoClient(uri, tlsCAFile=certifi.where())

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)