<template>
  <section>
    <h2>{{ title }} {{ this.$route.params.smoothie_slug | capitaliseReplace }}</h2>
  </section>
</template>

<script>
export default {
  name: 'EditSmoothie',
  data () {
    return {
      title: 'Edit a smoothie'
    }
  },
  filters: {
    replace: string => {
      const name = string.replace('-', ' ')
      return name
    },
    capitalise: string => {
      const capitalFirst = string.charAt(0).toUpperCase()
      const noCaseTail = string.slice(1, string.length)
      return capitalFirst + noCaseTail
    },
    capitaliseReplace: (param) => {
      const str = param
      const arr = str.split('-')
      let name
      arr.forEach(item => {
        name += `${this.capitalise(item)} `
      })
      return name.trim()
    }
  }
}
</script>

<style lang="scss">

</style>
