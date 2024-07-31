import type { NumberObject } from "@/types";
import { h, defineComponent } from "vue";
let icons = [
  "futbol",
  "anchor",
  "sun",
  "hand-spock",
  "bug",
  "moon",
  "snowflake",
  "lira-sign",
  "flask",
  "car",
  "cat",
  "star",
  "fire",
  "broom",
  "plane",
  "handshake",
  "face-smile",
  "pizza-slice"
  
];

export function generateNumbers(length: number, max: number): NumberObject[] {
  if (length > max || length > icons.length) {
    throw new Error(
      "Length cannot be greater than the range of unique numbers or available unique icons"
    );
  }
  shuffleArray(icons);
  const array: number[] = Array.from({ length: max }, (_, i) => i + 1);

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  const selectedNumbers: number[] = array.slice(0, length);

  // Convert numbers to objects with keys in format "FFF"
  const result: NumberObject[] = selectedNumbers.map((num, index) => {
    const hexValue = generateRandomHex();
    return {
      id: hexValue,
      value: num,
      variant: "hidden",
      matched: false,
      icon: icons[index],
    };
  });

  const copy: NumberObject[] = result.map((obj) => {
    const hexValue = generateRandomHex();
    return {
      ...obj,
      id: hexValue,
    };
  });

  return shuffleArray([...result, ...copy]);
}

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateRandomHex() {
  // Generate a random number between 0 and 4095 (FFF in decimal)
  const randomNum = Math.floor(Math.random() * 2821109907456);

  // Convert the number to a hexadecimal string with leading zeros
  const hexValue = randomNum.toString(36).padStart(8, "0");

  return hexValue;
}




export function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  // Pad minutes and seconds with leading zeros if they are less than 10
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  if (hours > 0) {
      return `${hours}:${formattedMinutes}:${formattedSeconds}`;
  } else {
      return `${totalMinutes}:${formattedSeconds}`;
  }
}