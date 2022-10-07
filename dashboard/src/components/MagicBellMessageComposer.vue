<template>
  <div class="magic-bell-message-composer">
    <div class="form">
      <div>
        <label>Email</label>
        <input v-model="email" />
      </div>
      <div>
        <label>Title</label>
        <input v-model="title" />
      </div>
      <div>
        <label>Content</label>
        <input v-model="content" />
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

export interface MagicBellComposerPayload {
  email: string;
  title: string;
  content: string;
  payload: string;
}

const emits = defineEmits<{
  (e: 'send', payload: MagicBellComposerPayload): void;
}>();

const email = ref('');
const title = ref('');
const content = ref('');
const payload = ref('');

const onSend = () => {
  emits('send', {
    email: email.value,
    title: title.value,
    content: content.value,
    payload: payload.value
  });
};
const onReset = () => {
  title.value = '';
  content.value = '';
  payload.value = '';
};
</script>

<style scoped>
.magic-bell-message-composer {
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
