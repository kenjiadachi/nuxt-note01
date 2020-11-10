<template lang="pug">
v-card.py-2.px-2(flat @click="click" max-width="14rem")
  v-img(:src="item.image" aspect-ratio=1.9047 )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

interface ImageOnlyCardObject {
  image: string
  path: string
}

@Component
export default class ImageOnlyCard extends Vue {
  @Prop({ type: Object })
  item: ImageOnlyCardObject

  click() {
    this.$emit('click', this.item.path)
  }
}
</script>
