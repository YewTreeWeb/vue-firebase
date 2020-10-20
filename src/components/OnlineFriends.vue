<template>
  <section id="online-friends">
    <h2>{{ title }}</h2>
    <div class="friends" v-for="(friend, index) in friends" :key="index">
      <span v-if="friend.online">{{ friend.name }}</span>
    </div>
  </section>
</template>

<script>
export default {
  name: 'OnlineFriends',
  props: ['friends'],
  data () {
    return {
      title: 'Online Friends'
    }
  }
}
</script>

<style lang="scss">

</style>
