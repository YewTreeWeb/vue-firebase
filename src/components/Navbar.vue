<template>
  <nav>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <router-link :to="{ name: item.link }">{{ item.link }}</router-link>
        <span v-if="index != Object.keys(items).length - 1">|</span>
      </li>
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
        { link: 'About' }
      ]
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
