<template>
  <span :class="textClass"></span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

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
    }
  },
  computed: {
    textClass() {
      return `text--${ this.level } text--${ color }`;
    },
  }
})
</script>

<style lang='scss'>
@import "src/assets/styles/index";

.text {
  color: $dark-text-color;

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
}
.text-1 {

}
</style>
