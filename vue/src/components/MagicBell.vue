<template>
  <div class="magic-bell" ref="container"></div>
</template>

<script setup lang="ts">
import { renderWidget } from '@magicbell/embeddable/dist/magicbell.esm.js';
import { onMounted, ref } from 'vue';

const container = ref();

const options = {
  apiKey: import.meta.env['VITE_MAGIC_BELL_API_KEY'],
  userEmail: 'jon.howell314@gmail.com'
};

onMounted(() => {
  renderWidget(container.value, options);
});
</script>

<style scoped>
.magic-bell {
  position: fixed;
  right: 4rem;
  top: 1rem;
}
</style>
