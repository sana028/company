<template>
  <v-container>
    <v-dialog v-model="dalog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ props?.type }} Vehicle</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="dalog" lazy-validation>
            <template v-if="props?.type=='Edit'">
                 <v-card-text style="display: flex;"><h4>Vehicle Number</h4> : {{vehicleData.vehicleNumber}}</v-card-text>
            </template>
            <v-text-field v-model="vehicleData.vehicleNumber" label="Vehicle Number" type="text" v-if="props?.type!=='Edit'"></v-text-field>
            <v-text-field v-model="vehicleData.vehicleType" label="vehicle Type" type="text"></v-text-field>

            <v-text-field v-model="vehicleData.brand" label="Brand" type="text"></v-text-field>

            <v-text-field v-model="vehicleData.purchasedYear" label="Year" type="number"></v-text-field>

            <v-text-field v-model="vehicleData.price" label="Price" type="number"></v-text-field>

            <v-text-field v-model="vehicleData.color" label="Color" type="text"></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancelTheDialog">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="submit" v-if="props?.type!=='Edit'">Submit</v-btn>
          <v-btn color="blue darken-1" text @click="update" v-if="props?.type=='Edit'">Update</v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { useVehicleStore } from '../store/userVehicleStore';
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();
const store = useVehicleStore();
const props = defineProps({
  dialog: Boolean,
  type:String,
  vehicleNumber: String,
});
const dalog = ref(props?.dialog);
const id = ref(route.params.id);
const vehicleData = ref({
  vehicleNumber: '',
  vehicleType: '',
  brand: '',
  purchasedYear: '',
  price: 0,
  color: ''
});

onMounted(async () => {
  if(props?.type === 'Edit'){
      vehicleData.value = await store.getVehicleById(id.value);
  }
})

const submit = async () => {
  try {
    if (!await store.checkVehicleNumber(vehicleData.value.vehicleNumber)) {
      await store.addVehicle(vehicleData.value);
      alert('Added vehicle data');
      router.push({name:'home'});
    } else {
      alert('Vehicle number already exists');
    }
  } catch (error) {
    console.error(error);
  }
}

const update =  async()=>{
  try {
    await store.editVehicle(vehicleData.value);
    await store.sendEmailToAdmin();
    alert('Vehicle data updated');
    router.push({name:'home'});
  }catch(error){
    console.error(error);
    alert('there is some network error , try again');
    router.push({name:'home'});
  }
}
const cancelTheDialog = () => {
  router.push({name:'home'});
}

</script>

<style scoped>
.headline {
  font-weight: bold;
}
</style>