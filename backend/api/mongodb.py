from pymongo.mongo_client import MongoClient
from dotenv import load_dotenv
import os

def get_mongo_client():
    load_dotenv('../../.env.local')                         #allows access of env variables from .env
    URI = os.getenv('MONGO_URI')

    try:
        client = MongoClient(URI)
        client.admin.command('ping')
        print("Connected")
    except Exception as e:
            print(f"Error connecting to MongoDB: {e}")
            client = None
            
    return client
