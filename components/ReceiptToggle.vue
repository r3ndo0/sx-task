<template>
  <div class="">
    <Switch
      v-model="enabled"
      :class="enabled ? 'bg-green-600' : 'bg-gray-400'"
      class="relative md:scale-100 scale-[70%] inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
    >
      <span class="sr-only">Deposit To User Account</span>
      <span
        aria-hidden="true"
        :class="enabled ? 'translate-x-9' : 'translate-x-0'"
        class="pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
      />
    </Switch>
  </div>
</template>

<script setup>
import { Switch } from "@headlessui/vue";

const enabled = defineModel();
</script>
