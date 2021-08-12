<template>
  <div class="notification-list-controls">
    <Dropdown :options="dropdownOptions" placeholder="Тип уведомления"></Dropdown>
    <Refresh class="refresh-button"></Refresh>
  </div>
  <div class="notification-list">
    <Notification
        v-for="(notification, i) in notifications"
        :key="notification.id"
        :id="notification.id"
        :first="notificationIsFirst(i)"
        :last="notificationIsLast(i)"
        :notification-type="notification.type"
        :production-category="notification.productionCategory"
        :unread="notification.unread"
        @toggle-read="readNotification($event)"
    ></Notification>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Notification from '@/components/Notification.vue';
import Dropdown from '@/components/Dropdown/Dropdown.vue';
import { api } from '@/services/api.service';
import { DropdownOption } from '@/components/Dropdown/models';
import Refresh from '@/components/icons/Refresh.vue';
import { NotificationModel } from '@/models/notification.model';

export default defineComponent({
  components: { Refresh, Dropdown, Notification },

  data() {
    return {
      notifications: [] as NotificationModel[],
      dropdownOptions: [] as DropdownOption[],
    };
  },

  methods: {
    notificationIsFirst(index: number) {
      return index === 0;
    },
    notificationIsLast(index: number) {
      return index === this.notifications.length - 1;
    },
    async loadNotifications() {
      this.notifications = await api.getNotifications();
    },
    async readNotification({ id, unread }: { id: string, unread: boolean }) {
      const updatedNotification = await api.readOrSetUnread(id, unread);
      const replacedNotificationIndex = this.notifications.findIndex((notification) => id === notification.id);

      if (replacedNotificationIndex !== -1) {
        this.notifications[replacedNotificationIndex] = updatedNotification;
      }
    }
  },

  async created() {
    const notificationTypes = await api.getNotificationTypes();
    this.dropdownOptions = notificationTypes.map((type) => ({ key: type.id.toString(), value: type.name }));
    this.loadNotifications();
  },
});
</script>

<style lang="scss" scoped>
.notification-list {
  & > * {
    margin-bottom: -1px;
  }
}

.notification-list-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.refresh-button {
  cursor: pointer;
}
</style>
