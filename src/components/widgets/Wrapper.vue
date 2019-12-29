<template>
  <div class="widget">
    <div class="widget__header">
      <slot name="header"></slot>
    </div>
    <div class="widget__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Wrapper'
}
</script>

<style scoped>
.widget {
  border: 1px solid #ccc;
  padding: 1em;
  border-radius: 0.25em;
}

.widget__header {
  font-weight: bold;
  margin: 0 0 0.5em;
}

.widget__header .extra {
  font-weight: normal;
}
</style>
