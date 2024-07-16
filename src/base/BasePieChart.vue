<template>
        <VueApexCharts width="500" height="350" type="pie" :options="chartOptions" :series="series"/>
</template>
<script setup>
import VueApexCharts from 'vue3-apexcharts';
import { useVehicleStore } from '../store/userVehicleStore';
import { ref, onMounted, watch, computed } from 'vue';

const store=useVehicleStore();
const vehicleBrands = ref();
const series = ref([]);

const chartOptions = ref({
  chart: {
    id: 'basic-pie'
  },
  labels: [],
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
    }
  }],
  title: {
    text: 'Vehicle Brands Distribution',
  },
});

onMounted(()=>{
  fetchData();
})

const brands = computed(() =>{
    vehicleBrands.value =store.brands;
    return store.brands;
});

watch([brands],()=>{
  fetchData();
})

const countDuplicates = (brands) => {
  return brands.reduce((acc, brand) => {
    const normalizedBrand = brand.toLowerCase();
    acc[normalizedBrand] = (acc[normalizedBrand] || 0) + 1;
    return acc;
  }, {});
};

const formatDataForChart = (countMap) => {
  const labels = Object.keys(countMap);
  const series = Object.values(countMap);
  return { labels, series };
};

const fetchData = () =>{
  const brandCounts = countDuplicates(vehicleBrands.value);
  const chartData = formatDataForChart(brandCounts);
  chartOptions.value.labels = chartData.labels;
  series.value = chartData.series;
  chartOptions.value = {
    ...chartOptions.value, 
    lables:chartData.labels
  };
}
</script>
