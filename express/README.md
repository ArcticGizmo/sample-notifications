# Express API

This is an express API for the sample notification example. This allows communication via
- Firebase FCM
- MagicBell
- Courier
To either the Ionic application, or the Vue SPA

# Setup

## Configuration
In your environment files, you will need to specify
- COURIER_API_KEY -> https://app.courier.com/channels/courier
- COURIER_EMAIL_TARGET -> your email
- COURIER_PUSH_NOTIFICATION_TEMPLATE -> template id for a push channel
- COURIER_EMAIL_TEMPLATE -> template id for a email channel
- COURIER_IN_APP_TEMAPLTE -> template id for an in app channel

- FIREBASE_PROJECT_ID -> firebase project id

- MAGIC_BELL_API_KEY -> https://app.magicbell.com/projects -> settings -> general
- MAGIC_BELL_SECRET_KEY -> https://app.magicbell.com/projects -> settings -> general
- MAGIC_BELL_USER_EMAIL -> your email

**Google Service Account**
- open [Cloud Messaging Settings](https://console.firebase.google.com/project/_/settings/cloudmessaging)
- select Manage service accounts
- select your account from the list (you will most likely have one)
- select keys from the tabs at the top of the page
- select Add Keys → Create new key
- select JSON
- select Create
- **Save the downloaded file somewhere safe**
- save it at the root of your express project as `service-account.json`


NB: you can really save it anywhere, you will just need to set `GOOGLE_APPLICATION_CREDENTIALS` as a path to the file

## Install
```
yarn install
```

## Run
```
yarn serve
```

# Caching
When devices are registered against this API, they are locally stored in `registration.json` so that devices are saved between restarts (make it easier to make changes). Just delete the file if you would like to clear the cache, and restart the application