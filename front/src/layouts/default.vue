<template lang="pug">
v-app()
  LeftBar( :drawer.sync="drawer" )
  v-main()
    nuxt
    v-btn.hidden-sm-and-up(fab large bottom right fixed color="green" dark @click="drawer = !drawer")
      v-icon mdi-menu
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import LeftBar from '~/components/organisms/LeftBar.vue'

@Component({
  components: {
    LeftBar,
  },
})
export default class Default extends Vue {
  drawer = null
}
</script>
