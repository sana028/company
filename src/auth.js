/* eslint-disable no-unused-vars */
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, sendEmailVerification,updatePassword, sendPasswordResetEmail, reauthenticateWithCredential} from "firebase/auth";
import { auth } from '../src/firebase.js';

const SIGNUP = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential;
        await sendEmailVerification(userCredential.user);
        return user;
    }
    catch (error) {
        alert(error);
        throw new Error('Network Error : ' + error)
    }
}

const SIGNIN = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (userCredential) {
            const user = userCredential;

            return user;
        }
    }
    catch (error) {
        alert('create new account')
        throw new Error('Network Error : ' + error)
    }
}

const updateThePassword = async(newPassword) =>{
    try {
        await updatePassword(auth.currentUser, newPassword);
        alert('Password changed successfully');
        return true; 
    } catch (error) {
        alert('Your login session time is expired. Please try to login again');
        return false; 
    }
}

const sendThePasswordResetEmail = async(email) =>{
  await sendPasswordResetEmail(auth,email).then((res)=>{
    if(res){
        alert('Reset Email sent to your email account');
    }
  }).catch((error)=>{
    console.error(error);
  })
}

export { SIGNIN, SIGNUP , updateThePassword, sendThePasswordResetEmail}