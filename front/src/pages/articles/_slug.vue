<template lang="pug">
v-row
  ArticleContent(:article="article")
  RightBar(:toc="article.toc" :articles="relatedArticles")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ArticleContent from '~/components/organisms/ArticleContent.vue'
import RightBar from '~/components/organisms/RightBar.vue'

@Component({
  components: {
    ArticleContent,
    RightBar,
  },
})
export default class Slug extends Vue {
  [x: string]: any
  async asyncData({ $content, params, store }) {
    const RELATED_ARTICLES_COUNT = 3
    const article = await $content('articles', params.slug).fetch()
    const relatedArticles = await $content('articles')
      .only(['title', 'path', 'image', 'description'])
      .sortBy('createdAt', 'desc')
      .where({ tags: { $containsAny: article.tags }, title: { $ne: article.title } })
      .limit(RELATED_ARTICLES_COUNT)
      .fetch()
    const tagsObj = await $content('articles')
      .only(['tags'])
      .fetch()
    const alltags = tagsObj
      .map(function(obj) {
        return obj.tags
      })
      .flat()
    const tags = [...new Set(alltags)]
    await store.dispatch('fetchTags', tags)
    return { article, relatedArticles }
  }

  get datetime() {
    const year = this.article.updatedAt.slice(0, 4)
    const month = this.article.updatedAt.slice(5, 7)
    const date = this.article.updatedAt.slice(8, 10)
    const time = this.article.updatedAt.slice(11, 19)
    return year + '/' + month + '/' + date + ' ' + time
  }
}
</script>
