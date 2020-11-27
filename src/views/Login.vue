<template>
  <section class="login container">
    <h2>{{ title }}</h2>
    <form class="card-panel left-align" @submit.prevent="login">
      <div class="field">
        <label for="email">Email:</label>
        <input type="email" name="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password" />
      </div>
      <p class="red-text center" v-if="feedback">{{ feedback }}</p>
      <div class="field center">
        <button type="submit" class="btn deep-purple">{{ title }}</button>
      </div>
    </form>
  </section>
</template>

<script>
import db from '@/firebase/config'
import firebase from 'firebase/app'
import auth from 'firebase/auth'
export default {
  name: 'Login',
  data () {
    return {
      title: 'Login',
      email: null,
      password: null,
      feedback: null
    }
  },
  methods: {
    login () {
      if ((this.email, this.password)) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then((cred) => {
            if (process.env.NODE_ENV !== 'production' && window.console) {
              console.log('success', cred.user)
            }
            this.$router.push({ name: 'Home' })
          })
          .catch((err) => {
            this.feedback = err.message
            if (window.console) {
              console.error(err)
            }
          })
        this.feedback = null
      } else {
        this.feedback = 'Please fill in both fields'
      }
    }
  }
}
</script>

<style lang="scss">
.login {
  max-width: 500px;
  margin-top: 60px;
  h2 {
    font-size: 2.4em;
  }
  .card-panel {
    margin-top: 60px;
    .field {
      margin-bottom: 16px;
      &:last-of-type {
        margin-bottom: 0;
      }
      button {
        margin: 30px auto;
      }
    }
  }
}
</style>
