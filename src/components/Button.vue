<template>
  <button @click="onClick" class="button">
    <Text color="light" :level="1"><slot></slot></Text>
  </button>
</template>

<script lang="ts">
import Text from '@/components/Text.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { Text },
  emits: ['click'],
  methods: {
    onClick() {
      this.$emit('click');
    }
  },
});
</script>

<style lang="scss" scoped>
@import "src/assets/styles/index";

.button {
  border-radius: 15px;
  border: $base-border;
  padding: 8px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @include button-color();
}
</style>
