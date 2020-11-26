<template>
  <section class="map">
    <h2>{{ title }}</h2>
    <div class="google-map" id="map"></div>
  </section>
</template>

<script>
import db from '@/firebase/config'
import firebase from 'firebase/app'
import auth from 'firebase/auth'
export default {
  name: 'GMap',
  data () {
    return {
      title: 'Map',
      lat: 53,
      lng: -2
    }
  },
  methods: {
    renderMap () {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: this.lat, lng: this.lng },
        zoom: 6,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false
      })
      console.log(firebase.auth().currentUser)
    }
  },
  mounted () {
    // Get user geolocation
    if (navigator.geolocation) {
      if (process.env.NODE_ENV !== 'production' && window.console) {
        console.log('navigator.geolocation is available')
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.lat = pos.coords.latitude
          this.lng = pos.coords.longitude

          if (process.env.NODE_ENV !== 'production' && window.console) {
            console.log('current position acquired')
            console.log(this.lat, this.lng)
          }

          this.renderMap()
        },
        (err) => {
          console.error(err)
          this.renderMap()
        },
        { maximumAge: 60000, timeout: 6000 }
      )
    } else {
      // Position center by default values
      this.renderMap()
    }
    console.log(`env is ${process.env.NODE_ENV}`)
  }
}
</script>

<style lang="scss">
.google-map {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
