import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBLAO8wasZUuKXIXsmWf3l0JjMrm5EtlaA',
  authDomain: 'car-trade-4ed8c.firebaseapp.com',
  projectId: 'car-trade-4ed8c',
  storageBucket: 'car-trade-4ed8c.appspot.com',
  messagingSenderId: '132630777898',
  appId: '1:132630777898:web:aeac21b769931c145b7353',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
