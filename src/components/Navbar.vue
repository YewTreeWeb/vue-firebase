<template>
  <nav>
    <div class="nav-wrapper">
      <ul id="nav-mobile" class="left hide-on-med-and-down">
        <li v-for="(item, index) in navItems" :key="index">
          <router-link :to="{ name: item.url ? item.url : item.text }">
            {{ item.text }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      navItems: [
        { text: "Home", url: "Home" },
        { text: "Chat", url: "Chat" }
      ]
    };
  }
};
</script>
