<template>
  <main>
    <div class="w-full mb-4 p-4 relative">
      <input
        v-model="searchInput"
        placeholder="Search By Name..."
        class="p-2 w-full m-auto text-gray-800 rounded-[3px]"
        type="text"
      />
      <button
        @click="clearSearch"
        v-if="searchInput"
        class="absolute top-6 text-rose-500 right-8"
      >
        <IconsX />
      </button>
    </div>
    <div class="w-full text-center" v-if="list?.length === 0">
      Nothing Found.
    </div>
    <div v-else>
      <div v-if="pending" class="grid h-screen p-4 grid-cols-3 gap-8">
        <div
          v-for="(box, index) in Array(9)"
          class="rounded-[10px] border-gray-600 bg-gray-800 border animate-pulse"
        ></div>
      </div>
      <div v-else class="p-4">
        <div class="grid place-content-center grid-cols-1 md:grid-cols-3 gap-8">
          <HomeCurrencyCard
            v-for="c in list"
            :key="c.currency"
            :symbol="c.symbol"
            :flag="c.flag"
            :rate="c.rate"
            :country-name="c.countryName"
            :currency="c.currency"
            :code="c.code"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const searchInput = ref("");

//Debounce the onChange Fetch
const debounced = refDebounced(searchInput, 1000);

//onChange Fetch
const { data: list, pending } = await useCurrencyList(debounced);

//Clear The Search Input
const clearSearch = () => {
  searchInput.value = "";
};
</script>
