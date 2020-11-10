<template lang="pug">
v-list-item(@click="click")
  v-list-item-content
    v-list-item-title {{ item.text }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

interface ListItemObject {
  text: string
  id: string
}

@Component
export default class ListItem extends Vue {
  @Prop({ type: Object })
  item: ListItemObject

  click() {
    this.$emit('click', this.item.id)
  }
}
</script>
