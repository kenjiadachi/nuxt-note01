<template lang="pug">
v-app()
  LeftBar
  v-main(class="grey lighten-3")
    nuxt
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import LeftBar from '~/components/organisms/LeftBar.vue'

@Component({
  components: {
    LeftBar,
  },
})
export default class Index extends Vue {}
</script>
