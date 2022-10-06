<template>
  <div class="courier-page">
    <h3>Send to Device</h3>
    <div class="aliases">
      <button
        v-for="alias in aliases"
        :key="alias"
        :class="{ selected: alias === selectedAlias }"
        @click="onSelectAlias(alias)"
      >
        {{ alias }}
      </button>
      <button class="refresh" @click="refreshAliases()">Refresh</button>
    </div>
    <CourierMessageComposer @send="onSendToDevice" />

    <div class="separator"></div>

    <h3>Send Email</h3>

    <div>
      <label>Email</label>
      <input v-model="email" />
    </div>
    <CourierMessageComposer @send="onSendEmail" />
  </div>
</template>

<script setup lang="ts">
import CourierMessageComposer, { CourierComposerPayload } from '@/components/CourierMessageComposer.vue';
import { Http } from '@/services/httpService';
import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';

const aliases = ref<string[]>([]);
const selectedAlias = ref<string>();
const email = ref<string>('');

const toast = useToast();

const refreshAliases = async () => {
  aliases.value = await Http.getAliases();
  if (!selectedAlias.value) {
    selectedAlias.value = aliases.value[0];
  }
};

const onSelectAlias = (alias: string) => (selectedAlias.value = alias);

const onSendToDevice = async (payload: CourierComposerPayload) => {
  if (!selectedAlias.value) {
    toast.warning('No alias selected!');
    return;
  }

  await Http.sendCourierPush(selectedAlias.value, payload);
  toast.success(`Message sent to '${selectedAlias.value}'!`, { timeout: 2000 });
};

const onSendEmail = async (payload: CourierComposerPayload) => {
  await Http.sendCourierEmail(email.value, payload);
  toast.success(`Email send to'${email.value}'!`, { timeout: 2000 });
};

onMounted(() => {
  refreshAliases();
});
</script>

<style scoped>
.courier-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.aliases {
  margin-bottom: 2rem;
}

.aliases button {
  opacity: 0.75;
}

.aliases button.selected {
  opacity: 1;
}

.aliases button.refresh {
  opacity: 1;
  margin-left: 1rem;
}

.separator {
  margin-top: 2rem;
}
</style>
