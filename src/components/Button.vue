<script setup lang="ts">
import { twMerge } from 'tailwind-merge';

const props = defineProps<{
  class?: string;
  selected?:Boolean
}>();
</script>

<template>
  <button :class="twMerge(' bold py-2.5 rounded-3xl md:text-[26px] w-full font-bold text-white hover:bg-darkerTealBlue transition ' ,
    props.selected ? 'bg-tealBlue' : 'bg-lightGray', props.class)">
    <slot />
  </button>
</template>
