<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import { computed } from "vue";
const props = defineProps<{
  variant: "hidden" | "visible" | "matched" ,
}>();

const classes = computed(() => {
    const { variant } = props;
    return variant === "hidden" ? "bg-tealBlue" : variant === "visible" ? "bg-lightGray" : "bg-yellowOrange";
})
</script>
<template>
  <div :class="twMerge('size-[82px] text-[44px] text-white font-bold rounded-full flex justify-center items-center', classes)">
    <slot />
  </div>
</template>
