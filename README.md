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

## Setup Firebase Firestore
- Create Firebase project <a href="https://console.firebase.google.com/">here</a>.
- Open Project settings > General, save `Web API Key` for Register User (Postman).
- Open Project settings > Service accounts, create and save the Service Account for credentials.
