<template>
  <nav>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <router-link :to="{ name: item.link }">{{ item.link }}</router-link>
        <span v-if="index != Object.keys(items).length - 1">|</span>
      </li>
    </ul>
    <h2>User Profiles</h2>
    <ul>
      <li v-for="(id, index) in userIds" :key="index">
        <router-link :to="{ name: 'Profile', params: { user_id: id } }"><span>Profile {{ id }}</span></router-link>
      </li>
    </ul>
    <h2>Navigation Controls</h2>
    <ul>
      <li><button @click="goBack">Go Back</button></li>
      <li><button @click="goHome">Redirect to Home</button></li>
      <li><button @click="goForward">Go Forward</button></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      items: [
        { link: 'Home' },
        { link: 'About' },
        { link: 'Profile' }
      ],
      userIds: ['1', '2', '3', '4']
    }
  },
  methods: {
    goHome () {
      this.$router.push({ name: 'Home' })
    },
    goBack () {
      this.$router.go(-1)
    },
    goForward () {
      this.$router.go(1)
    }
  }
}
</script>

<style lang="scss">
nav {
  padding: 30px;

  ul {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: row wrap;
    list-style-type: none;
    padding-left: unset;
    > li{
      a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
          color: #42b983;
        }
      }
      span{
        margin: 0 5px;
      }
    }
  }

}
</style>
