<template>
  <section class="widget">
    <template v-if="currentWeather">
      <div class="location">
        {{ `${currentWeather.name}, ${currentWeather.sys?.country}` }}
      </div>
      <div class="info info_main">
        <div class="icon icon_main">
          <img :src="`https://openweathermap.org/img/wn/${icon}@2x.png`" />
        </div>
        <span> {{ (currentWeather.main?.temp).toFixed(0) }}°C </span>
      </div>
      <section class="info info_second">
        <div class="info__row">
          <div class="info__col info__col_span2">
            {{ feelsLike }}
          </div>
        </div>
        <div class="info__row">
          <div class="info__col">
            <w-icon-wind class="icon icon_wind" />
            <span>{{ (currentWeather.wind?.speed).toFixed(1) }}m/s</span>
          </div>
          <div class="info__col">
            <w-icon-pressure class="icon icon_pressure" />
            <span>{{ currentWeather.main?.pressure }}hPa</span>
          </div>
        </div>
        <div class="info__row">
          <div class="info__col">
            Humidity: {{ currentWeather.main?.humidity }}%
          </div>
          <div class="info__col">Dew point: {{ 10 }}°C</div>
          <!-- не нашел dew в api -->
        </div>
        <div class="info__row">
          <div class="info__col info__col_span2">
            Visibility: {{ (currentWeather.visibility / 1000).toFixed(1) }}km
          </div>
        </div>
      </section>
    </template>
  </section>
</template>

<script setup lang="ts">
import type { WeatherData } from "../types";
import WIconWind from "./icons/WIconWind.vue";
import WIconPressure from "./icons/WIconPressure.vue";
import { computed } from "vue";

interface Props {
  currentWeather: WeatherData | null;
}
const props = defineProps<Props>();
const icon = computed(
  () =>
    props.currentWeather?.weather?.length &&
    props.currentWeather?.weather[0]?.icon,
);
const feelsLike = computed(() => {
  if (props.currentWeather?.weather?.length) {
    const description =
      props.currentWeather?.weather[0]?.description.charAt(0).toUpperCase() +
      props.currentWeather?.weather[0]?.description.slice(1);
    return `Feels like: ${props.currentWeather.main.feels_like.toFixed(0)}°C. 
                      ${description}.`;
  }
  return "";
});
</script>

<style lang="postcss" scoped>
.widget {
  @apply shadow-lg shadow-slate-300 p-6 mb-6 relative rounded-lg;

  .location {
    @apply text-lg;
  }

  .info {
    &.info_main {
      @apply flex text-4xl font-semibold whitespace-nowrap items-center justify-items-center;
    }

    &.info_second {
      @apply grid grid-cols-1 gap-y-3 text-sm text-gray-500;

      .info__row {
        @apply flex items-stretch w-full;

        .info__col {
          @apply flex w-1/2;

          &.info__col_span2 {
            @apply w-full;
          }
        }
      }
    }
  }

  .icon {
    &.icon_wind,
    &.icon_pressure {
      @apply mr-1;
    }
  }
}
</style>
