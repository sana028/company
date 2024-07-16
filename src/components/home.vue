<template>
  <v-app>
    <v-card style="box-shadow: none">
      <v-layout>
        <v-app-bar color="cyan" prominent>
          <v-toolbar-title>My files</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-account" v-bind="props"></v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title>{{ store.name }}</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <RouterLink :to="{ name: 'profile', query: { dialog: dialog } }"><v-list-item-title>
                    <v-btn prepend-icon="mdi-account" @click="profileData()">Edit Profile</v-btn>
                  </v-list-item-title></RouterLink>
              </v-list-item>
              <v-list-item>
                <RouterLink :to="{ name: 'changePassword', query: { dialog: change } }"><v-list-item-title>
                    <v-btn prepend-icon="mdi-lock" @click="changePasswordData()">Change Password</v-btn>
                  </v-list-item-title></RouterLink>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-icon icon="mdi-logout" @click="handleLogout"></v-icon>

          <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
        </v-app-bar>

        <v-main style="height: 100vh;">
          <v-tabs v-model="tab" color="cyan" align-with-title>
            <v-tabs-slider color="yellow"></v-tabs-slider>
            <v-tab v-for="item in tabitems" :key="item">
              {{ item }}
            </v-tab>
          </v-tabs>
          <v-tabs-window v-model="tab">
            <v-tabs-window-item v-for="item in tabitems" :key="item">
              <template v-if="item == 'dashboard' && vehicleStore.brands.length>0">
                <component :is="Dashboard" />
              </template>
              <template v-if="item == 'vehicle'">
                <component :is="Vehicles" />
              </template>
            </v-tabs-window-item>
          </v-tabs-window>
          <v-container>
            <RouterView />
          </v-container>
        </v-main>
      </v-layout>

    </v-card>
  </v-app>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.js';
import { useRouter } from 'vue-router';
import { RouterView, RouterLink } from 'vue-router';
import userRegistrationStore from '../store/userRegistrationStore.js';
import Dashboard from './Dashboard.vue';
import Vehicles from './Vehicles.vue';
import { useVehicleStore } from '../store/userVehicleStore.js';

const tab = ref(null);
const store = userRegistrationStore();
const vehicleStore = useVehicleStore();
const dialog = ref(false);
const change = ref(false);
const router = useRouter();
const drawer = ref(false);
const tabitems = ['dashboard', 'vehicle'];

onMounted(async () => {
  await store.fetchTheUserData(store.uid);
  vehicleStore.fetchAllCompanyVehicle();
});

onUnmounted(()=>{
  vehicleStore.unsubscribeFromVehicles();
})

watch([dialog],async()=>{
  if(dialog.value == true){
    await store.fetchTheUserData(store.uid);
  }
})

const handleLogout = async () => {
  try {
    await signOut(auth);
    store.uid = null;
    router.push({ name: 'signIn' });
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

const profileData = () => {
  dialog.value = true;
}

const changePasswordData = () => {
  change.value = true;
}

</script>
<style scoped>
.nav-bar-style {
  margin-bottom: 40px;
}
</style>