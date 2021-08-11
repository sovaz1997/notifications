<template>
  <div class="notification">

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Notification',
  props: {
    code: {
      required: true,
      type: Number,
    },
    productionId: {
      required: true,
      type: Number,
    }
  },
});
</script>

<style scoped lang="ts">

</style>
