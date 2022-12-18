import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDPbMC8MJz0riS_E3zAk6GBqx4t-JtTyqQ',
  authDomain: 'goodcar-c7274.firebaseapp.com',
  projectId: 'goodcar-c7274',
  storageBucket: 'goodcar-c7274.appspot.com',
  messagingSenderId: '574676843454',
  appId: '1:574676843454:web:746ab04090e767347017ef',
  measurementId: 'G-5DNHJ86BXG',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
