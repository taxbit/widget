<template>
  <TransitionGroup name="list" tag="ul" class="list" @dragover="dropAllow">
    <template v-for="(item, idx) in list" :key="idx">
      <li
        :data-order="idx"
        @dragenter.self="dragenter"
        @dragstart="start"
        @drop="drop"
        class="item"
      >
        <w-icon-hamburger
          @mousedown="startGrab"
          @mouseup="stopGrab"
          class="hamburger"
        />
        <span class="item__title">{{ utils.getItemTitle(item, visibleFields) }}</span>
        <button @click="deleteItem(idx)">
          <w-icon-trash />
        </button>
      </li>
    </template>
  </TransitionGroup>
</template>
<script setup lang="ts">
import { ListItem } from "../types";
import WIconHamburger from "./icons/WIconHamburger.vue";
import WIconTrash from "./icons/WIconTrash.vue";
import { computed } from "vue";
import utils from "../utils";

const emits = defineEmits(["update:modelValue"]);

interface Props {
  modelValue: ListItem[] | null;
  visibleFields: string[];
}
const props = defineProps<Props>();

const list = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});

const startGrab = (e: Event) => {
  (<Element>e.target).closest(".item")?.setAttribute("draggable", "true");
};
const stopGrab = (e: Event) => {
  clearActiveClass(e);
};

const deleteItem = (idx: number) => {
  const temp = [...list.value];
  temp.splice(idx, 1);
  list.value = temp;
};

function swapItems(idx1: number, idx2: number) {
  const tempArr = [...list.value];
  const temp = tempArr[idx1];
  tempArr[idx1] = tempArr[idx2];
  tempArr[idx2] = temp;
  list.value = tempArr;
}

let dragged = null;
const start = (ev: DragEvent) => {
  ev.dataTransfer.effectAllowed = "move";
  dragged = ev.target;
};

const dropAllow = (e: Event) => {
  e.preventDefault();
};

const drop = (e: Event) => {
  e.preventDefault();
  clearActiveClass(e);
  const dragId = dragged?.getAttribute("data-order");
  const dropId = dropTarget?.getAttribute("data-order");
  dragId && dropId && swapItems(dragId, dropId)
  dragged = null;
  dropTarget = null;
};

let dropTarget = null;
const dragenter = (e: Event) => {
  e.preventDefault();
  clearActiveClass(e);
  (<Element>e.target).closest(".item")?.classList.add("active");
  dropTarget = e.target;
};

const clearActiveClass = (e: Event) => {
  const list = (<Element>e.target).closest(".list");
  const items = list.getElementsByClassName("item");
  Array.from(items).forEach(
    (item: HTMLElement) => {
      item != e.target && item.classList.remove("active")
      item.removeAttribute("draggable")
    }
  );
}
</script>
<style lang="postcss">
.list {
  user-select: none;
  .item {
    @apply relative flex justify-between bg-neutral-300 my-2 py-2 pl-2 pr-2;

    &.active {
      @apply bg-neutral-400;
    }

    .item__title {
      @apply w-full flex justify-start pl-1;
    }

    .hamburger {
      @apply cursor-grab;
    }
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
