<template>
    <section class="settings">
        <div class="header">
            <div class="title">Settings</div>
        </div>
        <ul class="locations">
            <li v-for="(location, idx) in locations" :key="idx" class="location">
                <w-icon-hamburger/>
                <span class="location__item">{{ location.title }}</span>
                <w-icon-trash/>
            </li>
        </ul>
    </section>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import WIconHamburger from './icons/WIconHamburger.vue';
import WIconTrash from './icons/WIconTrash.vue';

const locations = ref([
    {
        title: 'London, UK'
    },
    {
        title: 'New York, US'
    },
])
onMounted(() => {
    
})
</script>

<style lang="postcss" scoped>
.locations {
    .location {
        @apply flex justify-between bg-neutral-300 my-2 py-2 pl-2 pr-2;
        .location__item {
            @apply w-full flex justify-start pl-1;
        }
    }
}
    
</style>