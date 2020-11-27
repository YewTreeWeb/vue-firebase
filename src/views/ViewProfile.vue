<template>
  <section class="profile container">
    <div v-if="profile" class="card">
      <h2 class="deep-purple-text center">{{ profile.alias }}'s Wall</h2>
      <ul class="comments collection">
        <li v-for="(comment, index) in comments" :key="index" class="comment">
          <p class="deep-purple-text">
            {{ comment.from }}
            <small class="darken-2">{{ comment.time }}</small>
          </p>
          <p class="grey-text darken-2">{{ comment.content }}</p>
        </li>
      </ul>
      <form @submit.prevent="addComment">
        <div class="field">
          <label for="comment">Add a comment:</label>
          <input type="text" name="comment" v-model="newComment" />
          <p class="red-text center" v-if="feedback">{{ feedback }}</p>
          <button type="submit" class="btn">Add Comment</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import db from '@/firebase/config'
import firebase from 'firebase/app'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
export default {
  name: 'ViewProfile',
  data () {
    return {
      profile: null,
      newComment: null,
      feedback: null,
      user: null,
      comments: []
    }
  },
  methods: {
    addComment () {
      // add new comment to firebase
      if (this.newComment) {
        this.feedback = null
        db.collection('comments')
          .add({
            to: this.$route.params.id,
            from: this.user.alias,
            content: this.newComment,
            time: Date.now()
          })
          .then(() => {
            this.newComment = null
          })
          .catch((err) => {
            if (window.console) {
              console.error(err)
            }
          })
      } else {
        this.feedback = 'You must enter a comment to add it'
      }
    }
  },
  created () {
    // Make the dayJS plugin extend the original library
    dayjs.extend(localizedFormat)
    // get the user collection
    const ref = db.collection('users')

    // get current user
    ref
      .where('user_id', '==', firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.user = doc.data()
          this.user.id = doc.id
        })
      })

    // profile data
    ref
      .doc(this.$route.params.id)
      .get()
      .then((user) => {
        this.profile = user.data()
      })
      .catch((err) => {
        if (window.console) {
          console.error(err)
        }
      })

    // comments
    db.collection('comments').where('to', '==', this.$route.params.id).onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          // push puts items at the end. unshift puts items at the start
          // using unshift to get correct order
          this.comments.unshift({
            from: change.doc.data().from,
            content: change.doc.data().content,
            time: dayjs(change.doc.data().time).format('lll')
          })
        }
      })
    })
  }
}
</script>

<style lang="scss">
.profile{
  .card{
    padding: 20px;
    margin-top: 60px;
  }
  h2{
    font-size: 2em;
    margin-top: 0;
  }
  li{
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
}
</style>
