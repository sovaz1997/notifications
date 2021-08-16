<template>
  <transition name="fade">
    <slot></slot>
  </transition>
</template>

<style lang="scss" scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .6s ease-out;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
