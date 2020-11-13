<template>
  <section class="index container">
    <article class="card" v-for="smoothie in smoothies" :key="smoothie.id">
      <div class="card-content smoothie">
        <i class="material-icons smoothie__delete" @click="deleteSmoothie(smoothie.id)">delete</i>
        <h2 class="smoothie__title">{{ smoothie.title }}</h2>
        <ul class="smoothie__ingredients">
          <li v-for="(ing, index) in smoothie.ingredients" :key="index">
            <span class="chip">{{ ing }}</span>
          </li>
        </ul>
      </div>
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
      this.smoothies = this.smoothies.filter(smoothie => {
        return smoothie.id !== id
      })
    }
  },
  created () {
    // fetch data from firestore
    // db.collection('smoothies').onSnapshot((snapshot) => {
    //   console.log(snapshot.docChanges())
    //   snapshot.docChanges().forEach((change) => {
    //     const doc = change.doc
    //     console.log(doc.id)
    //   })
    // })
    db.collection('smoothies').get().then((snapshot) => {
      snapshot.forEach(doc => {
        console.log(doc.id)
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
      > li{
        margin: auto 10px;
      }
    }
    &__delete{
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
