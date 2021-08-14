<template>
    <div
        class="notification"
        :class="{ 'notification--first': first, 'notification--last': last, 'notification--unread': unread }"
    >
      <div class="notification__left">
        <component v-if="iconComponent" :is="iconComponent"></component>
        <div class="notification__info">
          <Text class="notification__title" :level="1" :bold="unread" block color="dark">{{ title }}</text>
          <Text :level="2" block color="light">{{ subtitle }}</text>
        </div>
      </div>
      <Button @click="toggleRead">{{ buttonTitle }}</Button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { api } from '@/services/api.service';
import Text from '@/components/Text.vue';
import NewLocation from '@/components/icons/NewLocation.vue';
import NewCat from '@/components/icons/NewCat.vue';
import NotFound from '@/components/icons/NotFound.vue';
import Cleaned from '@/components/icons/Cleaned.vue';
import Button from '@/components/Button.vue';
import FadeTransition from '@/components/transitions/FadeTransition.vue';

export default defineComponent({
  name: 'Notification',
  components: { FadeTransition, Button, NewLocation, Text, NewCat, NotFound, Cleaned },

  emits: ['toggleRead'],

  props: {
    id: { required: true, type: String },
    notificationType: { required: true, type: Number },
    productionCategory: { required: true, type: Number },
    first: { default: false, type: Boolean },
    last: { default: false, type: Boolean },
    unread: { required: true },
  },

  async created() {
    const notification = await api.getNotificationType(this.notificationType);
    this.title = notification.description;

    const productionType = await api.getProductionCategory(this.productionCategory);
    this.subtitle = `${ productionType.cat } (ID ${ this.productionCategory })`;

    const iconComponents: Record<string, string> = {
      newcat: 'NewCat',
      cleaned: 'Cleaned',
      newlocation: 'NewLocation',
      notfound: 'NotFound'
    };

    this.iconComponent = iconComponents[notification.code];
  },

  data() {
    return {
      title: '',
      subtitle: '',
      iconComponent: '',
    }
  },

  computed: {
    buttonTitle() {
      return this.unread ? 'Прочитать' : 'Отметить непрочитанным';
    },
  },

  methods: {
    toggleRead() {
      this.$emit('toggleRead', { id: this.id, unread: !this.unread });
    }
  },
});
</script>

<style scoped lang="scss">
$border-radius: 15px;

.notification {
  background: #FFFFFF;
  padding: 20px 30px;
  box-sizing: border-box;
  border: 1px solid #E4EBF4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;

  &--unread {
    background: #FCFDFE;
  }

  &__left {
    display: flex;
    gap: 16px;
  }

  &__title {
    margin-bottom: 4px;
  }

  &--first {
    border-radius: $border-radius $border-radius 0 0;
  }

  &--last {
    border-radius: 0 0 $border-radius $border-radius;
  }
}

.notification--first.notification--last {
  border-radius: $border-radius $border-radius;
}
</style>
