<template>
  <section class="chat container">
    <h1 class="center teal-text">{{ title }}</h1>
    <div class="card">
      <div class="card-content left-align">
        <ul class="messages" v-chat-scroll>
          <li v-for="message in messages" :key="message.id">
            <span class="teal-text">{{ message.name }}</span>
            <span class="grey-text text-darken-3">{{ message.content }}</span>
            <span class="grey-text time">{{ message.timestamp }}</span>
          </li>
        </ul>
      </div>
      <div class="card-action">
        <NewMessage :name="name" />
      </div>
    </div>
  </section>
</template>

<script>
import db from "@/firebase/config";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import NewMessage from "@/components/NewMessage";
export default {
  name: "Chat",
  props: {
    name: String
  },
  data() {
    return {
      title: "Ninja Chat",
      messages: []
    };
  },
  components: {
    NewMessage
  },
  created() {
    const ref = db.collection("messages").orderBy("timestamp");

    // Make the dayJS plugin extend the original library
    dayjs.extend(localizedFormat);

    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        const doc = change.doc;
        if (change.type === "added") {
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            content: doc.data().content,
            timestamp: dayjs(doc.data().timestamp).format("lll")
          });
        }
      });
    });
  }
};
</script>

<style lang="scss">
.chat {
  h1 {
    font-size: 2.6em;
    margin-bottom: 40px;
  }
  .messages {
    max-height: 400px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 3px;
    }
    &::-webkit-scrollbar-track {
      background: #ddd;
    }
    &::-webkit-scrollbar-thumb {
      background: #aaa;
    }
    li {
      margin-top: 10px;
      &:first-child {
        margin-top: 0;
      }
      span {
        font-size: 1.4em;
        &:nth-of-type(2) {
          margin-left: 10px;
        }
        &.time {
          font-size: 0.8em;
          display: block;
        }
      }
    }
  }
}
</style>
