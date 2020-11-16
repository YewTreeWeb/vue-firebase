<template>
  <nav>
    <div class="nav-wrapper">
      <ul id="nav-mobile" class="left hide-on-med-and-down">
        <li v-for="(item, index) in navItems" :key="index">
          <router-link :to="{ name: item.url ? item.url : item.text }">
            {{ item.text }}
          </router-link>
        </li>
        <a
          href="#"
          class="btn-floating btn-large halfway-fab waves-effect waves-light pink right"
        >
          <router-link :to="{ name: 'AddSmoothie' }"><i class="material-icons">add</i></router-link>
        </a>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      navItems: [{ text: 'Ninja Smoothies', url: 'Index' }]
    }
  }
}
</script>
