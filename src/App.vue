<script setup lang="ts">
import { ref } from "vue";

const greeting = ref("Hello, World!");
</script>

<template>
  <div class="message">{{ greeting }}</div>
</template>

<style lang="scss">
@import "./styles.scss";
</style>