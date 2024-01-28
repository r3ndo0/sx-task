<template>
  <p class="text-white">{{ route.params.name }}</p>
</template>

<script setup lang="ts">
const route = useRoute();
</script>
