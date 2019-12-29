<script>
import Client from '../../client/VehicleStatus'
import Wrapper from './Wrapper'

export default {
  name: 'Countdown',
  data () {
    return {
      mileage: 0,
      location: null,
      asOf: null,
      error: false
    }
  },
  props: {
    vin: {
      required: true,
      type: String
    }
  },
  computed: {
    dataHasLoaded () {
      return this.asOf !== null
    },
    mapsLink () {
      return `http://www.google.com/maps/place/${this.location.lat},${this.location.lng}`
    }
  },
  mounted () {
    Client.getStatus()
      .then(this.dataLoaded)
      .catch(this.dataFailedToLoad)
  },
  methods: {
    dataLoaded (data) {
      this.mileage = data.mileage
      this.location = data.location
      this.asOf = data.asOf
    },
    dataFailedToLoad () {
      this.error = true
    }
  },
  components: {
    Wrapper
  }
}
</script>

<template>
  <Wrapper>
    <template v-slot:header>
      Vehicle Status <span class="extra">&mdash; {{ vin }}</span>
    </template>
    <div class="vehicleStatus" v-if="dataHasLoaded">
      <div class="vehicleStatus__stat">
        <div class="stat__title">Mileage</div>
        <div class="stat__value">{{ mileage }}</div>
      </div>
      <div class="vehicleStatus__stat">
        <div class="stat__title">Current Location</div>
        <div class="stat__value"><a :href="mapsLink" target="_blank">See on a map &rarr;</a></div>
      </div>
    </div>
    <div class="failedToLoad error" v-else-if="error">
      Could not load data.
    </div>
  </Wrapper>
</template>

<style scoped>
.vehicleStatus {
  display: flex;
}

.vehicleStatus__stat {
  margin: 0 0 1em;
  flex-grow: 1;
}

.vehicleStatus__stat:last-of-type {
  margin: 0;
}

.stat__title {
  font-weight: bold;
}

.failedToLoad {
  color: #A00;
}
</style>
