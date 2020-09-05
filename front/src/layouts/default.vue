<template lang="pug">
v-app()
  v-navigation-drawer(app clipped right)
  v-app-bar(app clipped-right)
  v-main
    v-container
      nuxt
  Footer
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Footer from '~/components/organisms/Footer.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

@Component({
  components: {
    Footer,
    VuetifyLogo,
  },
})
export default class Index extends Vue {}
</script>
