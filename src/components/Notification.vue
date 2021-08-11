<template>
  <div class="notification" :class="{ 'notification--first': first, 'notification--last': last }">
    <component v-if="iconComponent" :is="iconComponent"></component>
    <div class="notification__info">
      <Text class="notification__title" :level="1" bold block color="dark">{{ title }}</text>
      <Text :level="2" block color="light">{{ subtitle }}</text>
    </div>
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

export default defineComponent({
  name: 'Notification',
  components: { NewLocation, Text, NewCat, NotFound, Cleaned },
  props: {
    notificationType: {
      required: true,
      type: Number,
    },
    productionId: {
      required: true,
      type: Number,
    },
    first: {
      default: false,
      type: Boolean,
    },
    last: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      title: '',
      subtitle: '',
      iconComponent: '',
    }
  },
  async created() {
    const notification = await api.getNotificationType(this.notificationType);
    this.title = notification.description;

    const productionType = await api.getProductionCategory(this.productionId);
    this.subtitle = `${ productionType.cat } (ID ${ this.productionId })`;

    const iconComponents: Record<string, string> = {
      newcat: 'NewCat',
      cleaned: 'Cleaned',
      newlocation: 'NewLocation',
      notfound: 'NotFound'
    };

    this.iconComponent = iconComponents[notification.code];
  },
});
</script>

<style scoped lang="scss">
$border-radius: 15px;

.notification {
  background: #FCFDFE;
  padding: 20px 30px;
  border: 1px solid #E4EBF4;
  display: flex;
  gap: 16px;

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
