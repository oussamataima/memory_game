<script setup lang="ts">
import { formatTime } from "@/lib";
import type { player } from "@/types";
import { twMerge } from "tailwind-merge";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const show = ref(true);
const router = useRouter();

const props = defineProps<{
  players: player[];
  timeElapsed: number;
  movesTaken: number;
  mode: string
}>();
defineEmits(['restart'])

function determineWinner() {
  let maxPoints = -Infinity;
  let winners: number[] = [];

  for (let player of props.players) {
    if (player.points > maxPoints) {
      maxPoints = player.points;
      winners = [player.id]; // Start a new winners list
    } else if (player.points === maxPoints) {
      winners.push(player.id); // Add to the winners list
    }
  }
  return winners
}

const result = computed(()=>{
  const winners = determineWinner()
  if(winners.length > 1) {
    return {
      status : 'It’s a tie!',
      winners,
    }
  } else {
    return {
      status : `Player ${winners[0]} Wins!`,
      winners,
    }
  }
})
</script>
<template>
  <div
  v-if="show"
  @click="show = false"
    id="overlay"
    className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 cursor-pointer"
  ></div>

  <section
  v-if="show"
    class="bg-white min-w-[327px] md:min-w-[654px] absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform max-w-[654px] mx-auto p-6 md:px-14 md:pt-[51px] md:pb-[69px] flex flex-col gap-6 rounded-[10px]"
  >
    <div class="flex flex-col gap-2 md:gap-4">
      <h2 class="text-2xl text-darkBlue text-center font-bold md:text-5xl">
        {{ mode === 'solo' ? 'You did it!' :  result.status  }}
      </h2>
      <p class="text-blueDarkGray text-center text-sm font-bold md:text-lg">
        {{
          props.mode === "solo"
            ? "Game over! Here’s how you got on…"
            : "Game over! Here are the results…"
        }}
      </p>
    </div>
    <div v-if="props.mode === 'solo'" class="flex flex-col gap-2 md:gap-4">
      <div class="bg-darkLightGray rounded-md p-4 flex justify-between">
        <span class="text-[13px] font-bold text-blueDarkGray md:text-xl"
          >Time Elapsed</span
        >
        <span class="text-tealBlue font-bold text-xl md:text-[32px]">{{
          formatTime(timeElapsed)
        }}</span>
      </div>
      <div class="bg-darkLightGray rounded-md p-4 flex justify-between">
        <span class="text-[13px] font-bold text-blueDarkGray md:text-xl"
          >Moves Taken</span
        >
        <span class="text-tealBlue font-bold text-xl md:text-[32px]">{{
          movesTaken
        }}</span>
      </div>
    </div>
    <div v-else v-for="player in props.players" class="flex flex-col gap-2 md:gap-4">
      <div :key="player.id" :class="twMerge(' rounded-md p-4 flex justify-between', result.winners.includes(player.id) ? 'bg-darkBlue text-white' : 'bg-darkLightGray')">
        <span :class="twMerge('text-[13px] font-bold text-blueDarkGray md:text-xl', result.winners.includes(player.id) ? 'text-white' : '')"
          >Player {{ player.id }} {{result.winners.includes(player.id) ? '(Winnner!)' : ''}}</span
        >
        <span :class="twMerge('text-tealBlue font-bold text-xl md:text-[32px]', result.winners.includes(player.id) ? 'text-white' : '')">
          {{ player.points }} Pairs
        </span>
      </div>
    </div>
    <div class="flex flex-col gap-4 md:flex-row md:gap-3.5">
      <button
        class="bg-yellowOrange text-white rounded-3xl pt-3 pb-3.5 flex justify-center items-center w-full font-bold text-xl hover:bg-[#FFB84A] transition"
        @click="$emit('restart')"
      >
        Restart
      </button>
      <button
        class="bg-darkLightGray text-tealBlue rounded-3xl pt-3 pb-3.5 flex justify-center items-center w-full font-bold text-xl hover:text-white hover:bg-darkerTealBlue transition"
        @click="() => {
          router.push({ name: 'home' });
        }"
      >
        Setup New Game
      </button>
    </div>
  </section>
</template>
