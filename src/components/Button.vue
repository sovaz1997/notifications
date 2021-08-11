<template>
  <button @click="onClick" class="button">
    <Text color="light" level="1"><slot></slot></Text>
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
.button {
  border-radius: 15px;
  border: 1px solid #E4EBF4;
  padding: 8px 24px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
