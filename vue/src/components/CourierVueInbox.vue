<template>
  <courier-inbox v-bind="props" />
</template>

<script setup lang="ts">
import { PropType } from 'vue';

export type Placement = 'top' | 'left' | 'right' | 'bottom';
export type Trigger = 'click' | 'hover';

export interface Brand {
  inapp?: {
    disableCourierFooter?: boolean;
    borderRadius?: string;
    disableMessageIcon?: boolean;
    placement?: Placement;
    emptyState?: {
      textColor?: string;
      text?: string;
    };
    widgetBackground?: {
      topColor?: string;
      bottomColor?: string;
    };
    icons?: {
      bell?: string;
      message?: string;
    };
    toast?: {
      borderRadius?: string;
      timerAutoClose?: number;
    };
  };
  colors?: {
    primary?: string;
    secondary?: string;
    tertiary?: string;
  };
}

export interface InboxTheme {
  container?: React.CSSProperties;
  footer?: React.CSSProperties;
  header?: React.CSSProperties;
  icon?: React.CSSProperties;
  messageList?: {
    container?: React.CSSProperties;
    message?: {
      actions?: {
        container?: React.CSSProperties;
        details?: React.CSSProperties;
        dismiss?: React.CSSProperties;
      };
      body?: React.CSSProperties;
      container?: React.CSSProperties;
      icon?: React.CSSProperties;
      title?: React.CSSProperties;
      unreadIndicator?: React.CSSProperties;
    };
  };
  tabList?: {
    container?: React.CSSProperties;
    tab?: React.CSSProperties;
  };
  root?: React.CSSProperties;
}

const props = defineProps({
  brand: { type: Object as PropType<Brand> },
  className: String,
  defaultIcon: { type: [Boolean, String] },
  placement: { type: String as PropType<Placement> },
  theme: { type: Object as PropType<InboxTheme> },
  title: String,
  trigger: { type: String as PropType<Trigger> }
});
</script>

<style>
courier-inbox div[class^='styled__MessageList'] {
  overflow-x: hidden;
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
