<template>
  <transition name="fade-only-on-show">
    <div v-if="loading" class="loading-wrapper">
      <Text :level="1" color="light">Loading...</Text>
    </div>
  </transition>
  <FadeTransition>
    <slot v-if="!loading" />
  </FadeTransition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Text from '@/components/Text.vue';
import FadeTransition from '@/components/transitions/FadeTransition.vue';

export default defineComponent({
  components: { FadeTransition, Text },
  props: {
    loading: {
      required: true,
      type: Boolean,
    },
  },
})
</script>

<style lang="scss">
.loading-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.fade-only-on-show-enter-active {
  transition: opacity .6s;
}

.fade-only-on-show-enter-from, .fade-only-on-show-leave-to {
  opacity: 0;
}

</style>
