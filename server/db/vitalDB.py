import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()
mongodb_uri = os.getenv('MONGODB_URI')

client = MongoClient(mongodb_uri)

db = client['vital-test']
collection = db['vital-userData']

class VitalDB():
    
    def store_user(emailId):

        existing_user = collection.find_one({'emailId': emailId})

        if existing_user:
            collection.update_one(
                {'emailId': emailId},
                {
                    '$set': {
                        # 'hashed_password': hashed_password,
                        # 'salt': salt,
                        # 'salted_password': salted_password
                    }
                }
            )
            print("\u2713 User already exists! Updated Credentials")
        else:
            emailId = {
                'emailId': emailId,
                # 'hashed_password': hashed_password,
                # 'salt': salt,
                # 'salted_password': salted_password
            }
            print("\u2713 User Created!")
            collection.insert_one(emailId)