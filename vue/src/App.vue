<template>
  <div id="app">
    <MagicBell />
    <CourierVueToast />
    <CourierVueInbox />
    <Layout />
  </div>
</template>

<script setup lang="ts">
import Layout from '@/layout/Layout.vue';
import CourierVueToast from './components/CourierVueToast.vue';
import CourierVueInbox from './components/CourierVueInbox.vue';
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
