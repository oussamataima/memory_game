<script setup lang="ts">
import Circle from "@/components/Circle.vue";
import { h, onMounted, ref, watch } from "vue";
import { generateNumbers } from "@/lib";
import type { NumberObject } from "@/types";
import { twMerge } from "tailwind-merge";
import { useRoute, useRouter } from "vue-router";
import Icon from "@/components/Icon.vue";
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
const route = useRouter();
const routes = useRoute();
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const c = h("div", { class: "bar", innerHTML: "hello" },"jjj");
console.log(c)

const elements = ref<NumberObject[]>(generateNumbers(props.grid ** 2 / 2, 20));
const selectedNumbers = ref<NumberObject[]>([]);
const matchedPairs = ref<NumberObject[]>([]);
const lastMatchedPair = ref<{ num1: string; num2: string } | null>(null);
const matchedCount = ref(0);
const moveCount = ref(0);
const timer = ref({ hours: 0, minutes: 0, seconds: 0 });



function updateTimer() {
  const { hours, minutes, seconds } = timer.value;
  if (seconds < 59) {
    timer.value.seconds++;
  } else if (minutes < 59) {
    timer.value.seconds = 0;
    timer.value.minutes++;
  } else if (hours < 23) {
    timer.value.seconds = 0;
    timer.value.minutes = 0;
    timer.value.hours++;
  }
}
let timerInterval = setInterval(() => {
  updateTimer();
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
watch(matchedPairs.value, () => {
  if (isAllMatched()) {
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
    } else {
      setTimeout(() => {
        first.variant = "hidden";
        second.variant = "hidden";
      }, 300);
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
    <section
      :class="
        twMerge(
          'flex gap-4 flex-wrap max-w-[572px] mx-auto my-16',
          props.grid == 4 ? 'max-w-[532px]' : 'max-w-[  572px]'
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
        <p v-if="number.variant !== 'hidden'">{{ number.value }}</p>
      </Circle>
    </section>
    <section class="flex gap-[30px] mx-auto w-fit">
      <div
        class="flex justify-between items-center md:min-w-[255px] bg-darkLightGray p-5 rounded-[10px]"
      >
        <span class="text-blueDarkGray text-xl font-bold">Time</span>
        <span class="text-tealBlue text-xl font-bold">{{ timer }}</span>
      </div>
      <div
        class="flex justify-between items-center md:min-w-[255px] bg-darkLightGray p-5 rounded-[10px]"
      >
        <span class="text-blueDarkGray text-xl font-bold">Moves</span>
        <span class="text-tealBlue text-xl font-bold">{{ moveCount }}</span>
      </div>
    </section>
  </main>
</template>
<style scoped>
body {
  background-color: #fcfcfc;
}
</style>
