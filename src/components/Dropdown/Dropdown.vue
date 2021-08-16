<template>
  <div>
    <div class="overlay" v-if="opened" @click="toggleOpen"></div>
    <div class="dropdown" ref="target">
      <div class="dropdown-animation-gradient" :style="dropdownGradient"></div>
      <div ref="dropdownFieldWithReset" class="dropdown__top">
        <div ref="dropdownField" class="dropdown__field" :class="{ 'dropdown__field--selected': modelValue }"
             @click="toggleOpen">
          <Text v-if="modelValue" :level="1" :color="modelValue ? 'purple' : 'dark'">{{
              selectedOptionText
            }}
          </Text>
          <Text v-else :level="1" color="light">{{ placeholder }}</Text>
          <ArrowDown :color="color"></ArrowDown>
        </div>
        <FadeTransition>
          <div class="dropdown__reset-button" v-if="modelValue" @click="removeSelection">
            <Text :level="2" color="light">Сбросить</Text>
          </div>
        </FadeTransition>
      </div>
      <FadeTransition>
        <div class="dropdown__options" v-if="opened">
          <div
              v-for="(option, i) in options" :key="option.key" @click="selectOption(option)"
              class="dropdown__option"
              :class="{
              'dropdown__option--selected': modelValue === option.key,
              'dropdown__option--top': i === 0,
              'dropdown__option--bottom': i === options.length - 1
            }"
          >
            <Text :color="modelValue === option.key ? 'purple' : 'dark'" :level="1">{{ option.value }}</Text>
          </div>
        </div>
      </FadeTransition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, } from 'vue';
import Text from '@/components/Text.vue';
import ArrowDown from '@/components/icons/ArrowDown.vue';
import { DropdownOption } from '@/components/Dropdown/models';
import FadeTransition from '@/components/transitions/FadeTransition.vue';
import * as CSS from 'csstype';
import { animate, easeOut } from '@/utils/animate';

export default defineComponent({
  components: { FadeTransition, ArrowDown, Text },

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
      animationGradientScale: 0,
    }
  },

  computed: {
    selectedOptionText() {
      return this.modelValue ? this.options?.find((option) => option.key === this.modelValue)?.value : '';
    },

    color() {
      return this.modelValue ? '#754EFF' : '#8694A7';
    },

    dropdownGradient(): CSS.Properties {
      return {
        backgroundColor: '#fff',
        position: 'absolute',
        zIndex: 100,
        width: '100%',
        height: '100%',
        transform: `scale(${ this.animationGradientScale }, 1)`,
        transformOrigin: '100% 50%',
        top: '0',
        right: '0',
      };
    },
  },

  methods: {
    toggleOpen() {
      this.opened = !this.opened;
    },

    selectOption(option: DropdownOption) {
      this.toggleOpen();

      if (option.key !== this.modelValue) {
        this.runAnimation();
      }

      this.$emit('update:modelValue', option.key);
    },

    runAnimation() {
      const from = (this.$refs.dropdownField as HTMLDivElement).offsetWidth;

      this.$nextTick(() => {
        const to = (this.$refs.dropdownFieldWithReset as HTMLDivElement).offsetWidth ;

        const fromGradient = { gradient: 1 - from / to };
        const toGradient = { gradient: 0 };

        animate(fromGradient, toGradient, 300, easeOut, (currentState) => {
          this.animationGradientScale = currentState.gradient;
        });
      });
    },

    removeSelection() {
      this.$emit('update:modelValue', null);
      this.opened = false;
    },

    onKeyDown(e: KeyboardEvent) {
      if (e.code === 'Escape') {
        this.opened = false;
      }
    },

    addKeydownListener() {
      window.addEventListener('keydown', this.onKeyDown);
    },

    removeKeydownListener() {
      window.removeEventListener('keydown', this.onKeyDown);
    }
  },

  watch: {
    opened(value) {
      if (value) {
        this.addKeydownListener();
      } else {
        this.removeKeydownListener();
      }
    }
  },

  unmounted() {
    this.removeKeydownListener();
  }
});
</script>

<style scoped lang="scss">
@import "src/assets/styles/index";

$border-radius: 15px;

.dropdown {
  position: relative;
  z-index: 2;

  &__field {
    width: fit-content;
    cursor: pointer;
    border: $base-border;
    border-radius: $border-radius;
    padding: 12px 20px;
    display: flex;
    align-items: center;
    gap: 12px;

    @include button-color();

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
    @include button-color();

    &.dropdown__option--selected {
      background-color: $base-button-active-color;
    }

    &--top {
      border-radius: $border-radius $border-radius 0 0;
    }

    &--bottom {
      border-radius: 0 0 $border-radius $border-radius;
    }
  }

  &__options {
    width: 260px;
    cursor: pointer;
    background-color: #FFFFFF;
    border-radius: $border-radius;
    position: absolute;
    bottom: 0;
    transform: translate(0, 100%);
    z-index: 99;
    box-shadow: 0 10px 20px rgba(186, 197, 211, 0.15);
    border: $base-border;
  }
}

.overlay {
  z-index: 1;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
