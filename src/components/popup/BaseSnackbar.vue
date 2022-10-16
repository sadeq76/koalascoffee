<template>
  <div>
    <h1>
      <slot name="header"></slot>
    </h1>
    <p>
      <slot name="description"></slot>
    </p>
    <button @click="closeMenu" class="close primary-color icon">
      <span class="icon-close pointer" />
    </button>
  </div>
</template>

<script></script>

<style lang="scss" module="modal"></style>
