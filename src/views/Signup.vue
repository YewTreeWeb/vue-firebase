<template>
  <section class="signup container">
    <h2>{{ title }}</h2>
    <form class="card-panel left-align" @submit.prevent="signup">
      <div class="field">
        <label for="email">Email:</label>
        <input type="email" name="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password" />
      </div>
      <div class="field">
        <label for="alias">Alias:</label>
        <input type="text" name="alias" v-model="alias" />
      </div>
      <p class="red-text center" v-if="feedback">{{ feedback }}</p>
      <div class="field center">
        <button type="submit" class="btn deep-purple">{{ title }}</button>
      </div>
    </form>
  </section>
</template>

<script>
import slugify from 'slugify'
import db from '@/firebase/config'
import firebase from 'firebase/app'
import auth from 'firebase/auth'
export default {
  name: 'Signup',
  data () {
    return {
      title: 'Signup',
      email: null,
      password: null,
      alias: null,
      feedback: null,
      slug: null
    }
  },
  methods: {
    signup () {
      if (this.alias && this.email && this.password) {
        // Create slug from chosen alias
        this.slug = slugify(this.alias, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        // Check if the alias already exists in the Firebase db
        const ref = db.collection('users').doc(this.slug)
        ref.get().then((doc) => {
          if (doc.exists) {
            this.feedback = 'This alias already exists!'
          } else {
            firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .then((cred) => {
                if (process.env.NODE_ENV !== 'production' && window.console) {
                  console.log(cred.user, process.env.NODE_ENV)
                }
                ref.set({
                  alias: this.alias,
                  geolocation: null,
                  user_id: cred.user.uid
                })
              })
              .then(() => {
                this.$router.push({ name: 'Home' })
              })
              .catch((err) => {
                if (window.console) {
                  const errorCode = err.code
                  const errorMessage = err.message
                  console.error({ errorCode })
                  if (errorCode === 'auth/weak-password') {
                    console.error('The password is too weak.')
                  } else {
                    console.error({ errorMessage })
                  }
                }
              })
            this.feedback = null
          }
        })
      } else {
        this.feedback = 'You must enter all fields'
      }
    }
  }
}
</script>

<style lang="scss">
.signup {
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
