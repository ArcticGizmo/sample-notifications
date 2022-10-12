<template>
  <div id="app">
    <MagicBell />
    <CourierToastVue />
    <CourierInboxVue />
    <Layout />
  </div>
</template>

<script setup lang="ts">
import Layout from '@/layout/Layout.vue';
import { CourierToastVue, CourierInboxVue } from 'courier-vue-embedded';

import MagicBell from './components/MagicBell.vue';
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

*,
*:before,
*:after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

button:hover {
  opacity: 0.9;
}
</style>

<style scoped>
courier-inbox {
  position: fixed;
  z-index: 1000000;
  right: 2rem;
  top: 1rem;
}
</style>
