<template>
  <section id="all-friends">
    <h2>{{ title }}</h2>
    <div class="friends" v-for="(friend, index) in friends" :key="index">
      <span @click="unfriend(friend.name)">{{ friend.name }}</span>
    </div>
  </section>
</template>

<script>
// Can add object and type within props or have props as an array
export default {
  name: 'AllFriends',
  props: {
    friends: Array
  },
  data () {
    return {
      title: 'All Friends'
    }
  },
  methods: {
    unfriend (name) {
      this.$emit('delete', { name })
    }
  }
}
</script>

<style lang="scss">

</style>
