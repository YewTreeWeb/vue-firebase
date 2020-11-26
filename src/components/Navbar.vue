<template>
  <nav class="deep-purple darken-1">
    <div class="nav-wrapper">
      <router-link :to="{ name: 'Home' }" class="brand-logo">GeoNinjas!</router-link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li v-for="(item, index) in navItems" :key="index">
          <router-link :to="{ name: item.url ? item.url : item.text }">
            {{ item.text }}
          </router-link>
        </li>
        <li>
           <router-link :to="{ name: 'Signup' }" v-if="!userStatus">Signup</router-link>
        </li>
        <li>
           <router-link :to="{ name: 'Login' }" v-if="!userStatus">Login</router-link>
        </li>
        <li v-if="userStatus"><a @click="logout">Logout</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import db from '@/firebase/config'
import firebase from 'firebase/app'
import auth from 'firebase/auth'
export default {
  name: 'Navbar',
  data () {
    return {
      navItems: [
        { text: 'Home', url: 'Home' }
      ],
      userStatus: false
    }
  },
  methods: {
    loggedIn () {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.userStatus = true
        }
      })
    },
    logout () {
      firebase.auth().signOut().then(() => {
        this.$router.push({ name: 'Home' })
        this.userStatus = false
      })
    }
  },
  mounted () {
    this.loggedIn()
  }
}
</script>

<style lang="scss">
.brand-logo{
  left: 15px;
}
</style>
