import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDOy4d4YHg01aUp3e-brGr1eS_WY9NxjBE",
  authDomain: "netflix-clone-6ce04.firebaseapp.com",
  projectId: "netflix-clone-6ce04",
  storageBucket: "netflix-clone-6ce04.firebasestorage.app",
  messagingSenderId: "237569874062",
  appId: "1:237569874062:web:01d5f1ceba120a2c6c11df"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// User Sign Up Function 
const signup = async (name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

// User Log In Function
const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

// User Log Out Function
const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};