<template>
  <h1 class="title">Уведомления</h1>
  <span class="notifications-info">Показано 7 уведомлений</span>
  <Text color="light" bold block>1233</Text>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Text from '@/components/Text.vue';

export default defineComponent({
  name: 'MainPage',
  components: { Text },
});
</script>
