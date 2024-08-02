<script setup lang="ts">
import Circle from "@/components/Circle.vue";
import Result from "@/components/Result.vue";
import { computed, ref, watch } from "vue";
import { generateNumbers, formatTime } from "@/lib";
import type { NumberObject, player } from "@/types";
import { twMerge } from "tailwind-merge";
const router = useRouter();
const props = defineProps({
  numPlayers: {
    type: Number,
    default: 1,
  },
  grid: {
    type: Number,
    default: 4,
  },
  theme: {
    type: String,
    default: "numbers",
  },
});

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import PlayerTurn from "@/components/PlayerTurn.vue";
import { useRouter } from "vue-router";

const elements = ref<NumberObject[]>(generateNumbers(props.grid ** 2 / 2, 20));
const selectedNumbers = ref<NumberObject[]>([]);
const matchedPairs = ref<NumberObject[]>([]);
const lastMatchedPair = ref<{ num1: string; num2: string } | null>(null);
const matchedCount = ref(0);
const moveCount = ref(0);
const timer = ref(0);
const currentPlayer = ref<number>(1);
const gameFinished = ref(false);

const players = ref<player[]>(
  Array.from({ length: props.numPlayers }, (_, index) => ({
    id: index + 1,
    points: 0,
  }))
);

function switchPlayer() {
  if (currentPlayer.value < props.numPlayers) {
    currentPlayer.value++;
  } else {
    currentPlayer.value = 1;
  }
}

let timerInterval = setInterval(() => {
  timer.value = timer.value + 1000;
}, 1000);

function revealNumber(id: string) {
  const number = elements.value.find((num) => num.id === id);
  const isAlreadyMatched = matchedPairs.value.some((num) => num.id === id);
  if (number && number.variant !== "matched" && !isAlreadyMatched) {
    const isAlreadySelected = selectedNumbers.value.some((num) => num.id === number.id);
    if (!isAlreadySelected) {
      moveCount.value++;
      selectedNumbers.value.push(number);
    }
    number.variant = "visible";
    checkMatch();
  }
}

watch(lastMatchedPair, () => {
  const { num1, num2 } = lastMatchedPair.value || {};
  if (num1 && num2) {
    unmarkNumbers();
    markMatched(num1);
    markMatched(num2);
  }
});
watch(lastMatchedPair, () => {
  if (isAllMatched()) {

    gameFinished.value = true;
    clearInterval(timerInterval);
  }
});

function checkMatch() {
  if (selectedNumbers.value.length === 2) {
    const [first, second] = selectedNumbers.value;
    if (first.value === second.value) {
      matchedPairs.value.push(first, second);
      lastMatchedPair.value = { num1: first.id, num2: second.id };
      matchedCount.value++;
      players.value[currentPlayer.value - 1].points++;
      switchPlayer();
    } else {
      switchPlayer();

      setTimeout(() => {
        first.variant = "hidden";
        second.variant = "hidden";
      }, 500);
    }
    selectedNumbers.value = [];
  }
}

function markMatched(id: string) {
  const number = elements.value.find((num) => num.id === id);
  if (number) {
    number.variant = "matched";
    number.matched = true;
  }
}

function unmarkNumbers() {
  elements.value.forEach((num) => {
    if (num.variant === "matched") {
      num.variant = "visible";
    }
  });
}
function isAllMatched() {
  return elements.value.every((num) => num.matched);
}
const classes = computed(() => {
  if (props.grid === 4) {
    return { a: "mt-20", b: "mt-20", c: "max-w-[532px]" };
  } else {
    return { a: "mt-20", b: "mt-20", c: "max-w-[572px]" };
  }

});

const showResult =  computed(() => {
  return gameFinished.value === true
})

function Restart() {
  gameFinished.value = false;
  elements.value = generateNumbers(props.grid ** 2 / 2, 20);
  selectedNumbers.value = [];
  matchedPairs.value = [];
  lastMatchedPair.value = null;
  matchedCount.value = 0;
  moveCount.value = 0;
  timer.value = 0;
  currentPlayer.value = 1;
  gameFinished.value = false;
  players.value = players.value.map((player) => ({ ...player, points: 0 }));
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timer.value = timer.value + 1000;
  }, 1000);
}

</script>

<template>
  <main class="container">
    <header class="flex justify-between items-center mt-6">
      <h1 class="text-center text-darkBlue text-[32px] font-bold">memory</h1>
      <div class="flex gap-4">
        <button
          class="bg-yellowOrange text-white rounded-3xl py-3 px-7 font-bold text-xl hover:bg-[#FFB84A] transition"
          @click="Restart"
        >
          <span class="hidden md:block">Restart</span>
          <font-awesome-icon class="md:hidden" :icon="['fas', 'rotate-right']" />
        </button>
        <button
          class="bg-darkLightGray text-tealBlue rounded-3xl py-3 px-7 font-bold text-xl hover:text-white hover:bg-darkerTealBlue transition"
          @click="() => {
            router.push({ name: 'home' });
          }"
        >
          <span class="hidden md:block">New Game</span>
          <font-awesome-icon class="md:hidden" :icon="['fas', 'repeat']" />
        </button>
      </div>
    </header>
    <section
      :class="
        twMerge(
          'flex gap-2 md:gap-4 flex-wrap max-w-[327px]  mx-auto mt-16',
          grid === 4 ? 'md:max-w-[532px]' : 'md:max-w-[572px]'
        )
      "
    >
      <Circle
        v-for="number in elements"
        :theme="props.theme as 'numbers' | 'icons'"
        :key="number.id"
        :value="number.value"
        :grid="props.grid"
        :variant="number.variant as 'hidden' | 'visible' | 'matched' "
        @click="
          () => {
            revealNumber(number.id);
          }
        "
      >
        <div v-if="number.variant !== 'hidden'">
          <p v-if="theme === 'numbers'">{{ number.value }}</p>
          <font-awesome-icon v-else :icon="['fas', number.icon]" />
        </div>
      </Circle>
    </section>
    <section
      v-if="props.numPlayers === 1"
      :class="twMerge('flex gap-6 mx-auto w-fit mb-6', classes.b)"
    >
      <div
        class="flex flex-col md:flex-row justify-between gap-2 items-center md:min-w-[255px] bg-darkLightGray p-5 rounded-[10px] w-[150px] md:w-auto"
      >
        <span class="text-blueDarkGray text-xl font-bold">Time</span>
        <span class="text-tealBlue text-xl font-bold">{{ formatTime(timer) }}</span>
      </div>
      <div
        class="flex flex-col md:flex-row justify-between gap-2 items-center md:min-w-[255px] bg-darkLightGray p-5 rounded-[10px] w-[150px] md:w-auto"
      >
        <span class="text-blueDarkGray text-xl font-bold">Moves</span>
        <span class="text-tealBlue text-xl font-bold">{{ moveCount }}</span>
      </div>
    </section>
    <section v-else :class="twMerge('flex gap-3 mx-auto w-fit mb-6', classes.b)">
      <PlayerTurn
        v-for="i in props.numPlayers"
        :player="i"
        :point="players[i - 1].points"
        :active="currentPlayer === i"
      />
    </section>
    <Result
      @restart="Restart"
      v-if="showResult"
      :players="players"
      :time-elapsed="timer"
      :moves-taken="moveCount"
      :mode="props.numPlayers === 1 ? 'solo' : 'multi'"
    />
  </main>
</template>
<style  >
body {
  background-color: #fcfcfc !important;
}
</style>
