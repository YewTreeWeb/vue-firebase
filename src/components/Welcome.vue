<template>
  <section class="welcome container">
    <div class="card">
      <div class="card-content center-align">
        <h1 class="teal-text">{{ title }}</h1>
        <form @submit.prevent="enterChat">
          <label for="name">Enter your name:</label>
          <input type="text" name="name" v-model="name" />
          <p v-if="feedback" class="red-text">{{ feedback }}</p>
          <button type="submit" class="btn teal">Enter Chat</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return {
      title: "Welcome All!",
      name: null,
      feedback: null
    };
  },
  methods: {
    enterChat() {
      if (this.name) {
        this.$router.push({ name: "Chat", params: { name: this.name } });
      } else {
        this.feedback = "You must enter a name to join";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.welcome {
  max-width: 600px;
  margin-top: 100px;
  h2 {
    font-size: 3em;
  }
  button {
    margin: 30px auto;
  }
}
</style>
