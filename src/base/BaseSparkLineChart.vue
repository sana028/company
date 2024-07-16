<template>
    <div class="sales-chart">
        <VueApexCharts width="500" height="150"type="area" :options="chartOptions" :series="series" />
    </div>
</template>
<script setup>
import VueApexCharts from 'vue3-apexcharts';
import { ref, onMounted, computed, watch } from 'vue';
import { useVehicleStore } from '../store/userVehicleStore';

const vehicleItem = ref();
const series = ref([{ name: 'Sales', data: [] }]); 
const store = useVehicleStore();
const chartOptions = ref({
    series: [{
          data: []
        }],
        chart: {
          type: 'area',
          height: 160,
          sparkline: {
            enabled: true
          },
        },
        stroke: {
          curve: 'straight'
        },
        fill: {
          opacity: 0.3
        },
        xaxis: {
          crosshairs: {
            width: 1
          },
        },
       
        title: {
          text: '',
          offsetX: 0,
          style: {
            fontSize: '24px',
          }
        },
        subtitle: {
          text: 'Profits',
          offsetX: 0,
          style: {
            fontSize: '14px',
          }
        }
});

onMounted(() => {
     fetchData();
});

const vehicles = computed(async() =>{
  vehicleItem.value = store.vehicles;
    return store.vehicles;
});

watch([vehicles],()=>{
  fetchData();
})

const fetchData = () => {
    const salesByYear = vehicleItem.value.reduce((acc, vehicle) => {
        const year = vehicle.purchasedYear;
        const price = parseFloat(vehicle.price);
        if (!acc[year]) {
            acc[year] = 0;
        }
        acc[year] += price;
        return acc;
    }, {});
    const totalSales = Object.values(salesByYear).reduce((sum, sales) => sum + sales, 0);
    const years = Object.keys(salesByYear).sort();
    const salesData = years.map(year => salesByYear[year]);
    chartOptions.value.xaxis.categories = years;
    chartOptions.value.title.text = `Total Sales: $${totalSales.toFixed(2)}`;
    series.value[0].data = salesData;
    chartOptions.value = {
    ...chartOptions.value, 
    series:[{
      data: salesData
    }],
    xaxis: {
      ...chartOptions.value.xaxis,
      categories: years
    },
    title: {
      ...chartOptions.value.title,
      text: ` $${totalSales.toFixed(2)}`
    }
  };
};
</script>
<style scoped>
.sales-chart{
    padding:10px;
    
}
</style>