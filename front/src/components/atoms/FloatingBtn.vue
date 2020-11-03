<template lang="pug">
v-btn.hidden-sm-and-up(fab large bottom right fixed color="green" dark @click="click")
  v-icon mdi-menu
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class FloatingBtn extends Vue {
  click() {
    this.$emit('click')
  }
}
</script>
