<template lang="pug">
  v-row(align="center" justify="space-around")
    v-btn(text :disabled="!hasPrevPage" @click="gotoPrevPage")
      v-icon mdi-chevron-left
      | Prev
    v-btn(text :disabled="!hasNextPage" @click="gotoNextPage")
      | Next
      v-icon mdi-chevron-right
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class Pagenation extends Vue {
  @Prop({ type: Boolean, required: true })
  hasPrevPage: boolean

  @Prop({ type: Boolean, required: true })
  hasNextPage: boolean

  gotoPrevPage() {
    this.$emit('gotoPrevPage')
  }

  gotoNextPage() {
    this.$emit('gotoNextPage')
  }
}
</script>
