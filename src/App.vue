<template>
  <div id="app">
    <WidgetBoard
      :wrapperClass="$style.wrapper"
      :widgetClass="$style.widget"
      :config="getConfig()"
    />
  </div>
</template>

<script>
import {WidgetBoard} from 'dashboard-lib';

export default {
  name: 'app',
  methods: {
    getConfig() {
      return {
        widgets: [
          {
            name: 'countdown',
            props: {
              since: '2019-12-27',
              until: '2021-06-13',
              title: '24 Hours of Le Mans'
            }
          },
          {
            name: 'vehicle-status',
            props: {
              vin: 'WVWWA7AU2KW223707'
            }
          }
        ]
      }
    }
  },
  components: {
    WidgetBoard
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 16px;
}
</style>

<style module>
.wrapper {
  display: flex;
  padding: 1em;
  flex-direction: column;
}

.widget {
  margin: 0 0 1em;
}

@media screen and (min-width: 600px) {
  .wrapper {
    flex-direction: row;
  }

  .widget {
    width: 25%;
    margin: 0 1em 1em 0;
  }
}
</style>
