# Vital Web App

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Setting Up Google Cloud Platform (GCP)](#setting-up-google-cloud-platform-gcp)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Vital Web App is a full-stack application designed to help users manage their health by providing personalized advice based on their age, gender, allergies, and health problems. Users can input their data, receive detailed prompts and responses, and view their history of interactions in a dashboard. The application also features Google Maps integration to show nearby hospitals based on the user's location.

## Features

- User authentication with Google using NextAuth
- User-specific storage of prompts and responses in MongoDB
- Dashboard to view historical prompts and responses
- Google Maps integration to display nearby hospitals
- Responsive design using Tailwind CSS

## Technologies Used

- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Flask, Python
- **Database**: MongoDB
- **Authentication**: NextAuth.js with Google provider
- **Hosting**: Render (Backend), Vercel (Frontend)
- **Response Generation & AI Chatbot**: Google Gemini API
- **Maps**: Google Maps API

## Setup and Installation

### Prerequisites

- Node.js and npm
- Python 3.x
- MongoDB
- Google Cloud Platform account for Maps & Gemini API
- Render & Vercel account

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/vital-web-app.git
   cd vital-web-app
   ```
2. **Setup the frontend**:
```bash
cd client
npm install
```
3. **Setup the backend**:
```bash
cd ../server
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
```
4. **Environment Variables**:
- Create a `.env` file in the `server` directory and add your MongoDB connection string (as `MONGODB_URI`) and Google API Key (as `GOOGLE_API_KEY`) for Gemini usage.
- Create a `.env` file in the `client` directory and add your NextAuth Keys (for Google Auth as `GOOGLE_CLIENT_SECRET` and `GOOGLE_CLIENT_ID`) and Google API Key (as `GOOGLE_API_KEY`) for Google Maps API and AI Chatbot.

## Setting Up Google Cloud Platform (GCP)

### Creating OAuth Consent Screen
1. Go to the GCP Console: https://console.cloud.google.com/
2. Create a new project or select an existing project.
3. Navigate to **APIs & Services** > **OAuth consent screen**
4. Configure the consent screen:
   - Choose `External` for user type.
   - Fill in the required fields (app name, user support email, etc.).
   - Add your email to the `Test users` section.
   - Save and continue.
  
### Creating OAuth Credentials
1. Navigate to **API & Services** > **Credentials**.
2. Click **Create Credentials** and choose `OAuth 2.0 Client IDs`.
3. Configure the OAuth consent screen if prompted.
4. Setup the OAuth 2.0 Client ID:
   - Choose `Web application`.
   - Add `Authorized redirect URIs` (e.g., `http://localhost:3000/api/auth/callback/google`).
   - Save the credentials and note down the `Client ID` and `Client Secret`.

### Setting Up Google Maps API
1. Navigate to **APIs & Services** > **Library**.
2. Enable the following APIs:
   - Maps JavaScript API
   - Places API
3. Navigate to **Credentials** and create an API key:
   - Click on generated API key and note it down.
   - (Optional) Restrict the API key to only allow requests from your domains by clicking `Restrict Key` and setting up the restrictions.
4. Creating a Map ID:
   - Navigate to the Google Maps Platform and select `Maps` in the left-hand menu.
   - Click on `Map Management` and then `Create a New Map`.
   - Configure your map setting and save.
   - Copy the `Map ID` provided and note it down.

### Setting Up Google Gemini API Using Google AI Studio
1. Go to Google AI Studio https://ai.google.dev
2. Go to Gemini API and click on **Get API key in Google AI Studio**.
3. Click on the **Get API key** and then click on **Create API key**
4. Create a new project or select an existing one.
5. After selecting the project, select **Create API key in existing project**.
6. Note down the API key.

### Adding Environment Variables

Add the following environment variables to your `.env` file in the `client` directory:
```bash
GOOGLE_CLIENT_ID = your-google-client-id
GOOGLE_CLIENT_SECRET = your-google-client-secret

NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = your-google-maps-api-key
NEXT_PUBLIC_MAP_ID = your-google-map-id
```

Add the following environment variables to your `.env` file in the `server` directory:
```bash
MONGODB_URI = your-mongodb-uri
GOOGLE_API_KEY = your-google-api-key
```

## Running the Application

### Running the Backend
1. Navigate to the `server` directory:
```bash
cd server
```
2. Run the Flask server:
```bash
python app.py
```

### Running the Frontend
1. Navigate to the `client` directory:
```bash
cd client
```
2. Run the Next Application:
```bash
npm run dev
```

## Usage
1. Access the application from your hosted URL.
2. Sign in with Google to authenticate.
3. Input your details (age, gender, allergies, and health problems.)
4. View your personalized health advice.
5. Access the dashboard to view your history.
6. Find nearby hospitals using the integrated Google Maps feature.
7. Interact with the AI Chatbot by Google Gemini API for health-related queries.

## Contributing
Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes/
4. Commit your changes (`git commit -m 'add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](https://github.com/avyuktsoni0731/vitalWebApp/blob/main/LICENSE) file for details.
