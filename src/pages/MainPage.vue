<template>
  <div class="wrapper">
    <header class="header">
      <h1 class="title">Уведомления</h1>
      <Text block color="light" :level="2">Показано 2 изменения</Text>
    </header>
    <main class="container">
      <NotificationList></NotificationList>
    </main>
  </div>
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
  color: $dark-base-color;
  margin: 0 0 6px 0;
}

.header {
  padding: 21px 0 21px 0;
}

.wrapper {
  box-sizing: border-box;
  max-width: 1416px;
  min-width: 320px;
  padding: 0 20px;
}
</style>
