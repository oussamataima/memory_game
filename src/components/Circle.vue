<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import { computed, watch } from "vue";
const props = defineProps<{
  variant: "hidden" | "visible" | "matched" ,
  theme: "numbers" | "icons",
  value: number | string,
  grid: number
}>();

const classes = computed(() => {
    const { variant , grid } = props;
    let v =  variant === "hidden" ? "bg-tealBlue" : variant === "visible" ? "bg-lightGray" : "bg-yellowOrange";
    let g = grid == 4 ? "size-[72px] md:size-[118px]" : "size-[47px] md:size-[82px] ";
    return g + " " + v
})
// watch(props, () => {
//     console.log(props.variant);
// })

</script>
<template>
  <div :class="twMerge('size-auto text-2xl md:text-[44px] text-white font-bold rounded-full flex justify-center items-center cursor-pointer transition duration-200 ease-in-out', classes)">
    <!-- <p :if="theme ==='numbers'"></p> -->
     <slot/>
  </div>
</template>
