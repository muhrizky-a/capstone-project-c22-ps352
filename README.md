# About
Recapin API is used as a way to access food recipes data and predict food from mobile app. There are two API with configuration steps.

# Member
- Muhammad Rizky Amanullah	- Universitas Mulawarman

# Recipe API
## Setup Firebase
- Create Firebase project <a href="https://console.firebase.google.com/">here</a>.
- Open Project settings > General, save `Web API Key` for Register User (Postman).
- Open Project settings > Service accounts, create and save the Service Account for credentials.

## Setup Firebase Firestore
- Open `Firestore Database` at the sidebar, then Create Database. Check test mode.
- After created, open `Firestore Database` > `Rules`. Edit the rule, and then Publish.
rules_version = '2';
```bash
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
          // request.time < timestamp.date(2022, 7, 1);
    }
  }
}
```

## Deploy to Cloud Run
- Open Google Cloud Shell https://console.cloud.google.com/welcome?project=<PROJECT_ID>&cloudshell=true , then clone the github repository
```bash
git clone https://github.com/muhrizky-a/capstone-project-c22-ps352 --branch api
```
- Move to the cloned directory, and create the ```credentials``` folder
```bash
cd capstone-project-c22-ps352/api-recipe
mkdir credentials
```
- Upload the credential.json that you downloaded earlier, rename the file, and move to the ```credentials``` folder.
```bash
mv <credentials>.json credentials-firebase.json
cp credentials-firebase.json credentials/
```
- Deploy the Recipe API via Cloud Run
```bash
gcloud run deploy
```

