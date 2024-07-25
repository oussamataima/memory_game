<script setup lang="ts">
import Circle from "@/components/Circle.vue";
import { ref } from "vue";
import { generateNumbers } from "@/lib";
const numbers = ref(1);
const x = generateNumbers(999,1000);
console.log(x)
</script>
<template>
  <main class="max-w-[1110px] mx-auto">
    <header class="flex justify-between items-center mt-8">
      <h1 class="text-center text-darkBlue text-[32px] font-bold">memory</h1>
      <div class="flex gap-4">
        <button
          class="bg-yellowOrange text-white rounded-3xl py-3.5 px-7 font-bold text-xl"
        >
          Restart
        </button>
        <button
          class="bg-darkLightGray text-tealBlue rounded-3xl py-3.5 px-7 font-bold text-xl"
        >
          New Game
        </button>
      </div>
    </header>
    <section class="flex gap-4 flex-wrap max-w-[572px] mx-auto my-16">
      <Circle v-for="number in numbers" :key="number" variant="visible" @click="() => {}">
        <p>{{ number }}</p>
      </Circle>
    </section>
    <section class="flex gap-[30px] mx-auto w-fit">
      <div
        class="flex justify-between items-center md:min-w-[255px] bg-darkLightGray p-5 rounded-[10px]"
      >
        <span class="text-blueDarkGray text-xl font-bold">Time</span>
        <span class="text-tealBlue text-xl font-bold">1:00</span>
      </div>
      <div
        class="flex justify-between items-center md:min-w-[255px] bg-darkLightGray p-5 rounded-[10px]"
      >
        <span class="text-blueDarkGray text-xl font-bold">Moves</span>
        <span class="text-tealBlue text-xl font-bold">0</span>
      </div>
    </section>
  </main>
</template>
<style scoped>
body {
  background-color: #fcfcfc;
}
</style>
