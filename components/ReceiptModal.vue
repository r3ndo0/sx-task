<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center text-center">
          <TransitionChild
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full transform overflow-hidden rounded-2xl bg-white p-2 md:p-12 text-left align-middle shadow-xl transition-all"
            >
              <button
                @click="closeModal"
                class="absolute left-5 top-4 text-rose-500"
              >
                <IconsX />
              </button>
              <DialogTitle
                as="h3"
                class="text-lg mb-4 md:mb-8 text-center font-medium leading-6 text-gray-900"
              >
                {{ title }}
              </DialogTitle>
              <slot />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

//Prop Types
interface Props {
  title: string;
}
//Two Way Bind From The Parent

const isOpen = defineModel<boolean>();

const props = defineProps<Props>();

// Function To Close The Modal (Obviously? XD)
function closeModal() {
  isOpen.value = false;
}
</script>
