<template>
  <div class="notification-list">
    <Notification
        v-for="(notification, i) in notifications"
        :key="notification.id"
        :first="notificationIsFirst(i)"
        :last="notificationIsLast(i)"
        :notification-type="1"
        :production-id="83101"
    ></Notification>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Notification from '@/components/Notification.vue';

export default defineComponent({
  components: { Notification },
  data() {
    return {
      notifications: [
        { id: '1', },
        { id: '3', },
        { id: '2', },
      ],
    };
  },
  methods: {
    notificationIsFirst(index: number) {
      return index === 0;
    },
    notificationIsLast(index: number) {
      return index === this.notifications.length - 1;
    },
  },
});
</script>

<style lang="scss">
.notification-list {
  & > * {
    margin-bottom: -1px;
  }
}
</style>
