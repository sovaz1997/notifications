<template>
  <Dropdown :options="dropdownOptions" placeholder="Тип уведомления"></Dropdown>
  <div class="notification-list">
    <Notification
        v-for="(notification, i) in notifications"
        :key="notification.id"
        :id="notification.id"
        :first="notificationIsFirst(i)"
        :last="notificationIsLast(i)"
        :notification-type="notification.type"
        :production-id="83101"
        :unread="i % 2 === 0"
    ></Notification>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Notification from '@/components/Notification.vue';
import Dropdown from '@/components/Dropdown/Dropdown.vue';
import { api } from '@/services/api.service';
import { DropdownOption } from '@/components/Dropdown/models';

export default defineComponent({
  components: { Dropdown, Notification },

  data() {
    return {
      notifications: [
        { id: '1', type: 1 },
        { id: '3', type: 2 },
        { id: '2', type: 3 },
        { id: '2', type: 4 },
      ],
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
  },

  async created() {
    const notificationTypes = await api.getNotificationTypes();

    this.dropdownOptions = notificationTypes.map((type) => ({ key: type.id.toString(), value: type.name }));
  }
});
</script>

<style lang="scss" scoped>
.notification-list {
  & > * {
    margin-bottom: -1px;
  }
}
</style>
