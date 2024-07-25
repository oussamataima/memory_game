<script setup lang="ts">
import { twMerge } from 'tailwind-merge';

defineProps<{
    player: Number,
    point: {
        type: Number,
        default: 0
    }
    active: {
        type: Boolean,
        default: false
    }
}>()
</script>
<template>
    <div :class="twMerge(' py-6 px-5 flex justify-between items-center', active ? 'bg-yellowOrange' : 'bg-darkLightGray')">
        <span :class="twMerge(' text-lg font-bold', active ? 'text-white' : 'text-[#7090a4]' )">Player {{ player }}</span>
        <span :class="twMerge('text-[32px] font-bold', active ? 'text-white' : 'text-tealBlue')">{{ point }}</span>
    </div>
</template>
<style scoped>
body {
    background-color: white;
}
</style>