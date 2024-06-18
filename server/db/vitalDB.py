import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()
mongodb_uri = os.getenv('MONGODB_URI')

client = MongoClient(mongodb_uri)

db = client['vital-test']

class VitalDB():
    
    def create_collection(collectionName):
        
        if collectionName in db.list_collection_names():
            print("Collection already exists.")
            return db[collectionName]
        else:
            db.create_collection(collectionName)
            print("Collection created successfully.")
            return db[collectionName]
        
    
    def store_prompt(emailID, prompt, response):

        collection = db[emailID]

        collection.insert_one({'prompt': prompt, 'response': response})

    
    def user_queries(emailID):
        
        collection = db[emailID]
        breakString = 'how'
        
        all_data = []
        for document in collection.find({}):
            prompt = document["prompt"].partition(breakString)[0]
            response = document["response"]
            all_data.append({"prompt": prompt, "response": response})

        return all_data
    