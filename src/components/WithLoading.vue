<template>
  <div v-if="loading" class="loading-wrapper">
    <Text :level="1" color="light">Loading...</Text>
  </div>
  <slot v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Text from '@/components/Text.vue';

export default defineComponent({
  components: { Text },
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
