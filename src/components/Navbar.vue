<template>
  <nav>
    <div class="nav-wrapper">
      <ul id="nav-mobile" class="left hide-on-med-and-down">
        <!-- <li v-for="(item, index) in navItems" :key="index">
          <router-link :to="{ name: item }">
            <span class="nav-title">{{ item }}</span>
          </router-link>
        </li> -->
        <li>
          <router-link to="">Ninja Smoothies</router-link>
        </li>
        <a
          href=""
          class="btn-floating btn-large halfway-fab waves-effect waves-light pink right"
        >
          <router-link to=""><i class="material-icons">add</i></router-link>
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
      navItems: ['Home', 'Ninja Smoothies']
    }
  }
}
</script>
