# Notification Dashboard
This is a notification dashboard that can be used as a central hub to send some notifications to the Ionic/vue subpackages

# Pages
There are three Pages

## Firebase
- send notification to a registered device (hit refresh once you have registered the Ionic device to see it as an option)
- Broadcast on the topic `general_alerts`
    - registered devices will automatically subscribe to this topic

## Courier
- send notification to a registered device (same as above)
- send to a specific email
- send to the Vue SPA using In-App messaging
    - user ids can be found under https://app.courier.com/users


## MagicBell
- send to either a device, email, or in app

# Install
```
yarn install
```

# Run
```
yarn serve
```