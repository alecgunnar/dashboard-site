<template>
  <form
    class="signIn"
    @submit="attemptToSignIn"
  >
    <div
      v-if="submitFailed"
      class="error"
    >
      Your credentials were not accepted.
    </div>
    <div class="signIn__field">
      <label for="username">
        Username
      </label>
      <input
        type="text"
        name="username"
        v-model="username"
      />
    </div>
    <div class="signIn__field">
      <label for="username">
        Password
      </label>
      <input
        type="password"
        name="password"
        v-model="password"
      />
    </div>
    <div class="signIn__button">
      <button>Sign In</button>
    </div>
  </form>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'SignIn',
  data() {
    return {
      username: '',
      password: '',
      emptyInput: false
    };
  },
  computed: {
    ...mapGetters(['credentialsWereRejected']),
    submitFailed() {
      return this.emptyInput || this.credentialsWereRejected
    }
  },
  methods: {
    ...mapActions(['signIn']),
    attemptToSignIn(e) {
      e.preventDefault();

      this.emptyInput = false

      if (this.username === '' || this.password === '') {
        this.emptyInput = true
        return
      }

      this.signIn({
        username: this.username,
        password: this.password
      })
    }
  }
}
</script>

<style scoped>
.signIn {
  font-size: 1.5em;
}

.error {
  margin: 0 0 1em;
}

label,
input,
button {
  font-size: 1em;
}

label {
  display: block;
  margin: 0 0 0.25em;
}

input,
button {
  border: 1px solid #CCC;
  width: 100%;
  outline: none;
}

.signIn__field {
  margin: 0 0 1em;
}
</style>