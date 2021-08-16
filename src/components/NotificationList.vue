<template>
  <WithLoading :loading="loading">
    <div>
      <div class="notification-list-controls">
        <Dropdown class="notification-list-controls__dropdown" v-model="notificationType" :options="dropdownOptions"
                  placeholder="Тип уведомления"></Dropdown>
        <Refresh @click="reloadNotifications()" class="refresh-button"></Refresh>
      </div>
      <div class="notification-list" ref="notificationList" :style="{ height: `${ listHeight }px` }">
        <Notification
            :height="listItemHeight"
            class="notifications__notification"
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
import { useLocalstorage } from '@/utils/localstorage';
import WithLoading from '@/components/WithLoading.vue';
import { animate, easeOut } from '@/utils/animate';

const [
  getNotificationType,
  setNotificationType,
] = useLocalstorage('filter', null);


const BEFORE_ANIMATION_LIST_ITEM_HEIGHT = 120;
const AFTER_ANIMATION_LIST_ITEM_HEIGHT = 80;

export default defineComponent({
  components: { WithLoading, Refresh, Dropdown, Notification },

  data() {
    return {
      notifications: [] as NotificationModel[],
      dropdownOptions: [] as DropdownOption[],
      loading: false,
      notificationType: null,
      listItemHeight: 0,
      listHeight: 0,
      welcomeAnimationCopmpleted: false,
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

    welcomeAnimateList() {
      const animationFrom = {
        listItemHeight: BEFORE_ANIMATION_LIST_ITEM_HEIGHT,
        listHeight: BEFORE_ANIMATION_LIST_ITEM_HEIGHT * this.filteredNotifications.length,
      };

      const animationTo = {
        listItemHeight: AFTER_ANIMATION_LIST_ITEM_HEIGHT,
        listHeight: AFTER_ANIMATION_LIST_ITEM_HEIGHT * this.filteredNotifications.length,
      };

      animate(animationFrom, animationTo, 300, easeOut, (currentState) => {
        this.listItemHeight = currentState.listItemHeight;
        this.listHeight = currentState.listHeight;
      }, () => {
        this.listItemHeight = animationTo.listItemHeight;
        this.listHeight = animationTo.listHeight;
        this.welcomeAnimationCopmpleted = true;
      });
    }
  },

  computed: {
    filteredNotifications() {
      const { notificationType } = this;
      return notificationType
          ? this.notifications.filter((notification) => notification.type === Number(notificationType))
          : this.notifications;
    }
  },

  async created() {
    await this.reloadNotifications();
    this.notificationType = getNotificationType();
    this.welcomeAnimateList();
  },

  watch: {
    loading() {
      this.$emit('update:loading', this.loading);
    },
    filteredNotifications() {
      this.$emit('viewedNotificationsCountChange', this.filteredNotifications.length);
    },
    notificationType(value) {
      setNotificationType(value);
    },
    'filteredNotifications.length': function (value, prevValue) {
      if (this.welcomeAnimationCopmpleted) {
        const animationFrom = { listHeight: this.listItemHeight * prevValue };
        const animationTo = { listHeight: this.listItemHeight * value };

        animate(animationFrom, animationTo, 300, easeOut, (currentState) => {
          this.listHeight = currentState.listHeight;
        }, () => {
          this.listHeight = animationTo.listHeight;
        });
      }
    }
  },
});
</script>

<style lang="scss" scoped>
@import "src/assets/styles/index";

.notification-list {
  border-radius: 15px;
  border: $base-border;
  overflow: hidden;
}

.notification-list-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 20px;
  flex-wrap: wrap;
}

.refresh-button {
  cursor: pointer;
}
</style>
