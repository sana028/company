<template>
    <div class="pa-4 text-center">
        <v-dialog v-model="dialog" max-width="600">
            <v-card>
                <v-card-title style="color: red;">Delete Vehicle Details</v-card-title>
                <v-card-text>
                    Are you sure you want delete the {{ route.params.id }}
                </v-card-text>
                <v-card-actions>
                    <v-btn color="error" variant="elevated" @click="handleDelete">Delete</v-btn>
                    <v-btn @click="handleClose()" variant="outlined" color="primary">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useVehicleStore } from '../store/userVehicleStore';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const store = useVehicleStore();
const props = defineProps({
    dialog: Boolean,
    vehicleNumber:String,
});
const dialog = ref(props?.dialog);

const handleDelete = async() =>{
  try{
  await store.deleteVehicle(route.params.id);
  alert('Deleted vehicle data successfully');
  router.push({name:'home'});
  }catch(error){
    console.error(error);
  }
}

const handleClose = () =>{
    router.push({name:'home'});
}
</script>
<style scoped>
</style>