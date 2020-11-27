<template>
  <nav class="deep-purple darken-1">
    <div class="nav-wrapper">
      <router-link :to="{ name: 'Home' }" class="logo">GeoNinjas!</router-link>
      <ul class="menu">
        <li v-for="(item, index) in navItems" :key="index">
          <router-link :to="{ name: item.url ? item.url : item.text }">
            {{ item.text }}
          </router-link>
        </li>
      </ul>
      <ul class="user">
        <li>
          <router-link :to="{ name: 'Signup' }" v-if="!user"
            >Signup</router-link
          >
        </li>
        <li>
          <router-link :to="{ name: 'Login' }" v-if="!user">Login</router-link>
        </li>
        <li v-if="user">{{ user.email }}</li>
        <li v-if="user"><a @click="logout">Logout</a></li>
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
      navItems: [{ text: 'Home', url: 'Home' }, { text: 'Profile', url: 'ViewProfile' }],
      // userStatus: false
      user: null
    }
  },
  methods: {
    // loggedIn () {
    //   firebase.auth().onAuthStateChanged(user => {
    //     if (user) {
    //       this.userStatus = true
    //     }
    //   })
    // },
    logout () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: 'Login' })
          // this.userStatus = false
        })
    }
  },
  // mounted () {
  // this.loggedIn()
  // },
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user
      } else {
        this.user = null
      }
    })
  }
}
</script>

<style lang="scss">
.nav-wrapper {
  display: flex;
  place-content: center flex-start;
  flex-flow: row nowrap;
  .logo {
    margin: auto 15px;
    font-size: 2.4em;
    font-weight: bold;
  }
  .menu {
    text-align: center;
    display: flex;
    align-items: center;
  }
  .user {
    margin-left: auto;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
