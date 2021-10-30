import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDNsgzNczwVUIW_5CL9PgnJWHkD1qe7-0s",
  authDomain: "firstloansme-app.firebaseapp.com",
  projectId: "firstloansme-app",
  storageBucket: "firstloansme-app.appspot.com",
  messagingSenderId: "907627674494",
  appId: "1:907627674494:web:37ff7d78d71b708b81d12f",
  measurementId: "G-4LND3HYBNM"
};

const app = initializeApp(firebaseConfig);

export const environment = {
  production: false,
  firebaseConfig,
};