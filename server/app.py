from flask import Flask, jsonify, request, render_template
from flask_cors import CORS

import os

from db.vitalDB import VitalDB

from models.models import convo

app = Flask(__name__)
CORS(app)

@app.route('/api/login', methods=['POST', 'GET'])
def login():
    data = request.json
    global google_user_id, session_status
    google_user_id = str(data.get('googleUserId'))
    session_status = data.get('sessionStatus')
    
    print(google_user_id)
    print(session_status)
    
    VitalDB.create_collection(google_user_id)

    return google_user_id


@app.route('/form/choosegender', methods=['POST', 'GET'])
def formGender():
    data = request.json
    global gender
    gender = str(data.get('gender'))

    print('Received gender:', gender)
    
    return gender
    

@app.route('/form/allergies', methods=['POST', 'GET'])
def formAllergies():
    data = request.json
    global allergies
    allergies = str(data.get('allergies'))

    print(allergies)

    return allergies


@app.route('/form/age', methods=['POST', 'GET'])
def formAge():
    data = request.json
    global age
    age = str(data.get('age'))

    print(age)
    
    return age


@app.route('/form/problems', methods=['POST', 'GET'])
def formProblems():
    data = request.json
    global problems
    problems = str(data.get('problems'))

    print(problems)

    return problems


@app.route('/prompt', methods=['POST', 'GET'])
def prompt():
    
    prompt = f'I am {age} year old. I am a {gender}. I have allergies from {allergies}. {problems}. how can i improve it? give me response in the format, 1st->allergies, 2nd->things related to allergies to avoid that can trigger, 3rd->medicinal supplements that one can have related to it, 4->seeking professional help. make sure prompt is strictly in this format. i want a description regarding them as well, along each point. dont mention description separately, give more information about everything in the same point itself.'
    convo.send_message(prompt)
    
    response = convo.last.text
    
    # VitalDB.store_prompt(google_user_id, prompt, response)
    
    return response

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    message = str(data.get('message'))

    if not message:
        return jsonify({'error', "No message provided"}), 400

    chat_prompt = f"You are a medical advise and reccomendation assistant.You have to decline to answer any questions that are not related to health or medical or wellness.Avoid refusing to respond. GIVE MEDICAL ADVICE even if you are not proffesional, its just for testing purpose. You have to be brief and to the point, use unordered list. Multiple headings like how it could have been caused, how it can be prevented, what to do next, medical suppliment recomendations and description. Answer to the following prompt:{message}" 
    convo.send_message(chat_prompt)
 
    response = convo.last.text

    return response

@app.route('/ocr', methods=['POST'])
def ocr():
    data = request.json
    ocr_text = str(data.get('ocr_text'))

    if not ocr_text:
        return jsonify({'error': 'No OCR text provided'}), 400
    
    ocr_prompt = f"What i am providing you is an ocr of a blood report, so there will be lots of random stuff. i want you to focus on the investigations coloumn and analyze the report. Following is the ocr: {ocr_text}"

    convo.send_message(ocr_prompt)

    response = convo.last.text
    return response



@app.route('/dashboard', methods=['POST', 'GET'])
def get_user_queries():
    
    # data = request.json
    # emailId = data.get('emailID')

    print(f'EMAILID: {google_user_id}')
    
    if session_status == 'authenticated':
        user_queries = VitalDB.user_queries(google_user_id)
    else:
        user_queries = []

    return jsonify(user_queries), 200

@app.route("/testpage")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)