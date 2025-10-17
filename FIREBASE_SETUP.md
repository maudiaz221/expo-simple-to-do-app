# Firebase Setup Instructions

## Step 1: Get Your Firebase Config

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Click the gear icon ⚙️ next to "Project Overview"
4. Select "Project settings"
5. Scroll down to "Your apps" section
6. If you don't have a web app yet:
   - Click "Add app" → Select the Web icon `</>`
   - Register your app with a nickname (e.g., "Todo App")
   - Click "Register app"
7. Copy the Firebase configuration object

## Step 2: Update Firebase Config

Open `firebase-config.ts` and replace the placeholder values with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

## Step 3: Enable Email/Password Authentication

1. In Firebase Console, go to **Authentication** in the left sidebar
2. Click **Get started**
3. Go to the **Sign-in method** tab
4. Click on **Email/Password**
5. Enable the first toggle (Email/Password)
6. Click **Save**

## Step 4: Test the App

1. Start your Expo app:
   ```bash
   npm start
   ```

2. Navigate to the login screen
3. Try creating a new account with email/password
4. Try signing in with existing credentials

## Features Implemented

✅ **Sign Up** - Create new accounts with email/password  
✅ **Sign In** - Login with existing credentials  
✅ **Sign Out** - Logout from the app  
✅ **Persistent Auth** - Stay logged in across app restarts  
✅ **Protected Routes** - Automatically redirect to login if not authenticated  
✅ **Error Handling** - User-friendly error messages for common auth errors  

## Auth Flow

```
Login Screen → Sign Up/Sign In → Home Screen → Todos Screen
                                              ↓
                                           Logout → Login Screen
```

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Make sure you've copied the correct Firebase config values
- Ensure all fields in `firebase-config.ts` are filled in

### "Firebase: Error (auth/operation-not-allowed)"
- Go to Firebase Console → Authentication → Sign-in method
- Make sure Email/Password is enabled

### Auth not persisting
- Make sure `@react-native-async-storage/async-storage` is installed
- Clear app cache and restart

## Security Notes

⚠️ **Important**: The Firebase config in this app contains public keys that are safe to expose in client-side code. However, you should:

1. Set up Firebase Security Rules for your database
2. Enable App Check for production apps
3. Use Firebase Cloud Functions for sensitive operations
4. Never commit actual API keys to public repositories (use environment variables for production)

