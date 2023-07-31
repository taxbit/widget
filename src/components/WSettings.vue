<template>
  <section class="settings">
    <div class="header">
      <div class="title">Settings</div>
      <button class="close" @click="$emit('close')"><w-icon-close /></button>
    </div>
    <w-drag-list v-model="locations" />
    <w-search-select
      v-model="suggestions"
      @search="search"
      @selected="addLocation"
    />
  </section>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import WIconClose from "./icons/WIconClose.vue";
import WDragList from "./WDragList.vue";
import WSearchSelect from "./WSearchSelect.vue";
import service from "../services/api";
import { Location, LocationRawData } from "../types";

const emit = defineEmits(["updatedLocations", "close"]);

const locations = ref<Location[]>(
  JSON.parse(localStorage.getItem("settings")) || [],
);
watch(
  locations,
  (newVal) => {
    localStorage.setItem("settings", JSON.stringify(newVal));
    emit("updatedLocations");
  },
  { deep: true },
);

const addLocation = (location: LocationRawData) => {
  const { lat, lon, name, country } = location;
  locations.value.push({
    lat,
    lon,
    order: locations.value.length,
    title: name + ", " + country,
  });
  suggestions.value = null;
};

const search = async (input: string) => {
  if (input) {
    suggestions.value = await service.getCoordsByGeo(input);
  }
};

const suggestions = ref<LocationRawData[] | null>(null);
</script>

<style lang="postcss" scoped>
.settings {
  @apply p-6 z-20 rounded-lg bg-white h-full w-80 shadow-lg;

  .header {
    @apply pb-4;

    .close {
      @apply absolute right-6 top-6 opacity-25;
      &:hover {
        @apply opacity-100 cursor-pointer;
      }
    }
  }
}
</style>
