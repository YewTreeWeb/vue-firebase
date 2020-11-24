<template>
  <section v-if="smoothie" class="edit-smoothie container">
    <h2 class="center-align indigo-text">{{ title }} {{ smoothie.name | capitalise }}</h2>
    <form @submit.prevent="editSmoothie">
      <div class="field name">
        <label for="name">Smoothie Name:</label>
        <input type="text" name="name" v-model="smoothie.name" required />
      </div>
      <div class="field edited-ingredient">
        <label>Current Ingredients:</label>
        <ul v-if="smoothie.ingredients.length > 0">
          <li v-for="(ing, index) in smoothie.ingredients" :key="index">
            <input type="text" name="ingredient" v-model="smoothie.ingredients[index]" />
            <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
          </li>
        </ul>
        <p v-else>No current ingredients</p>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add Ingredient:</label>
        <span class="helper-text">Press the tab key to add an ingredient</span>
        <!-- Disable tab to all ingredients to be added when a user pressed tab -->
        <input
          type="text"
          name="add-ingredient"
          @keydown.tab.prevent="addIng"
          v-model="another"
        />
      </div>
      <div class="field center-align">
        <p class="red-text" v-if="feedback">{{ feedback }}</p>
        <button class="btn pink" type="submit">Update Smoothie</button>
      </div>
    </form>
  </section>
  <section v-else>
    <h2 class="center-align indigo-text">{{ title }} {{ capitaliseReplace(this.$route.params.smoothie_slug) }}</h2>
  </section>
</template>

<script>
import db from '@/firebase/config'
import slugify from 'slugify'
export default {
  name: 'EditSmoothie',
  data () {
    return {
      title: 'Edit the smoothie',
      smoothie: null,
      another: null,
      feedback: null
    }
  },
  filters: {
    capitalise: (string) => {
      const capitalFirst = string.charAt(0).toUpperCase()
      const noCaseTail = string.slice(1, string.length)
      return capitalFirst + noCaseTail
    }
  },
  methods: {
    capitaliseReplace: (param) => {
      const arr = param.split('-')
      let name = ''
      arr.forEach((item) => {
        const capitalFirst = item.charAt(0).toUpperCase()
        const noCaseTail = item.slice(1, item.length)
        name += `${capitalFirst + noCaseTail} `
      })
      return name.trim()
    },
    editSmoothie (e) {
      if (this.smoothie.name) {
        this.feedback = null
        // create slug
        this.smoothie.slug = slugify(this.smoothie.name, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        // add smoothie to fb database
        db.collection('smoothies').doc(this.smoothie.id).update({
          name: this.smoothie.name,
          ingredients: this.smoothie.ingredients,
          slug: this.smoothie.slug
        }).then(() => {
          this.$router.push({ name: 'Index' })
        }).catch(err => { if (window.console) console.error(err) })
      } else {
        this.feedback = 'You must give a smoothie a name'
      }
    },
    addIng () {
      if (this.another) {
        this.smoothie.ingredients.push(this.another)
        this.another = null
        this.feedback = null
      } else {
        this.feedback = 'You must enter a value to add an ingredient'
      }
    },
    deleteIng (ing) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
        return ingredient !== ing
      })
    }
  },
  created () {
    const ref = db
      .collection('smoothies')
      .where('slug', '==', this.$route.params.smoothie_slug)
    ref
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.smoothie = doc.data()
          this.smoothie.id = doc.id
        })
      })
      .then(() => {
        console.log(this.smoothie)
      })
      .catch((err) => {
        if (window.console) console.error(err)
      })
  }
}
</script>

<style lang="scss">
  .edit-smoothie {
    margin-top: 60px;
    padding: 20px;
    h2{
      font-size: 2em;
      margin: 20px auto;
    }
    > form{
      max-width: 500px;
      margin: 0 auto;
      text-align: left;
      .field{
        margin: 20px auto;
      }
      .delete{
        position: absolute;
        right: 0;
        bottom: 16px;
        color: #aaa;
        font-size: 1.4em;
        cursor: pointer;
      }
      label{
        font-size: 1rem;
      }
      .helper-text{
        color: #aaa;
        display: block;
        font-size: .8rem
      }
      .edited-ingredient {
        ul{
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-flow: row wrap;
          li{
            position: relative;
            margin: auto 10px;
            &:first-child{
              margin-left: 0;
            }
            &:last-child{
              margin-right: 0;
            }
          }
        }
      }
    }
  }
</style>
