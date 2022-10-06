<template>
  <div class="firebase-page">
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
    <FirebaseMessageComposer @send="onSendToDevice" />

    <div class="separator"></div>

    <h3>Broadcast</h3>
    <p>
      Topic: <strong>{{ TOPIC }}</strong>
    </p>
    <FirebaseMessageComposer @send="onBroadcast" />
  </div>
</template>

<script setup lang="ts">
import FirebaseMessageComposer, { ComposerPayload } from '@/components/FirebaseMessageComposer.vue';
import { Http } from '@/services/httpService';
import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';

const TOPIC = 'general_alerts';

const aliases = ref<string[]>([]);
const selectedAlias = ref<string>();

const toast = useToast();

const refreshAliases = async () => {
  aliases.value = await Http.getAliases();
  if (!selectedAlias.value) {
    selectedAlias.value = aliases.value[0];
  }
};

const onSelectAlias = (alias: string) => (selectedAlias.value = alias);

const onSendToDevice = async (payload: ComposerPayload) => {
  if (!selectedAlias.value) {
    toast.warning('No alias selected!');
    return;
  }

  await Http.sendFirebasePush(
    selectedAlias.value,
    { data: payload.data },
    { title: payload.heading, body: payload.message }
  );
  toast.success(`Message sent to '${selectedAlias.value}'!`, { timeout: 1000 });
};

const onBroadcast = async (payload: ComposerPayload) => {
  await Http.sendFirebaseBroadcast(TOPIC, { data: payload.data }, { title: payload.heading, body: payload.message });
  toast.success(`Message broadcast to '${selectedAlias.value}'!`, { timeout: 1000 });
};

onMounted(() => {
  refreshAliases();
});
</script>

<style scoped>
.firebase-page {
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
