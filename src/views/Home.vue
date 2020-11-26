<template>
  <div class="home">
    <GMap />
  </div>
</template>

<script>
// @ is an alias to /src
import GMap from '@/components/GMap'

export default {
  name: 'Home',
  components: {
    GMap
  }
}
</script>
