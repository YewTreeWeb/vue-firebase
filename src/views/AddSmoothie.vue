<template>
  <section>
    <div class="add-smoothie container">
      <h2 class="center-align indigo-text">{{ title }}</h2>
      <form @submit.prevent="addSmoothie">
        <div class="field name">
          <label for="name">Smoothie Name:</label>
          <input type="text" name="name" v-model="name" required>
        </div>
        <div class="field added-ingredient">
          <label>Current Ingredients:</label>
          <ul v-if="ingredients.length > 0">
            <li v-for="(ing, index) in ingredients" :key="index">
              <input type="text" name="ingredient" v-model="ingredients[index]">
              <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </li>
          </ul>
          <p v-else>No current ingredients</p>
        </div>
        <div class="field add-ingredient">
          <label for="add-ingredient">Add Ingredient:</label>
          <span class="helper-text">Press the tab key to add an ingredient</span>
          <!-- Disable tab to all ingredients to be added when a user pressed tab -->
          <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
        </div>
        <div class="field center-align">
          <p class="red-text" v-if="feedback">{{ feedback }}</p>
          <button class="btn pink" type="submit">Add Smoothie</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import db from '@/firebase/config'
import slugify from 'slugify'
export default {
  name: 'AddSmoothie',
  data () {
    return {
      title: 'Add New Smoothie Recipe',
      name: null,
      another: null,
      ingredients: [],
      feedback: null,
      slug: null
    }
  },
  methods: {
    addSmoothie (e) {
      if (this.name) {
        this.feedback = null
        // create slug
        this.slug = slugify(this.name, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        // add smoothie to fb database
        db.collection('smoothies').add({
          name: this.name,
          ingredients: this.ingredients,
          slug: this.slug
        }).then(() => {
          this.$router.push({ name: 'Index' })
        }).catch(err => { if (window.console) console.error(err) })
      } else {
        this.feedback = 'You must give a smoothie a name'
      }
    },
    addIng () {
      if (this.another) {
        this.ingredients.push(this.another)
        this.another = null
        this.feedback = null
      } else {
        this.feedback = 'You must enter a value to add an ingredient'
      }
    },
    deleteIng (ing) {
      this.ingredients = this.ingredients.filter(ingredient => {
        return ingredient !== ing
      })
    }
  }
}
</script>

<style lang="scss">
  .add-smoothie {
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
      .added-ingredient {
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
