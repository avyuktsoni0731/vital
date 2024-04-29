from flask import Flask, jsonify, request
from flask_cors import CORS

from db.vitalDB import VitalDB

from models.models import convo

app = Flask(__name__)
CORS(app)

@app.route('/api/hello')
def hello():
    
    message='Hello from Flask!'
    
    return message

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    google_user_id = data.get('googleUserId')
    
    print(google_user_id)
    
    VitalDB.store_user(google_user_id)
    
    return jsonify({'message': 'Login successful', 'googleUserId': google_user_id}), 200


@app.route('/form/choosegender', methods=['POST'])
def chooseGender():
    data = request.json
    gender = data.get('gender')

    print('Received gender:', gender)
    
    return gender
    

@app.route('/form/allergies', methods=['POST'])
def allergies():
    data = request.json
    allergies = data.get('allergies')

    # print(f"Received allergies from {gender}: {allergies}")
    print(allergies)

    return allergies


@app.route('/form/age', methods=['POST'])
def age():
    data = request.json
    age = data.get('age')

    print(age)
    
    return age


@app.route('/prompt')
def prompt():
    
    convo.send_message(f'i am 44 year old. i am a female. i have allergies from peanuts. i have insomnia too frequently. how can i improve it? give me prompt in the format, 1st->allergies, 2nd->things to avoid that can trigger, 3rd->medicinal supplements that one can have related to it, 4->seeking professional help. make sure prompt is strictly in this format. i want a description regarding them as well, along each point. dont mention description separately, give more information about everything in the same point itself.')
    
    return convo.last.text

if __name__ == "__main__":
  app.run(debug=True)