<template>
    {{ popup }}
    <div class="pa-4 text-center">
        <v-dialog v-model="popup" max-width="600">
            <div class="container">
                <form>
                    <h3>Edit Profile</h3>
                    <div class="form">
                        <div class="form-group">
                            <label for="fullname">Full Name:<span class="required">*</span></label>
                            <input type="text" id="fullname" name="fullname" placeholder="Enter your name"
                                v-model="name" required>
                        </div>
                        <div class="form-group">
                            <label for="fullname">Email:</label>
                            <input type="email" id="email" name="email" v-model="store.email" disabled>
                        </div>
                    </div>
                    <div class="form">
                        <div class="form-group">
                            <label for="fullname">Phone number:<span class="required">*</span></label>
                            <input type="text" id="phone" name="phone" placeholder="Enter your phone number"
                                v-model="phoneNumber" required>
                        </div>
                        <div class="form-group">
                            <label for="fullname">Company Name:</label>
                            <input type="text" id="company" name="company" v-model="store.company" disabled>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="fullname">Address:</label>
                        <input type="text" id="location" name="location" placeholder="Enter your address" v-model="address">
                    </div>
                    <div class="btn">
                        <v-btn color="warning" variant="flat" @click.prevent="EditTheUserData()">Edit</v-btn>
                        <v-btn color="primary" variant="outlined" @click="cancelTheEditing()">Cancel</v-btn>
                    </div>
                </form>
            </div>
        </v-dialog>
    </div>
</template>
<script setup>
import { watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import userRegistrationStore from '../store/userRegistrationStore';
import routers from '../routers';

const store = userRegistrationStore();
const route = useRoute();
const props = defineProps({
    dialog: {
        type: Boolean,
        require: true
    }
});

const popup = ref(route?.query?.dialog);
const name = ref(store.name);
const phoneNumber = ref(store.phoneNumber);
const address = ref(store.location);

const EditTheUserData = () => {
    const data = {
        name: name.value,
        phoneNumber: phoneNumber.value,
        location: address.value
    }
    if (name.value && phoneNumber.value && address.value) {
        const result = store.editTheUserData(data);
        if (result) {
            alert('updated the profile');
        } else {
            alert('There is some error in updating');

        }
        popup.value = false;
        routers.push({ name: 'home' });
    } else {
        alert('Please fill all the fields');
    }

}

const cancelTheEditing = () => {
    routers.go(-1);
}


</script>
<style scoped>
h3 {
    text-align: center;
    margin-bottom: 10px;
}

.container {
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: white;
    padding: 25px;
}

.form-group {
    margin-bottom: 20px;
    margin-right: 4px;
}

label {
    display: block;
    margin-bottom: 5px;
    color: #555;
}

.v-btn {
    margin-right: 5px;
}

.btn {
    display: flex;
    justify-content: flex-end;
}

input[type="text"],
input[type="email"],
input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-sizing: border-box;
    font-size: 16px;
}

.form {
    display: flex;
    justify-content: space-between;
}

.required {
    color: #FF0000;
    /* red color */
    font-weight: bold;
}

label {
    display: flex;
}
</style>