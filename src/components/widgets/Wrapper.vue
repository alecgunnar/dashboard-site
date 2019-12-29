<template>
  <div class="widget">
    <div class="widget__header">
      <slot name="header"></slot>
    </div>
    <div class="widget__body">
      <div
        v-if="loading"
        class="widget__loading"
      >
        Loading
      </div>
      <slot v-else></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Wrapper',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
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

.widget__loading::after {
  content: "...";
  margin: 0 0 0 -4px;
  animation: loading 1s;
  animation-iteration-count: infinite;
}

@keyframes loading {
  0% {
    content: "";
  }

  20% {
    content: "";
  }

  40% {
    content: ".";
  }

  60% {
    content: "..";
  }

  80% {
    content: "...";
  }
}
</style>
