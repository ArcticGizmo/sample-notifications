<template>
  <courier-toast v-bind="props" />
</template>

<script setup lang="ts">
import { PropType } from 'vue';

export interface ToastTheme {
  body?: React.CSSProperties;
  root?: React.CSSProperties;
  toast?: React.CSSProperties;
  dismiss?: React.CSSProperties;
  message?: {
    actionBlock?: React.CSSProperties;
    textBlock?: React.CSSProperties;
    body?: React.CSSProperties;
    contents?: React.CSSProperties;
    icon?: React.CSSProperties;
    title?: React.CSSProperties;
  };
  progressBar?: React.CSSProperties;
}

type Position = 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
type Status = 'alert' | 'status';
type Transition = 'bounce' | 'slide' | 'zoom';

const props = defineProps({
  autoClose: { type: [Boolean, Number] },
  defaultIcon: { type: String },
  hideProgressBar: { type: Boolean },
  position: { type: String as PropType<Position> },
  role: { type: String as PropType<Status> },
  theme: { type: Object as PropType<ToastTheme> },
  transition: { type: String as PropType<Transition> }
});
</script>
