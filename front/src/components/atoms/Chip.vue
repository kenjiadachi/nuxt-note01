<template lang="pug">
v-chip.ma-1(outlined @click='click')
  | # {{ tag }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class Chip extends Vue {
  @Prop({ type: String })
  tag: String

  click() {
    this.$emit('click', this.tag)
  }
}
</script>
