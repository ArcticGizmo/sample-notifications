# Ionic Client
This is an ionic client (web+android) that can listen for Firebase notifications

# Configuration

## Web
To get all your firebase credentials, open [General Settings](https://console.firebase.google.com/project/_/settings/general/) and scroll to the bottom and select `web` application. You should see some config like follows

```js
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
```

**You will need to put this information in multiple places**
First, copy `.env.template` to create a `.env.local` file, and populate the file based on the information above

Second, copy `public/firebase-messaging-sw.js.template` to create `public/firebase-messaging-ws.js` and past your config there


### Vapid ID
You will also need to get a `Vapid` key when using notifications on the web client

- Open [Cloud Messaging](https://console.firebase.google.com/project/_/settings/cloudmessaging/)
- Scroll down to `Web Configuration`
- Click `Generate Key Pair `
- The string is your `vapid key`
- Save this in your projects `.env.local` file under `VUE_APP_FIREBASE_VAPID_KEY`

_This was adapted from [stackoverflow](https://stackoverflow.com/questions/54996206/firebase-cloud-messaging-where-to-find-public-vapid-key#:~:text=Vapid%20Key%20is%20%22Voluntary%20Application,tab%2C%20click%20Generate%20Key%20Pair.)_

## Android
You will need to add the file android/app/google-services.json to allow connection to firebase. You should set up an android app by following https://firebase.google.com/docs/android/setup, then

- [general settings](https://console.firebase.google.com/project/_/settings/general)
- Scroll down to `Your Apps`
- select the `Android`
- download the `google-services.json` file
- save file in your project as `android/app/google-services.json`


# Install
```
yarn install
```

# Run
```
# web
yarn serv

# android
yarn dev
```
