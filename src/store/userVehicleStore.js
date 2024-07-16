import { defineStore } from "pinia";
import { collection, setDoc, getDocs, getDoc, doc, updateDoc, query, where, onSnapshot, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { COMPANY_ADMINS, VEHICLES } from "../types/constant";
import userRegistrationStore from "./userRegistrationStore";
import { ref } from "vue";
import axios from 'axios';

export const useVehicleStore = defineStore('vehicle', () => {
    const vehicles = ref([]);
    const store = userRegistrationStore();
    const brands = ref([]);
    const vehicleNumber = ref('');
    const unsubscribe = ref();

    const addVehicle = async (vehicle) => {
        const docRef = doc(db, VEHICLES, vehicle.vehicleNumber);
        try {
            await setDoc(docRef, { ...vehicle, company: store.company });
        } catch (error) {
            console.error(error);
        }
    };

    const editVehicle = async (vehicle) => {
        const docRef = doc(db, VEHICLES, vehicle.vehicleNumber);
        vehicleNumber.value = vehicle.vehicleNumber;
        try {
            await updateDoc(docRef, { ...vehicle });

        } catch (error) {
            console.error(error);
        }
    };

    const deleteVehicle = async (vehicleNumber) => {
        const docRef = doc(db, VEHICLES, vehicleNumber);
        try {
            await deleteDoc(docRef);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchAllCompanyVehicle = () => {
        const docRef = collection(db, VEHICLES);
        const dataRef = query(docRef, where('company', '==', store.company));
        unsubscribe.value = onSnapshot(dataRef, (snapshot) => {
            vehicles.value = [];
            snapshot.forEach((doc) => {
                vehicles.value.push(doc.data());
            });
            const uniqueBrands = vehicles.value.map(vehicle => vehicle.brand);
            brands.value = uniqueBrands;
        }, (error) => {
            console.error(error);
        });
    }
   const unsubscribeFromVehicles = () => {
        if (unsubscribe.value) {
            unsubscribe.value();
            unsubscribe.value = null;
        }
    }

    const getVehicleById = async (id) => {
        const docRef = doc(db, VEHICLES, id);
        try {
            const data = await getDoc(docRef);
            return data.data();
        } catch (error) {
            console.error(error);
        }
    };

    const checkVehicleNumber = async (number) => {
        const docRef = collection(db, VEHICLES);
        const dataRef = query(docRef, where('vehicleNumber', '==', number));
        const data = await getDocs(dataRef)
        return data.docs.length != 0;
    };

    const fetchAdminEmail = async() => {
        const collRef = collection(db, COMPANY_ADMINS);
        const docRef = query(collRef, where('role', '==', 'admin'), where('company', '==', store.company));
        const querySnapshot = await getDocs(docRef);
        const adminData = querySnapshot.docs.map(doc => doc.data());
        const email = adminData[0].email;
        const name = adminData[0].name
        return {email,name};
    }


    const sendEmailToAdmin = async () => {
        const {email,name} = await fetchAdminEmail();
        const subject = `Updated ${vehicleNumber.value} vehicle data`;
        const message = ` Hi ${name},\n\n There is an update of ${vehicleNumber.value} vehicle number data by ${store.name}`;
        const body = {
            from:store.email,
            to:email,
            subject:subject,
            message:message,
        }
        const url = process.env.VITE_SERVER_URL;
        try {
            await axios.post(url+'send-email', {
              ...body
            });
          } catch (error) {
            console.error('Error sending email:', error.message);
          }
    }

    return { addVehicle, editVehicle, deleteVehicle, fetchAllCompanyVehicle, getVehicleById, checkVehicleNumber, vehicles, brands, sendEmailToAdmin,unsubscribeFromVehicles }

})