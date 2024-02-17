// Import the functions you need from the SDKs you need
import { TypeHTTP, api } from "@/utils/api";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
    apiKey: "AIzaSyCkPPybb56Qf9RFXnJhQyzO2HYYJYVkzhM",
    authDomain: "qichat-bf0be.firebaseapp.com",
    projectId: "qichat-bf0be",
    storageBucket: "qichat-bf0be.appspot.com",
    messagingSenderId: "860142033503",
    appId: "1:860142033503:web:7229dc5f06a6436aa959ea",
    measurementId: "G-MEYXBGPN5N"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

const provider = new GoogleAuthProvider()
export const signWithGoogle = (type) => new Promise((rejects, resolve) => {
    signInWithPopup(auth, provider)
        .then(result => {
            const { email, photoURL } = result.user
            if (type === 'sign-up') {
                api({ body: { email, avatar: photoURL }, path: '/sign-up-with-google', type: TypeHTTP.POST, sendToken: false })
                    .then(user => {
                        rejects(user)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            } else if (type === 'sign-in') {
                api({ body: { email }, path: '/sign-in-with-google', type: TypeHTTP.POST, sendToken: false })
                    .then(user => {
                        rejects(user)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        })
        .catch(error => {
            console.log(error)
        })
})