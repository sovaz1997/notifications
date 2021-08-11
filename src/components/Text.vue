<template>
  <span :class="textClass">
    <slot></slot>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import classnames from 'classnames';

export default defineComponent({
  props: {
    level: {
      type: Number,
      default: 1,
    },
    bold: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'dark',
    },
    block: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    textClass() {
      return classnames([
          `text--${ this.level }`,
          `text--${ this.color }`,
        {
          'text--block': this.block,
          'text--bold': this.bold,
        }
      ]);
    },
  }
})
</script>

<style lang='scss'>
@import "src/assets/styles/index";

.text {
  &--1 {
    font-size: 14px;
    line-height: 16px;
  }

  &--2 {
    font-size: 12px;
    line-height: 16px;
  }

  &--light {
    color: $light-text-color;
  }

  &--dark {
    color: $dark-text-color;
  }

  &--bold {
    font-weight: bold;
  }

  &--block {
    display: block;
  }
}
</style>
