# About
Recapin API is used as a way to access food recipes data and predict food from mobile app. There are two API with configuration steps.

# Member
- Muhammad Rizky Amanullah	- Universitas Mulawarman

# Table of Contents
- [Recipe API](#recipe-api)
- [Prediction API](#prediction-api)


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

# Prediction API
## Setup Service Account
- Open Google Cloud Shell https://console.cloud.google.com/welcome?project=<PROJECT_ID>&cloudshell=true
- Create the service account. See tutorial <a href="https://cloud.google.com/iam/docs/creating-managing-service-account-keys">here</a>. Give the service account permission as ```Storage Object Viewer```.
```bash
gcloud iam service-accounts create SERVICE_ACCOUNT_ID \
    --description="DESCRIPTION" \
    --display-name="DISPLAY_NAME"
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member="serviceAccount:SERVICE_ACCOUNT_ID@PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/storage.objectViewer"
```
- Go to service account menu <a href="https://console.cloud.google.com/iam-admin/serviceaccounts">here</a>. Go to the ```Keys``` tab. Add Key > Create New Key. Save the credential.json file for later.
- 
## Setup Cloud Storage
- Create Storage bucket for storing model class.
```bash
gsutil mb gs://YOUR_STORAGE_BUCKET
```
- Create the classes.txt containing array of model class.
```bash
echo '{"classes":["ayam-bakar", "bakso", "gado-gado", "kerak-telor", "kolak", "nasi-goreng", "pempek-palembang", "rendang", "sate-madura", "soto-banjar"]}'  > classes.txt
gsutil cp classes.txt gs://YOUR_STORAGE_BUCKET
```
- 
- Open Project settings > Service accounts, create and save the Service Account for credentials.
# Deploy to Cloud Run
- Open Google Cloud Shell https://console.cloud.google.com/welcome?project=<PROJECT_ID>&cloudshell=true , then clone the github repository
```bash
git clone https://github.com/muhrizky-a/capstone-project-c22-ps352 --branch api
```
- Move to the cloned directory, and create the ```credentials``` folder
```bash
cd capstone-project-c22-ps352/api-predict
mkdir credentials
```
- Upload the credential.json that you downloaded earlier, rename the file, and move to the ```credentials``` folder.
```bash
cp credentials.json credentials/
```
- Edit the .env file to change environtment GOOGLE_APPLICATION_CREDENTIALS and BUCKET_NAME
```bash
nano .env
```
- Deploy the Recipe API via Cloud Run
```bash
gcloud run deploy
```
