<script setup lang="ts">
import { ref, watch } from "vue";
import Button from "@/components/Button.vue";

const theme = ref("numbers");
const numPlayers = ref(1);
const grid = ref(4);
function toggleTheme() {
  theme.value = theme.value === "numbers" ? "icons" : "numbers";
}
function toggleGrid() {
  grid.value = grid.value === 4 ? 6 : 4;
}
function changeNumPlayers(num: number) {
  numPlayers.value = num;
}
</script>

<template>
  <main class="min-h-screen">
    <header class="pt-14 pb-7">
      <h1 class="text-center text-white text-[32px] font-bold">memory</h1>
    </header>
    <section
      class="bg-white rounded-3xl p-6 md:p-14 max-w-[654px] mx-auto flex flex-col gap-6 md:gap-8 mb-32"
    >
      <div class="flex flex-col gap-2.5">
        <h2 class="text-blueGray text-[15px] font-bold md:text-xl">Select Theme</h2>
        <div class="flex gap-2.5 md:gap-[30px]">
          <Button @click="toggleTheme" :selected="theme === 'numbers'">Numbers</Button>
          <Button @click="toggleTheme" :selected="theme === 'icons'">Icons</Button>
        </div>
      </div>
      <div class="flex flex-col gap-2.5">
        <h2 class="text-blueGray text-[15px] font-bold md:text-xl">Numbers of Players</h2>
        <div class="flex gap-2.5 md:gap-[20px]">
          <Button :selected="numPlayers === 1" @click="changeNumPlayers(1)">1</Button>
          <Button :selected="numPlayers === 2" @click="changeNumPlayers(2)">2</Button>
          <Button :selected="numPlayers === 3" @click="changeNumPlayers(3)">3</Button>
          <Button :selected="numPlayers === 4" @click="changeNumPlayers(4)">4</Button>
        </div>
      </div>
      <div class="flex flex-col gap-2.5">
        <h2 class="text-blueGray text-[15px] font-bold md:text-xl">Grid Size</h2>
        <div class="flex gap-2.5 md:gap-[30px]">
          <Button @click="toggleGrid" :selected="grid === 4">4x4</Button>
          <Button @click="toggleGrid" :selected="grid === 6">6x6</Button>
        </div>
      </div>
      <div>
        <button
          class="bg-yellowOrange py-3.5 rounded-3xl text-lg md:text-[32px] md:py-5 w-full font-bold text-white hover:bg-[#FFB84A] transition"
          @click="() => {$router.push('/play')}"
        >
          Start Game
        </button>
      </div>
    </section>
  </main>
</template>
<style scoped>
body {
  @apply bg-darkBlue;
}
</style>
