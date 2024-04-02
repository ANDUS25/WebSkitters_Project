import { getApp, initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDd-iiXg2bAUbj3Y3otlzhtNx5AaTHsqCs",
  authDomain: "webskitters-ac88f.firebaseapp.com",
  projectId: "webskitters-ac88f",
  storageBucket: "webskitters-ac88f.appspot.com",
  messagingSenderId: "629332288882",
  appId: "1:629332288882:web:958e14a7ae333d41fa29eb"
};


const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, auth, getApp, getAuth };
