<template>
  <div id="app" class="dashboard">
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
              until: '2021-06-13',
              title: '24 Hours of Le Mans 2021'
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

.dashboard .widget {
  border-radius: 0;
  border: 0;
  padding: 0;
}

.dashboard .widget__header {
  background-color: #0984e3;
  color: #fff;
  margin: 0;
  padding: 0.5em;
  box-sizing: border-box;
  border: 1px solid #0984e3;
  border-top-left-radius: 0.25em;
  border-top-right-radius: 0.25em;
}

.dashboard .widget__body {
  border: 1px solid #ccc;
  border-top: 0;
  padding: 0.5em;
  border-bottom-left-radius: 0.25em;
  border-bottom-right-radius: 0.25em;
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
  flex-grow: 1;
}

@media screen and (min-width: 600px) {
  .wrapper {
    flex-direction: row;
  }

  .widget {
    margin: 0 1em 1em 0;
    flex-grow: 0;
  }
}
</style>
