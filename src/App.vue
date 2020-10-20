<template>
  <div id="app">
    <Navbar />
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>{{ title }}</h1>
    <HelloWorld msg="Hello World! Welcome to Your Vue.js App" />
    <Blogs />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Navbar from './components/Navbar'
import Blogs from './components/Blogs'

export default {
  name: 'App',
  data () {
    return {
      title: 'Learning Vue'
    }
  },
  components: {
    HelloWorld,
    Navbar,
    Blogs
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
