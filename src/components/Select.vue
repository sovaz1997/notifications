<template>
  <div class="select">
    <div class="select-option" v-for="option in options">
      {{ option }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Select',
  props: {
    options: {
      default: [],
      type: Array,
    },
  },
});
</script>

<style scoped lang="ts">

</style>
