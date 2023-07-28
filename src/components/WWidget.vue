<template>
    <section class="grid grid-cols-1">
        <div>
            <w-icon-gear/>
        </div>
        <div class="text-xl">
            {{ `${currentWeather.name}, ${currentWeather.sys?.country}` }}
        </div>
        <section class="text-sm text-gray-500">
            <img v-if="currentWeather.weather?.length"
                :src="`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`">
            <div>
                {{ currentWeather.main?.temp }} °C
            </div>
            <w-icon-wind :deg="currentWeather.wind?.deg" />
            <w-icon-pressure />
        </section>
    </section>
</template>

<script setup lang="ts">
import type { WeatherData } from '../types';
import WIconGear from './WIconGear.vue';
import WIconWind from './WIconWind.vue';
import WIconPressure from './WIconPressure.vue';

interface Props {
    currentWeather: WeatherData;
}
const props = defineProps<Props>()

</script>