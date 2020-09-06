<template lang="pug">
v-app()
  NavBar
  v-container
    LeftBar
    v-main
      v-container
        nuxt
    RightBar
  Footer
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import NavBar from '~/components/organisms/NavBar.vue'
import RightBar from '~/components/organisms/RightBar.vue'
import LeftBar from '~/components/organisms/LeftBar.vue'
import Footer from '~/components/organisms/Footer.vue'

@Component({
  components: {
    NavBar,
    RightBar,
    LeftBar,
    Footer,
  },
})
export default class Index extends Vue {}
</script>
