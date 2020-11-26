import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import firebase from 'firebase/app'

Vue.config.productionTip = false

let app = null

// Wait for firebase auth to init before creating app
firebase.auth().onAuthStateChanged(() => {
  // init app if no already created
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})
/* eslint-disable no-new */
