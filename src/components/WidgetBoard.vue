<template>
  <div :class="wrapperClass">
    <component
      v-for="widget in config.widgets"
      :is="widget.name"
      :key="widget.name"
      :class="widgetClass"
      v-bind="widget.props"
    />
  </div>
</template>

<script>
import Countdown from '@/components/widgets/Countdown'
import VehicleStatus from '@/components/widgets/VehicleStatus'

export default {
  name: 'WidgetBoard',
  props: {
    wrapperClass: {
      default: ''
    },
    widgetClass: {
      default: ''
    },
    config: {
      required: true,
      type: Object
    }
  },
  components: {
    Countdown,
    VehicleStatus
  }
}
</script>
