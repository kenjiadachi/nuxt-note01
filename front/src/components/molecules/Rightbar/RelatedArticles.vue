<template lang="pug">
v-card.mx-0(flat v-if="articles.length")
  v-subheader 関連した投稿
  ImageOnlyCard(v-for="article in articles" :key="article.title" @click="gotoArticlePage" :item="article")

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ImageOnlyCard from '~/components/atoms/ImageOnlyCard.vue'

interface RelatedArticleObject {
  description: string
  extention: string
  image: string
  path: string
  title: string
}

@Component({
  components: {
    ImageOnlyCard,
  },
})
export default class RelatedArticles extends Vue {
  @Prop({ type: Array, required: true })
  articles: Array<RelatedArticleObject>

  gotoArticlePage(url) {
    this.$router.push({ path: url })
  }
}
</script>
