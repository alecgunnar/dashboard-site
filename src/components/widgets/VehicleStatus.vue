<script>
import Client from '../../client/VehicleStatus'
import Wrapper from './Wrapper'
import moment from 'moment'

export default {
  name: 'Countdown',
  data () {
    return {
      mileage: 0,
      location: null,
      asOf: null,
      error: false,
      noData: false
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
      return this.noData || this.asOf !== null
    },
    loading () {
      return !this.dataHasLoaded && this.error === false;
    },
    mapsLink () {
      return `http://www.google.com/maps/place/${this.location.lat},${this.location.lng}`
    }
  },
  mounted () {
    Client.getStatus(this.vin)
      .then(this.dataLoaded)
      .catch(this.dataFailedToLoad)
  },
  methods: {
    dataLoaded (data) {
      if (data.asOf === null) {
        this.noData = true
        return
      }

      this.mileage = data.mileage
      this.location = data.location
      this.asOf = data.asOf
      this.error = false
      this.noData = false
    },
    dataFailedToLoad () {
      this.error = true
    }
  },
  filters: {
    humanReadable: (date) => moment(date).format('MMMM D, YYYY h:mm A'),
    withCommas: new Intl.NumberFormat('en-US').format
  },
  components: {
    Wrapper
  }
}
</script>

<template>
  <Wrapper :loading="loading">
    <template v-slot:header>
      Vehicle Status <span class="extra">&mdash; {{ vin }}</span>
    </template>
    <div class="warning" v-if="noData">
      No data available
    </div>
    <div
      v-else-if="dataHasLoaded"
      class="vehicleStatus"
    >
      <div class="vehicleStatus__stat">
        <div class="stat__title">Mileage</div>
        <div class="stat__value">{{ mileage | withCommas }}</div>
      </div>
      <div class="vehicleStatus__stat">
        <div class="stat__title">Current Location</div>
        <div class="stat__value"><a :href="mapsLink" target="_blank">See on a map</a></div>
      </div>
      <div class="vehicleStatus__stat">
        <div class="stat__title">Last Updated</div>
        <div class="stat__value">{{ asOf | humanReadable }}</div>
      </div>
    </div>
    <div class="error" v-else-if="error">
      Could not load data.
    </div>
  </Wrapper>
</template>

<style scoped>
.vehicleStatus {
  display: flex;
  flex-direction: column;
}

.vehicleStatus__stat {
  margin: 0 0 0.5em;
  flex-grow: 1;
  display: flex;
}

.vehicleStatus__stat:last-of-type {
  margin: 0;
}

.stat__title {
  font-weight: bold;
  flex-grow: 1;
}
</style>
