<template>
  <section class="wrapper">
    <section class="widgets">
      <button class="gear" @click="showSettings = true">
        <w-icon-gear />
      </button>
      <transition name="fade">
        <div v-if="!showSettings && weatherList?.length">
          <w-widget
            v-for="(weather, index) in weatherList"
            :key="index"
            :current-weather="weather"
          />
        </div>
      </transition>
      <transition name="fade">
        <w-settings
          v-if="showSettings"
          @updated-locations="locationsUpdated"
          @close="showSettings = false"
        />
      </transition>
    </section>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import WWidget from "./components/WWidget.vue";
import type { WeatherData, Coordinates, Location } from "./types";
import service from "./services/api";
import WSettings from "./components/WSettings.vue";
import WIconGear from "./components/icons/WIconGear.vue";

const locations = ref<Location[]>([]);

const locationsUpdated = async () => {
  locations.value = JSON.parse(localStorage.getItem("settings"));
  const reqs = locations.value.map((location) => {
    return service.getCurrentWeather({ lat: location.lat, lon: location.lon });
  });
  weatherList.value = await Promise.all(reqs)
};
onMounted(() => locationsUpdated());

const weatherList = ref<WeatherData[] | null>(null);

onMounted(() => {
  // navigator.geolocation.getCurrentPosition(
  //   (position) => (coords.value = position.coords),
  //   (err) => console.warn(`ERROR(${err.code}): ${err.message}`),
  //   {
  //     enableHighAccuracy: true,
  //     timeout: 5000,
  //     maximumAge: 0,
  //   },
  // );
});

const showSettings = ref<boolean>(false);
</script>

<style scoped lang="postcss">
.wrapper {
  @apply md:container md:mx-auto;

  .widgets {
    @apply flex flex-col relative w-80;

    .gear {
      @apply absolute right-6 top-8 opacity-25 hover:opacity-100 hover:cursor-pointer z-10;
    }
  }
}

.fade-enter-active {
  @apply duration-300 ease-out;
}

.fade-enter-from {
  @apply transform opacity-0 scale-75;
}

.fade-enter-to {
  @apply opacity-100 scale-100;
}

.fade-leave-active {
  @apply transform duration-0 ease-linear;
}

.fade-leave-from {
  @apply opacity-10 scale-100;
}

.fade-leave-to {
  @apply opacity-0 scale-0;
}
</style>
