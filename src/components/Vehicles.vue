<template>
    <div class="container">
        <div class="btn-pos" v-if="userStore.role === 'admin'">
            <RouterLink :to="{ name: 'add' }"><v-btn color="primary" size="large" type="button" variant="elevated"
                    prepend-icon="mdi-plus" @click="addData">Add</v-btn></RouterLink>
        </div>
        <v-data-table-server :headers="headers" :items="vehicles" :items-length="totalItems" :loading="loading"
            class="custom-data-table">
            <template v-slot:[`item.actions`]="{ item }">
                <RouterLink :to="{ name:'edit',params:{id:item.vehicleNumber} }" ><v-icon class="me-2" size="small" @click="editItem(item)">
                        mdi-pencil
                    </v-icon></RouterLink>
                <RouterLink :to="{ name: 'delete',params:{id:item.vehicleNumber} }" v-if="userStore.role === 'admin'"><v-icon size="small" color="error" @click="deleteItem(item)">
                        mdi-delete
                    </v-icon></RouterLink>
            </template>
        </v-data-table-server>
        <RouterView :dialog="dialog" :type="type" :vehicleNumber="editingData"  />
    </div>
</template>

<script setup>
import { ref, onMounted, watch,onUnmounted, computed } from 'vue'
import { RouterView, RouterLink } from 'vue-router';
import { useVehicleStore } from '../store/userVehicleStore';
import { useRoute } from 'vue-router';
import userRegistrationStore from '../store/userRegistrationStore';

const route = useRoute();
const store = useVehicleStore();
const userStore = userRegistrationStore();
const dialog = ref(false);
const type= ref('');
const editingData = ref();
const vehicleItems = ref([]);
const totalItems = ref(0);
const headers = [
  { title: 'Vehicle Number ', align: 'start', sortable: false, key: 'vehicleNumber' },
  { title: 'Vehicle Type', key: 'vehicleType' },
  { title: 'Brand', key: 'brand' },
  { title: 'Purchased Year', key: 'purchasedYear' },
  {title:'Price', key:'price'},
  { title: 'Color', key: 'color' },
  { title: 'Actions', key: 'actions', sortable: false },
]
onMounted(async()=>{
  vehicleItems.value =  store.vehicles;
});

const vehicles = computed(() =>{
    return store.vehicles
});
const addData = () => {
    type.value = 'Add';
    dialog.value = true;
}

const editItem = (item) =>{
    editingData.value = item.vehicleNumber;
    type.value = 'Edit';
    dialog.value = true;
}

const deleteItem=(item)=>{
    dialog.value = true;
}

</script>
<style scoped>
.custom-data-table {
    border: 1px solid #80808070;
    border-radius: 10px;
}

.container {
    margin: 30px;

}

.btn-pos {
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-end;
}
</style>