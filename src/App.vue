<template>
  <div
    id="app"
    class="dashboard"
    :class="{'dashboard--error': error}"
    v-if="isAuthenticated"
  >
    <WidgetBoard
      v-if="config !== null"
      :wrapperClass="$style.wrapper"
      :widgetClass="$style.widget"
      :config="config"
    />
    <div
      v-else-if="error"
      class="error"
    >
      Could not load the dashboard
    </div>
  </div>
  <div
    class="signInWrapper"
    v-else
  >
    <SignIn class="signIn" />
  </div>
</template>

<script>
import Client from '@/client'
import DashClient from '@/client/DashboardConfig'
import WidgetBoard from '@/components/WidgetBoard'
import SignIn from '@/components/SignIn'
import {mapGetters} from 'vuex'

export default {
  name: 'app',
  data() {
    return {
      config: null,
      error: false
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'token'])
  },
  watch: {
    isAuthenticated() {
      this.loadData()
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      if (!this.isAuthenticated) return

      Client.setAuthToken(this.token)

      DashClient.getConfig()
        .then(this.configLoaded)
        .catch(this.failedToLoad)
    },
    configLoaded(config) {
      this.config = config
    },
    failedToLoad() {
      this.error = true
    }
  },
  components: {
    WidgetBoard,
    SignIn
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2d3436;
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
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: 0;
  padding: 0.5em;
  border-bottom-left-radius: 0.25em;
  border-bottom-right-radius: 0.25em;
}

.error,
.warning {
  padding: 0.5em;
  border-radius: 0.25em;
}

.error {
  background-color: #ff7675;
  color: #fff;
}

.warning {
  background-color: #fdcb6e;
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

<style scoped>
.error {
  margin: 0.5em;
}

.dashboard--error {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
}

.signInWrapper {
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.signIn {
  width: 100%;
  padding: 0.5em;
  box-sizing: border-box;
}
</style>
