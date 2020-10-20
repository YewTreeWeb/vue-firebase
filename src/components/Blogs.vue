<template>
  <section class="blogs">
    <h2>{{ title }}</h2>
    <button @click="changeTitle">Change Title</button>
    <br /><br />
    <input type="text" v-model="searchTerm" />
    <article class="blog" v-for="post in filterdPosts" :key="post.id">
      <h3>{{ post.title }}</h3>
      <p>{{ post.body | excerpt }}</p>
    </article>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Blogs',
  data () {
    return {
      title: 'Blogs',
      posts: [],
      searchTerm: ''
    }
  },
  methods: {
    changeTitle () {
      this.title = 'Blogs all round'
    }
  },
  computed: {
    filterdPosts () {
      return this.posts.filter(post => {
        return post.title.match(this.searchTerm)
      })
    }
  },
  beforeCreate () {
    console.log('beforeCreate hook')
  },
  created () {
    console.log('created hook')
    axios
      .get('https://jsonplaceholder.typicode.com/posts/')
      .then((response) => {
        console.log(response)
        this.posts = response.data
      })
      .catch((error) => console.error(error))
  },
  beforeUpdate () {
    console.log('beforeUpdate hook')
  }
}
</script>

<style lang="scss">
.blogs {
  .blog {
    text-align: left;
  }
}
</style>
