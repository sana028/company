<template>
    <v-container>
        <v-dialog v-model="popup" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">Change Password</span>
                </v-card-title>

                <v-card-text>
                    <v-form ref="form" v-model="popup" lazy-validation>
                        <v-text-field v-model="password" :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showNewPassword ? 'text' : 'password'" name="password" label="New Password"
                            @click:append="showNewPassword = !showNewPassword"></v-text-field>

                        <v-text-field v-model="confirmPassword"
                            :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showConfirmPassword ? 'text' : 'password'" name="confirm-password"
                            label="Confirm Password"
                            @click:append="showConfirmPassword = !showConfirmPassword"></v-text-field>
                    </v-form>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancelTheDialog">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="submit">Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { updateThePassword } from '../auth';
import userRegistrationStore from '../store/userRegistrationStore';

const store = userRegistrationStore();
const router = useRouter();
const route = useRoute();
const password = ref('');
const confirmPassword = ref('');
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);
const popup = ref(route.query.dialog);


const submit = async () => {
    if ((password.value.length && confirmPassword.value.length) >= 8) {
        if (password.value == confirmPassword.value) {
            await updateThePassword(password.value).then(async (res) => {
                if (res) {
                    const result = await store.editTheUserData({ password: password.value });
                    if (result) {
                        router.push({ name: 'home' });
                    }
                }else{
                    router.push({ name: 'signIn' });
                }

            }).catch((error) => {
                alert(error);
            })
        }
        else {
            alert("Password and Confirm Password must be same");
        }
    }
    else {
        alert("Password must be atleast 8 characters long");
    }
}

const cancelTheDialog = () => {
    router.go('-1');
}

</script>
<style scoped></style>