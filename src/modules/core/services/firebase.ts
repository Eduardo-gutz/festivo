import { apiKey, appId, authDomain, messagingSenderId, projectId, storageBucket } from "../utils/environments";
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator, GoogleAuthProvider } from "firebase/auth";
import { Analytics, getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export let analytics: Analytics | undefined

if (typeof window !== 'undefined') {
    const app = initializeApp(firebaseConfig)
    analytics = getAnalytics(app)
  }

