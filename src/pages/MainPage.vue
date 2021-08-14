<template>
  <div class="wrapper">
    <header class="header">
      <FadeTransition>
        <h1 class="title" v-if="showTitle">Уведомления</h1>
      </FadeTransition>
      <FadeTransition>
        <Text v-if="!loading" block color="light" :level="2">
          Показано {{ changesText }}
        </Text>
      </FadeTransition>
    </header>
    <div class="notification-list-wrapper">
      <NotificationList v-model:loading="loading"
                        @viewed-notifications-count-change="changeNotificationCount"></NotificationList>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import Text from '@/components/Text.vue';
import NotificationList from '@/components/NotificationList.vue';
import { pluralize } from '@/utils/pluralize';
import FadeTransition from '@/components/transitions/FadeTransition.vue';

export default defineComponent({
  components: { FadeTransition, NotificationList, Text },

  data() {
    return {
      changes: 0,
      loading: true,
      showTitle: true,
    };
  },

  computed: {
    changesText(): string {
      return `${ this.changes } изменени${ pluralize(['е', 'я', 'й'], this.changes) }`;
    },
  },

  methods: {
    changeNotificationCount(value: number) {
      this.changes = value;
    }
  },

  watch: {
    loading(value) {
      if (value) {
        this.showTitle = false;

        this.$nextTick(() => {
          setTimeout(() => {
            this.showTitle = true;
          }, 300);
        });
      }
    }
  }
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
  height: 96px;
  box-sizing: border-box;
}

.wrapper {
  box-sizing: border-box;
  max-width: 1416px;
  min-width: 580px;
  padding: 0 20px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.notification-list-wrapper {
  flex-grow: 1;
}
</style>
