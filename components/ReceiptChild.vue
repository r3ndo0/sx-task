<template>
  <div
    class="md:text-lg text-sm text-gray-600 p-4 border-2 border-gray-200 md:w-[500px] rounded-[10px]"
  >
    <p class="my-2 border-b border-gray-200 py-3">
      Rials : {{ irrAmount.toLocaleString("en-US") }}
    </p>
    <p class="my-2 border-b border-gray-200 py-3">
      {{ tcName }} : {{ tcAmount }}
    </p>
    <p class="my-2 border-b border-gray-200 py-3">Base Currency : Rials</p>
    <p class="my-2 border-b border-gray-200 py-3">
      Rate : {{ rate.toFixed(4) }}
    </p>
    <div class="flex justify-between items-center py-4">
      <p class="text-[12px] md:text-base">Deposit To User Account</p>
      <ReceiptToggle v-model="deposit" />
    </div>
    <button
      @click="onSubmit"
      class="w-full mt-4 bg-green-600 hover:bg-green-500 ease-in-out duration-300 rounded-[7px] text-white py-3"
    >
      Submit
    </button>
  </div>
</template>

<script setup lang="ts">
//Prop Types
interface Props {
  irrAmount: number;
  tcAmount: number;
  tcName: string;
  rate: number;
}
//Two Way Bind From The Parent
const deposit = ref(false);

// Submit Demonstration
const onSubmit = () => {
  const { value: dep } = deposit;
  alert(JSON.stringify({ ...props, dep }));
};

const props = defineProps<Props>();
</script>
