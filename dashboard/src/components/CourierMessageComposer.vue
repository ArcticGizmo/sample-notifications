<template>
  <div class="courier-message-composer">
    <div class="form">
      <div>
        <label>Subject</label>
        <input v-model="subject" />
      </div>
      <div>
        <label>Name</label>
        <input v-model="name" />
      </div>
      <div>
        <label>Payload</label>
        <textarea v-model="payload"></textarea>
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

export interface CourierComposerPayload {
  subject: string;
  name: string;
  payload: string;
}

const emits = defineEmits<{
  (e: 'send', payload: CourierComposerPayload): void;
}>();

const subject = ref('');
const name = ref('');
const payload = ref('');

const onSend = () => {
  emits('send', {
    subject: subject.value,
    name: name.value,
    payload: payload.value
  });
};
const onReset = () => {
  subject.value = '';
  name.value = '';
  payload.value = '';
};
</script>

<style scoped>
.courier-message-composer {
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
