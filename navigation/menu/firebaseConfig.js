import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB2a-0c7MMpZw_Zmrx-LUnze8or2Th8hDE",
    authDomain: "software-project2-fcbcd.firebaseapp.com",
    databaseURL: "https://software-project2-fcbcd-default-rtdb.firebaseio.com",
    projectId: "software-project2-fcbcd",
    storageBucket: "software-project2-fcbcd.appspot.com",
    messagingSenderId: "958631652393",
    appId: "1:958631652393:web:ddc15783c1b1a2ccf4c038",
    measurementId: "G-QR7JESPXK1"
  };

  const app = initializeApp(firebaseConfig);
  export const db = getDatabase(app);
  export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage) // 변수 이름 수정
  });