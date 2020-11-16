<template>
  <section class="index container">
    <article class="card" v-for="smoothie in smoothies" :key="smoothie.id">
      <div class="card-content smoothie">
        <i
          class="material-icons smoothie__delete"
          @click="deleteSmoothie(smoothie.id)"
          >delete</i
        >
        <h2 class="smoothie__title">{{ smoothie.name }}</h2>
        <ul class="smoothie__ingredients">
          <li v-for="(ing, index) in smoothie.ingredients" :key="index">
            <span class="chip">{{ ing }}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link
          :to="{
            name: 'EditSmoothie',
            param: { smoothie_slug: smoothie.slug },
          }"
        >
          <i class="material-icons smoothie__edit">edit</i>
        </router-link>
      </span>
    </article>
  </section>
</template>

<script>
import db from '@/firebase/config'
export default {
  name: 'Index',
  data () {
    return {
      smoothies: []
    }
  },
  methods: {
    deleteSmoothie (id) {
      db.collection('smoothies')
        .doc(id)
        .delete()
        .then(() => {
          this.smoothies = this.smoothies.filter((smoothie) => {
            return smoothie.id !== id
          })
        })
        .catch((err) => {
          if (window.console) console.error(err)
        })
    }
  },
  created () {
    // fetch data from firestore
    // db.collection('smoothies').onSnapshot((snapshot) => {
    //   console.log(snapshot.docChanges())
    //   snapshot.docChanges().forEach((change) => {
    //     const doc = change.doc
    //     const smoothie = doc.data()
    //     smoothie.id = doc.id
    //     this.smoothies.push(smoothie)
    //   })
    // })
    db.collection('smoothies')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const smoothie = doc.data()
          smoothie.id = doc.id
          this.smoothies.push(smoothie)
        })
      })
  }
}
</script>

<style lang="scss">
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
  h2 {
    font-size: 1.8em;
    text-align: center;
    margin-top: 0;
  }
  .smoothie {
    &__ingredients {
      margin: 30px auto;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-flow: row wrap;
      > li {
        margin: auto 10px;
      }
    }
    &__delete {
      position: absolute;
      top: 4px;
      right: 4px;
      cursor: pointer;
      color: #aaa;
      font-size: 1.4em;
    }
  }
}
</style>
