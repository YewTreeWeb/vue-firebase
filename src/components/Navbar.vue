<template>
  <nav>
    <ul>
      <li v-for="(item, index) in items" :key="index"><a v-bind:href="item.link">{{ item.text }}</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      items: [
        { text: 'Home', link: '/' },
        { text: 'About', link: '/about' },
        { text: 'Contact', link: '/contact' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
nav {
  text-align: center;
  ul{
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    > li{
      list-style-type: none;
      margin: 0;
    }
  }
}
</style>
