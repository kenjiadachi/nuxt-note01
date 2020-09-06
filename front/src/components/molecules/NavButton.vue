<template lang="pug">

v-tab(text :to="this.to")
  v-icon {{ this.icon }}
  span {{ this.title }}

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class NavButton extends Vue {
  @Prop({ type: String, required: true })
  title: string

  @Prop({ type: String, required: true })
  icon: string

  @Prop({ type: String, required: true })
  to: string
}
</script>
