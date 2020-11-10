<template lang="pug">
v-col(cols=12 lg=4 xl=5).hidden-md-and-down.side-bar
  .side-bar__fix
    Toc(:toc="toc")
    RelatedArticles(:articles="articles")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import Toc from '~/components/molecules/Rightbar/Toc.vue'
import RelatedArticles from '~/components/molecules/Rightbar/RelatedArticles.vue'

interface TocObject {
  deps: number
  id: string
  text: string
}

interface RelatedArticleObject {
  description: string
  extention: string
  image: string
  path: string
  title: string
}

@Component({
  components: {
    Toc,
    RelatedArticles,
  },
})
export default class RightBar extends Vue {
  @Prop({ type: Array, required: true })
  toc: Array<TocObject>

  @Prop({ type: Array, required: true })
  articles: Array<RelatedArticleObject>
}
</script>

<style lang="stylus">
.side-bar
  height 100vh
.side-bar__fix
  position fixed
  flex: 0 0 25%
  width: 25%
  overflow-y: auto
</style>
