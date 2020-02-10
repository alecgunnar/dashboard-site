<template>
  <form
    class="signIn"
    @submit="signIn"
  >
    <div
      v-if="error"
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
import AuthClient from '@/client/Auth'

export default {
  name: 'SignIn',
  data() {
    return {
      username: '',
      password: '',
      error: false
    };
  },
  methods: {
    signIn(e) {
      e.preventDefault();

      if (this.username === '' || this.password === '') {
        this.error = true
        return
      }

      this.error = false

      AuthClient.getToken(this.username, this.password)
        .then(this.credentialsAccepted)
        .catch(this.credentialsRejected)
    },
    credentialsAccepted({token}) {
      this.$emit('authed', token)
    },
    credentialsRejected() {
      this.error = true
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