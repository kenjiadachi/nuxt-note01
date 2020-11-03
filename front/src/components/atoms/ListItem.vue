<template lang="pug">
v-list-item(@click="click")
  v-list-item-icon
    v-icon( :color="item.color" ) {{ item.icon }}
  v-list-item-content
    v-list-item-title {{ item.title }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

interface ListItemObject {
  title: string
  icon: string
  color: string
  url: string
}

@Component
export default class ListItem extends Vue {
  @Prop({ type: Object })
  item: ListItemObject

  click() {
    this.$emit('click', this.item.url)
  }
}
</script>
