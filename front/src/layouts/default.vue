<template lang="pug">
v-app
  LeftBar(:drawer.sync="drawer")
  v-main
    nuxt
    FloatingBtn(@click="drawer = !drawer")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import LeftBar from '~/components/organisms/LeftBar.vue'
import FloatingBtn from '~/components/atoms/FloatingBtn.vue'

@Component({
  components: {
    LeftBar,
    FloatingBtn,
  },
})
export default class Default extends Vue {
  drawer = null
}
</script>
