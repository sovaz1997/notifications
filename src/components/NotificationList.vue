<template>
  <WithLoading :loading="loading">
    <div>
      <div class="notification-list-controls">
        <Dropdown v-model="notificationType" :options="dropdownOptions" placeholder="Тип уведомления"></Dropdown>
        <Refresh @click="reloadNotifications()" class="refresh-button"></Refresh>
      </div>
      <div class="notification-list">
        <transition-group name="notifications" tag="div">
          <Notification
              v-for="(notification, i) in filteredNotifications"
              :key="notification.id"
              :id="notification.id"
              :first="notificationIsFirst(i)"
              :last="notificationIsLast(i)"
              :notification-type="notification.type"
              :production-category="notification.productionCategory"
              :unread="notification.unread"
              @toggle-read="readNotification($event)"
          ></Notification>
        </transition-group>
      </div>
    </div>
  </WithLoading>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Notification from '@/components/Notification.vue';
import Dropdown from '@/components/Dropdown/Dropdown.vue';
import { api } from '@/services/api.service';
import { DropdownOption } from '@/components/Dropdown/models';
import Refresh from '@/components/icons/Refresh.vue';
import { NotificationModel } from '@/models/notification.model';
import WithLoading from '@/components/WithLoading.vue';

export default defineComponent({
  components: { WithLoading, Refresh, Dropdown, Notification },

  data() {
    return {
      notifications: [] as NotificationModel[],
      dropdownOptions: [] as DropdownOption[],
      loading: false,
      notificationType: null,
    };
  },

  emits: ['update:loading', 'viewedNotificationsCountChange'],

  methods: {
    notificationIsFirst(index: number) {
      return index === 0;
    },

    notificationIsLast(index: number) {
      return index === this.filteredNotifications.length - 1;
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
    },

    async reloadNotifications() {
      if (!this.loading) {
        this.loading = true;
        const notificationTypes = await api.getNotificationTypes();
        this.dropdownOptions = notificationTypes.map((type) => ({ key: type.id.toString(), value: type.name }));
        await this.loadNotifications();
        this.loading = false;
      }
    },
  },

  computed: {
    filteredNotifications() {
      const { notificationType } = this;
      return notificationType
          ? this.notifications.filter((notification) => notification.type === Number(notificationType))
          : this.notifications;
    }
  },

  created() {
    this.reloadNotifications();
  },

  watch: {
    loading() {
      this.$emit('update:loading', this.loading);
    },
    filteredNotifications() {
      this.$emit('viewedNotificationsCountChange', this.filteredNotifications.length);
    },
  }
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

.notifications-leave-active {
  transition: none;
}

.notifications-enter-active {
  transition: all 1s;
}

.notifications-enter-from, .notifications-leave-to {
  opacity: 0;
  transform: translateY(30px);
  position: relative;
  width: 100%;
}
</style>
