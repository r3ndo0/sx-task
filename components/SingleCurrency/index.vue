<template>
  <div class="p-4">
    <div class="flex justify-center gap-24">
      <div>
        <NuxtImg fit="cover" class="w-20 h-12" src="/iran.png" />
        <p class="text-gray-400 text-center my-5">Rials</p>
      </div>
      <div>
        <NuxtImg fit="cover" class="w-20 h-12" :src="currency?.flag" />
        <p class="text-gray-400 text-center my-5">{{ currency?.currency }}</p>
      </div>
    </div>
    <div
      class="border my-12 border-gray-600 rounded-[7px] m-auto max-w-[700px] p-3 md:p-12 flex flex-col gap-8"
    >
      <div :class="{ shake: shakeIrr }">
        <label class="text-gray-300">Rials</label>
        <input
          class="p-3 bg-gray-800 w-full rounded-[4px] text-gray-300"
          v-model="irr"
          type="number"
          @focus="irrFocused = true"
        />
        <p v-show="irr" class="text-gray-400 my-2">{{ rialsConvertor }}</p>
      </div>
      <div>
        <label class="text-gray-300">{{ currency?.currency }}</label>
        <input
          class="p-3 bg-gray-800 w-full rounded-[4px] text-gray-300"
          v-model="targetCurrency"
          type="number"
          @focus="tCFocused = true"
        />
      </div>
      <button
        class="w-full bg-green-600 hover:bg-green-500 ease-in-out duration-300 rounded-[7px] text-white py-3"
        @click="modalOpener"
      >
        Purchase
      </button>
    </div>
    <ReceiptModal v-model="modal" title="Your Receipt"
      ><ReceiptChild
        :rate="currency?.rate ?? 0"
        :tc-amount="targetCurrency ?? 0"
        :irr-amount="irr ?? 0"
        :tc-name="currency?.currency ?? ''"
    /></ReceiptModal>
  </div>
</template>

<script setup lang="ts">
//Getting The Route Params
const route = useRoute();

//Fetching The Currency Based On The Route Params
const { data: currency, pending } = await useSingleCurrency(
  route.params.currency as string
);
//Just a Bunch Of Reactive Data
const shakeIrr = ref(false);
const modal = ref(false);
const irr = ref<number>();
const irrFocused = ref(false);
const tCFocused = ref(false);
const targetCurrency = ref<number>();

//Time Out To Apply The Dynamic Css Class For The Shake Animation
const { isPending, start, stop } = useTimeoutFn(() => {
  shakeIrr.value = false;
}, 1500);

// OnValidationError For The Inputs
function warnDisabled() {
  shakeIrr.value = true;
  start();
}

//Cutting Out The Valid Input (Only The Value With 4 Decimal Numbers Or Less)

function cutOutDec(n: number | undefined) {
  if (!n) return;
  if (!n.toString().includes(".")) return n;
  const [firstChunk, secondChunk] = n.toString().split(".");
  const newValue = firstChunk + "." + secondChunk.slice(0, 4);
  return +newValue;
}

//Modal Opener Obviously
const modalOpener = () => {
  if (!irr.value || irr.value < 1000) {
    warnDisabled();
    return;
  }
  modal.value = true;
};

//Syncing Two Refs *** Shout Out To Antony Fu For The Amazing VueUse ***
const sync = syncRef(irr, targetCurrency, {
  transform: {
    ltr: (left) => +((left as number) * (currency.value?.rate ?? 1)).toFixed(4),
    rtl: (right) =>
      +((right as number) / (currency.value?.rate ?? 1)).toFixed(4),
  },
});

//Watching The Rial Input To CutOut The Extra Decimals
watch(irr, (n) => {
  if (irrFocused) {
    irr.value = cutOutDec(n);
  }
});

//Watching The Target Currency Input To CutOut The Extra Decimals

watch(targetCurrency, (n) => {
  if (tCFocused) {
    targetCurrency.value = cutOutDec(n);
  }
});

//Converting The Rial Input Value To Comma Separated Value For a Better UX
const rialsConvertor = computed(
  () => irr.value?.toLocaleString("en-US") + " ریال"
);
</script>

<style>
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
