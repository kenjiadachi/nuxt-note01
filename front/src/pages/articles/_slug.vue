<template lang="pug">
v-row
  v-col(cols=12 lg=8 xl=7)
    v-img(:src="article.image" aspect-ratio=1.9047)
    .px-4
      h1.heading3.pt-12.pb-6
        | {{article.title}}
      .tags-container.pb-4
        v-chip.ma-1(outlined v-for='tag in article.tags' :key='tag')
          | # {{ tag }}
      p.font-weight-light.pb-6
        | {{this.datetime}}
      nuxt-content(:document="article")
      
  v-col(cols=12 lg=4 xl=5).hidden-md-and-down.side-bar
    .side-bar__fix
      .side-bar__inner
        v-card.mx-0(flat v-if="article.toc.length")
          v-list(dense nav flat)
            v-subheader 目次
            v-list-item-group
              v-list-item(v-for="toc in article.toc" :key="toc.id" :href="'#' + toc.id")
                v-list-item-content
                  v-list-item-title(v-text="toc.text")
        v-card.mx-0(flat v-if="relatedArticles.length")
          v-subheader 関連した投稿
          v-card.py-2.px-2(flat v-for="relatedArticle in relatedArticles" :key="relatedArticle.title" :to="relatedArticle.path")
            v-img(:src="relatedArticle.image" aspect-ratio=1.9047 )


</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
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

<style lang="stylus">
.v-application
  hr
    margin 3rem 0
    border: 0;
    border-top: 0.1rem dashed #ECEFF1;
  a
    text-decoration none
  code
    background-color #ECEFF1
    color #37474F
  pre
    code
      background-color transparent
  h1, h2, h3, h4, h5, h6
    margin-bottom 2rem
  .side-bar
    height 100vh
  .side-bar__fix
    position fixed
    flex: 0 0 25%;
    width: 25%;
    overflow-y: auto;
  .side-bar__inner




  p, li
    margin-bottom 1rem
</style>
