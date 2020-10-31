<template lang="pug">
v-app()
  NavBar
  v-main
    v-container
      nuxt
  Footer
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import NavBar from '~/components/organisms/NavBar.vue'
import Footer from '~/components/organisms/Footer.vue'

@Component({
  components: {
    NavBar,
    Footer,
  },
})
export default class Textbase extends Vue {}
</script>
