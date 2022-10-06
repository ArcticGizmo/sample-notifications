<template>
  <div class="firebase-message-composer">
    <div class="form">
      <div>
        <label>Heading</label>
        <input v-model="heading" />
      </div>
      <div>
        <label>Message</label>
        <input v-model="message" />
      </div>
      <div>
        <label>Data</label>
        <input v-model="data" />
      </div>
    </div>

    <div class="actions">
      <button @click="onSend()">Send</button>
      <button @click="onReset()">Reset</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

export interface ComposerPayload {
  heading: string;
  message: string;
  data: string;
}

const emits = defineEmits<{
  (e: 'send', payload: ComposerPayload): void;
}>();

const heading = ref('');
const message = ref('');
const data = ref('');

const onSend = () => {
  emits('send', {
    heading: heading.value,
    message: message.value,
    data: data.value
  });
};
const onReset = () => {
  heading.value = '';
  message.value = '';
  data.value = '';
};
</script>

<style scoped>
.firebase-message-composer {
  width: 500px;
  max-width: 500px;
  box-shadow: 1px 1px 5px;
  padding: 2rem;
}

.form > * {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

input {
  height: 2rem;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 5px;
}
</style>
