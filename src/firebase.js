import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyABlcC2ob-35DRThVu7mPhh6ZWyGCvkVco",
    authDomain: "netflix-2023-89138.firebaseapp.com",
    projectId: "netflix-2023-89138",
    storageBucket: "netflix-2023-89138.appspot.com",
    messagingSenderId: "883235511837",
    appId: "1:883235511837:web:968e532bef9bc8bd4e30f4"
  };


  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  const auth = getAuth();

  export { auth }
  
  export default db;