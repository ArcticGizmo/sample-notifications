<template>
  <div class="magic-bell-page">
    <h3>Send to</h3>
    <div class="categories">
      <button
        v-for="cat in categories"
        :key="cat"
        :class="{ selected: cat === selectedCategory }"
        @click="onSelectCategory(cat)"
      >
        {{ cat }}
      </button>
    </div>
    <MagicBellMessageComposer @send="onSend" />
  </div>
</template>

<script setup lang="ts">
import MagicBellMessageComposer, { MagicBellComposerPayload } from '@/components/MagicBellMessageComposer.vue';
import { Http } from '@/services/httpService';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

const categories = ['Device', 'Email'];

const toast = useToast();
const selectedCategory = ref(categories[0]);

const onSelectCategory = (cat: string) => (selectedCategory.value = cat);

const onSend = async (payload: MagicBellComposerPayload) => {
  if (selectedCategory.value === 'Device') {
    sendToDevice(payload);
    return;
  }
  sendToEmail(payload);
};

const sendToDevice = async (payload: MagicBellComposerPayload) => {
  const { email, ...rest } = payload;

  await Http.sendMagicBellPush(email, rest);
  toast.success(`Message sent to '${email}'!`, { timeout: 2000 });
};

const sendToEmail = async (payload: MagicBellComposerPayload) => {
  const { email, ...rest } = payload;

  await Http.sendMagicBellEmail(email, rest);
  toast.success(`Email sent to '${email}'!`, { timeout: 2000 });
};
</script>

<style scoped>
.magic-bell-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.categories {
  margin-bottom: 2rem;
}

.categories button {
  opacity: 0.75;
}

.categories button.selected {
  opacity: 1;
}

.categories button.refresh {
  opacity: 1;
  margin-left: 1rem;
}

.separator {
  margin-top: 2rem;
}
</style>
