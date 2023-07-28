
<template>
  <section class="md:container md:mx-auto">
    <section class="grid grid-cols-1">
      <w-widget class="w-64 rounded-lg" :current-weather="currentWeather" />
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import WWidget from './components/WWidget.vue'
import type { WeatherData, Coordinates } from "./types";
import weatherService from './services/api'

const coords = ref<Coordinates>({
  latitude: null,
  longitude: null,
})

const currentWeather = ref<WeatherData | null>(null)

watch(coords, async (newCoords) => updateWidget(newCoords))
const updateWidget = async (coords: Coordinates) => {
  if (coords.latitude) {
    currentWeather.value = await weatherService.getCurrentWeather(coords)
  }
}

const timer = ref()
onMounted(()=>timer.value = setInterval(()=>updateWidget(coords.value), 60000))
onBeforeUnmount(() => clearInterval(timer.value)),

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