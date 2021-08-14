<template>
  <FadeTransition>
    <div v-if="loading" class="loading-wrapper">
      <Text :level="1" color="light">Loading...</Text>
    </div>
  </FadeTransition>
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

<style lang="scss" scoped>
.loading-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
