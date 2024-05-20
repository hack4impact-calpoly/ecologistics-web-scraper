import sys
sys.path.append('../../')
from pymongo.mongo_client import MongoClient
from dotenv import load_dotenv
from chalicelib.mongodb import get_mongo_client

def clear_collections_database(database_name): 
    client = get_mongo_client()
    if client is None:
        print("Failed to connect to MongoDB")
        return
    
    db = client[database_name]
    
    collections_to_clear = ["hearings", "projects", "scraperMetadata"]

    for collection_name in collections_to_clear:
        if collection_name in db.list_collection_names():
            db[collection_name].drop()
            print(f"Collection '{collection_name}' in database '{database_name}' has been cleared.")
        else:
            print(f"Collection '{collection_name}' does not exist in database '{database_name}'.")

    client.close()

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Format must be python3 clear_mongodb.py <database_name>")
    else:
        database_name = sys.argv[1]
        clear_collections_database(database_name)
