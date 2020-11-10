<template>
  <nav>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <router-link to="/">Home</router-link>
        <span v-if="index != Object.keys(items).length - 1"> | </span>
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
        { link: '/', text: 'Home' },
        { link: '/about', text: 'About' }
      ]
    }
  }
}
</script>
