<template>
  <div class="select">
    <form @submit.prevent="search">
      <label for="input">{{ label }}</label>
      <div class="select-input">
        <input
          v-model="input"
          type="text"
          id="input"
          :placeholder="placeholder"
        />
        <button :disabled="!input" type="submit"><w-icon-enter /></button>
      </div>
      <ul v-if="suggestions" class="suggestions">
        <template v-if="suggestions.length">
          <li
            ref="suggestions_list"
            class="suggestions__item"
            @click="select(item)"
            v-for="(item, index) in suggestions"
            :key="index"
          >
            {{ utils.getItemTitle(item, visibleFields) }}
          </li>
        </template>
        <li v-else class="suggestions__item">Sorry, no matches...</li>
      </ul>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import WIconEnter from "./icons/WIconEnter.vue";
import { ListItem } from "../types";
import utils from "../utils";

const emits = defineEmits(["search", "selected", "update:modelValue"]);

interface Props {
  modelValue: ListItem[] | null;
  label: string;
  placeholder: string;
  visibleFields: string[];
}
const props = defineProps<Props>();

const suggestions = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});

watch(suggestions, (newVal) => {
  newVal
    ? window.addEventListener("click", closeList)
    : window.removeEventListener("click", closeList);
});

const suggestions_list = ref<HTMLElement[]>([]);
const closeList = (event: Event) => {
  if (!suggestions_list.value.includes(event.target as HTMLElement)) {
    suggestions.value = null;
  }
};

const input = ref<string>("");
const search = () => {
  emits("search", input.value);
};
const select = (item: ListItem) => {
  emits("selected", JSON.parse(JSON.stringify(item)));
  input.value = "";
};
</script>

<style scoped lang="postcss">
.select {
  @apply mt-6 relative;

  .select-input {
    @apply flex;
    input {
      @apply mt-1 mr-4 px-3 py-2 bg-white border border-neutral-600 block w-5/6 sm:text-sm;
      &:focus {
        @apply outline-none border-sky-500 ring-sky-500 ring-1;
      }
    }
    button {
      &:disabled {
        @apply opacity-25;
      }
    }
  }

  .suggestions {
    @apply absolute bg-white p-4 shadow-lg;
    .suggestions__item {
      @apply mb-2 mt-2;
      &:hover {
        @apply opacity-50 cursor-pointer;
      }
    }
  }
}
</style>
