<template lang="pug">
v-app()
  LeftBar
  v-main()
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
export default class Default extends Vue {}
</script>
