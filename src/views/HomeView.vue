<script setup lang="ts">
import { ref, watch } from "vue";
import Button from "@/components/Button.vue";
import PlayView from "./PlayView.vue";

const options = ref({
  theme: "numbers",
  numPlayers: 1,
  grid: 4,
})
// const theme = ref("numbers");
// const numPlayers = ref(1);
// const grid = ref(4);
function toggleTheme() {
  options.value.theme = options.value.theme === "numbers" ? "icons" : "numbers";
}
function toggleGrid() {
  options.value.grid = options.value.grid === 4 ? 6 : 4;
}
function changeNumPlayers(num: number) {
  options.value.numPlayers = num;
}
</script>

<template>
  <main class="min-h-screen bg-darkBlue pb-20 px-4">
    <header class="py-7">
      <h1 class="text-center text-white text-[32px] font-bold">memory</h1>
    </header>
    <section
      class="bg-white rounded-3xl p-6 md:p-14 max-w-[654px] mx-auto flex flex-col gap-6 md:gap-8">
      <div class="flex flex-col gap-2.5">
        <h2 class="text-blueGray text-[15px] font-bold md:text-xl">Select Theme</h2>
        <div class="flex gap-2.5 md:gap-[30px]">
          <Button @click="toggleTheme" :selected="options.theme=== 'numbers'">Numbers</Button>
          <Button @click="toggleTheme" :selected="options.theme === 'icons'">Icons</Button>
        </div>
      </div>
      <div class="flex flex-col gap-2.5">
        <h2 class="text-blueGray text-[15px] font-bold md:text-xl">Numbers of Players</h2>
        <div class="flex gap-2.5 md:gap-[20px]">
          <Button :selected="options.numPlayers === 1" @click="changeNumPlayers(1)">1</Button>
          <Button :selected="options.numPlayers === 2" @click="changeNumPlayers(2)">2</Button>
          <Button :selected="options.numPlayers === 3" @click="changeNumPlayers(3)">3</Button>
          <Button :selected="options.numPlayers === 4" @click="changeNumPlayers(4)">4</Button>
        </div>
      </div>
      <div class="flex flex-col gap-2.5">
        <h2 class="text-blueGray text-[15px] font-bold md:text-xl">Grid Size</h2>
        <div class="flex gap-2.5 md:gap-[30px]">
          <Button @click="toggleGrid" :selected="options.grid === 4">4x4</Button>
          <Button @click="toggleGrid" :selected="options.grid === 6">6x6</Button>
        </div>
      </div>
      <div>
        <button
          class="bg-yellowOrange py-3.5 rounded-3xl text-lg md:text-[32px] md:py-5 w-full font-bold text-white hover:bg-[#FFB84A] transition"
          @click="$router.push({ name: 'play' , query: {...options} })"
        >
          Start Game
        </button>
        <!-- <router-link to="/play" :theme="theme" :numPlayers="numPlayers" :grid="grid">
          <button
            class="bg-yellowOrange py-3.5 rounded-3xl text-lg md:text-[32px] md:py-5 w-full font-bold text-white hover:bg-[#FFB84A] transition"
          >
            Start Game
          </button>
        </router-link> -->
        
      </div>
    </section>
  </main>
</template>
<style >

</style>
