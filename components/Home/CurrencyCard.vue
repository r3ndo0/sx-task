<template>
  <NuxtLink
    to="/"
    class="border hover:border-amber-50 group ease-in-out hover:text-amber-50 duration-300 border-gray-600 rounded-[10px] p-2 gap-2 hover:cursor-pointer flex flex-col items-center"
  >
    <NuxtImg
      :src="flag"
      class="group-hover:opacity-100 opacity-70 ease-in-out duration-300"
    />
    <p>country : {{ countryName }}</p>
    <p class="">name : {{ currency }}</p>
    <p>rate : {{ rate.toFixed(4) }}</p>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  flag: string;
  countryName: string;
  currency: string;
  rate: number;
  symbol: string;
}
const props = defineProps<Props>();
</script>
