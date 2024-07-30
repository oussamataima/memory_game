import type { nameICon, NumberObject } from "@/types";
import { h, defineComponent } from 'vue';


export function generateNumbers(length: number, max: number): NumberObject[] {
  if (length > max) {
    throw new Error(
      "Length cannot be greater than the range of unique numbers"
    );
  }

  const array: number[] = Array.from({ length: max }, (_, i) => i + 1);

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  const selectedNumbers: number[] = array.slice(0, length);

  // Convert numbers to objects with keys in format "FFF"
  const result: NumberObject[] = selectedNumbers.map((num) => {
    const hexValue = generateRandomHex();
    return {
     id : hexValue,  value: num, variant: "hidden" , matched : false
    };
  });

  const copy: NumberObject[] = result.map((obj) => {
    const hexValue = generateRandomHex();
    return {
      ...obj, id : hexValue
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

function createElementFromString(elementString : string) {
  return defineComponent({
    render() {
      return h('div', {
        innerHTML: elementString
      });
    }
  });
}

export default createElementFromString;