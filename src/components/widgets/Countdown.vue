<script>
import Wrapper from './Wrapper'
import moment from 'moment'

export default {
  name: 'Countdown',
  data () {
    return {
      diff: 0,
      interval: null
    }
  },
  props: {
    title: {
      type: String,
      default: null
    },
    until: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.updateDiff(moment().diff(this.until) * -1)
    this.interval = setInterval(this.everySecond, 1000)
  },
  computed: {
    seconds () {
      return this.diff / 1000
    },
    minutes () {
      return this.seconds / 60
    },
    hours () {
      return this.minutes / 60
    },
    days () {
      return this.hours / 24
    }
  },
  methods: {
    updateDiff (to) {
      if (to < 1) {
        this.diff = 0
        return
      }

      this.diff = to
    },
    everySecond () {
      this.updateDiff(this.diff - 1000)
    }
  },
  filters: {
    floor: (value) => Math.floor(value),
    pad: (value) => `${value}`.padStart(2, '0'),
    humanReadable: (date) => moment(date).format('MMMM D, YYYY h:mm A')
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  components: {
    Wrapper
  }
}
</script>

<template>
  <Wrapper>
    <template v-slot:header>
      Countdown <span class="extra">&mdash; {{ title }}</span>
    </template>
    <div class="countdown">
      <div class="countdown__time">
        <div class="time__amount">{{ days | floor | pad }}</div> <div class="time__label">days</div>
      </div>
      <div class="countdown__time">
        <div class="time__amount">{{ hours % 24 | floor | pad }}</div> <div class="time__label">hours</div>
      </div>
      <div class="countdown__time">
        <div class="time__amount">{{ minutes % 60 | floor | pad }}</div> <div class="time__label">minutes</div>
      </div>
      <div class="countdown__time">
        <div class="time__amount">{{ seconds % 60 | floor | pad }}</div> <div class="time__label">seconds</div>
      </div>
    </div>
    <div class="until">
      {{ until | humanReadable }}
    </div>
  </Wrapper>
</template>

<style scoped>
  .countdown__time,
  .until {
    background-color: #dfe6e9;
    padding: 0.5em 0;
    box-sizing: border-box;
    border-radius: 0.25em;
  }

  .countdown__time {
    font-family:'Courier New', Courier, monospace;
    font-weight: bold;
    text-align: center;
    margin: 0 0.5em 0.5em 0;
    width: calc(50% - 0.25em);
    display: inline-block;
  }

  .countdown__time:nth-of-type(2n) {
    margin-right: 0;
  }

  .countdown__time:nth-of-type(n+3) {
    margin-bottom: 0;
  }

  .time__amount {
    font-size: 1.5em;
  }

  .until {
    margin: 0.5em 0 0;
    text-align: center;
  }
</style>
