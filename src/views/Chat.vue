<template>
  <section class="chat container">
    <h1 class="center text-teal">{{ title }}</h1>
    <div class="card">
      <div class="card-content left-align">
        <ul class="messages">
          <li><span class="teal-text">Name</span></li>
          <li><span class="grey-text text-darken-3">message</span></li>
          <li><span class="grey-text time">time</span></li>
        </ul>
      </div>
      <div class="card-action">
        <input type="text" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Chat",
  props: {
    name: String
  },
  data() {
    return {
      title: "Ninja Chat"
    };
  }
};
</script>

<style lang="scss">
.chat {
  h1 {
    font-size: 2.6em;
    margin-bottom: 40px;
  }
  span {
    font-size: 1.4em;
    &.time {
      font-size: 1.2em;
    }
  }
}
</style>
