<template>
  <header class="header">
    <h1 class="title">Уведомления</h1>
    <Text block color="light" :level="2">Показано 2 изменения</Text>
  </header>
  <main>
    <NotificationList></NotificationList>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Text from '@/components/Text.vue';
import NotificationList from '@/components/NotificationList.vue';

export default defineComponent({
  name: 'MainPage',
  components: { NotificationList, Text },
});
</script>

<style lang="scss" scoped>
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
