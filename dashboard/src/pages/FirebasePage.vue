<template>
  <div class="firebase-page">
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
    <FirebaseMessageComposer @send="onSend" />
  </div>
</template>

<script setup lang="ts">
import FirebaseMessageComposer, { ComposerPayload } from '@/components/FirebaseMessageComposer.vue';
import { Http } from '@/services/httpService';
import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';

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

const onSend = async (payload: ComposerPayload) => {
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
</style>
