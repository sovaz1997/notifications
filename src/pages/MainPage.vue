<template>
  <header class="header">
    <h1 class="title">Уведомления</h1>
    <Text block color="light" :level="2">Показано 2 изменения</Text>
    <Notification :notification-type="1" :production-id="83101"></Notification>
  </header>
  <main>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Text from '@/components/Text.vue';
import Notification from '@/components/Notification/Notification.vue';

export default defineComponent({
  name: 'MainPage',
  components: { Notification, Text },
});
</script>

<style lang="scss">
@import "src/assets/styles/index";

.title {
  font-size: 30px;
  line-height: 32px;
  color: $dark-text-color;
  margin: 0 0 6px 0;
}

.header {
  padding: 21px 0 21px 0;
}
</style>
