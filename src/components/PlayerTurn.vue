<script setup lang="ts">
import { twMerge } from 'tailwind-merge';



defineProps<{
    player: Number,
    point: Number,
    active?: Boolean
}>()

</script>
<template>
    <div :class="twMerge('w-16 md:w-[164px] xl:w-[255px]  py-3.5 px-4 xl:py-6 xl:px-5 flex flex-col xl:flex-row justify-between items-center rounded-md md:items-start gap-0.5 animate', active ? 'bg-yellowOrange' : 'bg-darkLightGray')">
        <span :class="twMerge('hidden md:block text-[15px] xl:text-lg font-bold xl:self-center', active ? 'text-white' : 'text-[#7090a4]' )">Player {{ player }}</span>
        <span :class="twMerge('md:hidden text-[15px] xl:text-lg font-bold', active ? 'text-white' : 'text-[#7090a4]' )">P{{ player }}</span>
        <span :class="twMerge('text-[24px] xl:text-[32px] font-bold', active ? 'text-white' : 'text-tealBlue')">{{ point }}</span>
    </div>
</template>
<style scoped>
body {
    background-color: white;
}
</style>