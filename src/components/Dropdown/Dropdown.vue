<template>
  <div class="dropdown" ref="target">
      <div class="dropdown__top">
        <div class="dropdown__field" :class="{ 'dropdown__field--selected': modelValue }" @click="toggleOpen">
          <Text v-if="modelValue" :level="1" :color="modelValue ? 'purple' : 'dark'">{{
              selectedOptionText
            }}
          </Text>
          <Text v-else :level="1" color="light">{{ placeholder }}</Text>
          <ArrowDown :color="color"></ArrowDown>
        </div>
        <div class="dropdown__reset-button" v-if="modelValue" @click="removeSelection">
          <Text :level="2" color="light">Сбросить</Text>
        </div>
      </div>
    <FadeTransition>
      <div class="dropdown__options" v-if="opened" v-click-outside="toggleOpen">
        <div class="dropdown__option" v-for="option in options" :key="option.key" @click="selectOption(option)">
          <Text color="dark" :level="1">{{ option.value }}</Text>
        </div>
      </div>
    </FadeTransition>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, } from 'vue';
import Text from '@/components/Text.vue';
import ArrowDown from '@/components/icons/ArrowDown.vue';
import { DropdownOption } from '@/components/Dropdown/models';
import vClickOutside from 'click-outside-vue3'
import FadeTransition from '@/components/transitions/FadeTransition.vue';

export default defineComponent({
  components: { FadeTransition, ArrowDown, Text },

  directives: {
    clickOutside: vClickOutside.directive
  },

  props: {
    options: {
      required: true,
      type: Array as PropType<DropdownOption[]>
    },
    placeholder: {
      default: '',
      type: String as PropType<string>
    },
    modelValue: {
      type: [String, null] as PropType<string | null>,
      default: null,
    },
  },

  emits: ['update:modelValue'],

  data() {
    return {
      opened: false,
      clickListener: 0,
    }
  },

  computed: {
    selectedOptionText() {
      return this.modelValue ? this.options?.find((option) => option.key === this.modelValue)?.value : '';
    },
    color() {
      return this.modelValue ? '#754EFF' : '#8694A7'
    }
  },

  methods: {
    toggleOpen() {
      this.opened = !this.opened;
    },
    selectOption(option: DropdownOption) {
      this.toggleOpen();
      this.$emit('update:modelValue', option.key);
    },
    removeSelection() {
      this.$emit('update:modelValue', null);
    }
  },
});
</script>

<style scoped lang="scss">
@import "src/assets/styles/index";

$border-radius: 15px;

.dropdown {
  position: relative;
  z-index: 1;

  &__field {
    width: fit-content;
    cursor: pointer;
    border: 1px solid #E4EBF4;
    border-radius: $border-radius;
    padding: 12px 20px;
    display: flex;
    align-items: center;
    gap: 12px;

    &--selected {
      border: 1px solid $purple-base-color;
    }
  }

  &__top {
    display: flex;
    gap: 24px;
    align-items: center;
  }

  &__reset-button {
    cursor: pointer;
  }

  &__option {
    padding: 16px;
  }

  &__options {
    cursor: pointer;
    background-color: #FFFFFF;
    border-radius: $border-radius;
    position: absolute;
    bottom: 0;
    transform: translate(0, 100%);
    z-index: 99;
    box-shadow: 0 10px 20px rgba(186, 197, 211, 0.15);
    border: 1px solid #E4EBF4;
  }
}
</style>
