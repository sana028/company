import { defineStore } from "pinia";
import { db } from '../firebase.js';
import { collection, doc, getDocs, query, setDoc, where, getDoc, updateDoc } from "firebase/firestore";
import { COMPANY_ADMINS } from "../types/constant.js";
import { SIGNIN, SIGNUP } from '../auth.js';
import { useSessionStorage } from "@vueuse/core";

const userRegistrationStore = defineStore({
    id: 'registrationStore',
    state: () => ({
        company: '',
        uid: useSessionStorage('uid', ''),
        name: '',
        email: '',
        phoneNumber: '',
        location: '',
        role: '',
        userInfo:{},
    }),
    actions: {
        async checkTheUser(data) {
            const docRef = query(collection(db, COMPANY_ADMINS), where('company', '==', data.company));
            const docData = await getDocs(docRef);
            return docData.docs.length !== 0;
        },
        async fetchTheUserData(uid) {
            const docRef = doc(db, COMPANY_ADMINS, uid);
            const docData = await getDoc(docRef);
            const data = docData.data();
            this.uid = uid;
            this.company = data.company;
            this.name = data.name;
            this.email = data.email;
            this.phoneNumber = data.phoneNumber;
            this.location = data.location;
            this.role = data.role
        },
        async register_user(data) {
            const isAdmin = await this.checkTheUser(data);
            const userCredential = await SIGNUP(data.email, data.password);
            const user = userCredential.user;
            const userRef = doc(db, COMPANY_ADMINS, user.uid);
            if (isAdmin) {
                try {
                    await setDoc(userRef, { ...data });
                    await this.fetchTheUserData(user.uid);
                    return true;
                } catch (error) {
                    alert(error);
                }
            } else {
                try {
                    await setDoc(userRef, { ...data, role: 'admin' });
                    await this.fetchTheUserData(user.uid);
                    return true;
                } catch (error) {
                    alert(error);
                }
            }
            return false
        },
        async user_login(data) {
            try {
                const userCredential = await SIGNIN(data.email, data.password);
                const user = userCredential.user;
                await this.fetchTheUserData(user.uid);
                if(user){
                    return user;
                }
            } catch (error) {
                alert(error);
            }
            return false;
        },

        async editTheUserData(data) {
            try {
                const docRef = doc(db, COMPANY_ADMINS, this.uid);
                await updateDoc(docRef, { ...data });
                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        }
    }


});

export default userRegistrationStore;