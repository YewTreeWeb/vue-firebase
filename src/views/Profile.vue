<template>
  <section>
    <h1>{{ title }}</h1>
    <h2>Profile for {{ userID }}</h2>
    <input type="text" v-model="userID" />
  </section>
</template>

<script>
export default {
  name: 'Profile',
  data () {
    return {
      title: 'Profile',
      userID: this.$route.params.user_id,
      newUser: ''
    }
  },
  methods: {
    updateID () {
      console.log('route changed')

      this.userID = this.$route.params.user_id
    }
  },
  // beforeRouteUpdate () {
  //   console.log('before hello')

  //   // console.log(this.$route.params.user_id)
  //   console.log(`before update user ID is: ${this.$route.params.user_id}`)
  //   // this.userID = this.$route.params.user_id
  // },
  watch: {
    $route (to, from) {
      this.userID = this.$route.params.user_id
      console.log(`User ID is now: ${this.$route.params.user_id}`)
    },
    '$route.params': {
      handler () {
        console.log('hello')
        // this.userID = this.$route.params.user_id
        console.log(`User ID is: ${this.$route.params.user_id}`)
      },
      immediate: true,
      deep: true
    },
    // $route: {
    //   deep: true,
    //   immediate: true,
    //   handler () {
    //     //     // this.updateID()
    //     console.log('hello')

    //     //     console.log(this.$route.params.user_id)
    //     //     this.userID = this.$route.params.user_id
    //     //     console.log(this.$route.params.user_id)
    //   }
    // },
    userID: {
      handler () {
        console.log('userID has changed')
      }
    }
  }
}
</script>
