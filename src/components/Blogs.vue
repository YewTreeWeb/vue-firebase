<template>
  <section class="blogs">
    <article class="blog">
      <h2>{{ title }}</h2>
      <button @click="changeTitle">Change Title</button>
    </article>
  </section>
</template>

<script>
export default {
  name: 'Blogs',
  data () {
    return {
      title: 'Blogs'
    }
  },
  methods: {
    changeTitle () {
      this.title = 'Blogs all round'
    }
  },
  beforeCreate () {
    console.log('beforeCreate hook')
  },
  created () {
    console.log('created hook')
  },
  beforeUpdate () {
    alert('beforeUpdate hook')
  }
}
</script>

<style lang="scss"></style>
