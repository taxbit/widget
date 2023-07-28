
<template>
  <section v-if="currentWeather">
    <w-widget :current-weather="currentWeather" />
    <pre>
      <!-- {{ currentWeather }} -->
    </pre>
  </section>
  <section v-else>
      ...loading
  </section>
  
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import WWidget from './components/WWidget.vue'
import type { WeatherData } from "./types";

const coords = ref<Record<'latitude' | 'longitude', string | number | null>>({
  latitude: null,
  longitude: null,
})

const currentWeather = ref<WeatherData | null>(null)

watch(coords, (newCoords) => {
  if (newCoords.latitude) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${coords.value.latitude}&lon=${coords.value.longitude}&appid=f0d4a01d87c5141a346fe655299db639`)
      .then((res) => res.json())
      .then((data: WeatherData) => {
        currentWeather.value = data
      })
  }
})

onMounted(() => {
  navigator.geolocation.getCurrentPosition(
    (position) => coords.value = position.coords,
    (err) => console.warn(`ERROR(${err.code}): ${err.message}`),
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }
  );
})

</script>