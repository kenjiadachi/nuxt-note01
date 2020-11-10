<template lang="pug">
v-card.mx-0(flat v-if="toc.length")
  v-subheader 目次
  v-list(dense nav flat)
    v-list-item-group
      ListItem(v-for="t in toc" :key="t.id" v-scroll-to="'#' + t.id" :item="t")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ListItem from '~/components/atoms/ListItem.vue'

interface TocObject {
  deps: number
  id: string
  text: string
}

@Component({
  components: {
    ListItem,
  },
})
export default class Toc extends Vue {
  @Prop({ type: Array, required: true })
  toc: Array<TocObject>
}
</script>
