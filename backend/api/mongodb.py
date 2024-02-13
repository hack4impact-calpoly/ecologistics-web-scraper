from pymongo.mongo_client import MongoClient
from dotenv import load_dotenv
import os
import certifi

def get_mongo_client():
    load_dotenv('../../.env.local')                         #allows access of env variables from .env
    URI = os.getenv('MONGO_URI')

    try:
        client = MongoClient(URI, tlsCAFile=certifi.where())
        client.admin.command('ping')                        # confirm connection to db
    except Exception as e:
            print(f"Error connecting to MongoDB: {e}")
            client = None
            
    return client
