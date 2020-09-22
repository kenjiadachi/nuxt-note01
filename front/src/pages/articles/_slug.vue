<template lang="pug">
v-row
  v-col(cols=12 md=8 lg=7 xl=6)
    v-img(:src="article.image" aspect-ratio=1.9047)
    .px-4
      h1.heading3.pt-12.pb-6
        | {{article.title}}
      p.font-weight-light.pb-6
        | {{this.datetime}}
      nuxt-content(:document="article")
      .tags-container
        v-chip.ma-1(outlined v-for='tag in article.tags' :key='tag')
          | # {{ tag }}
  v-col(cols=12 md=4 lg=5 xl=6).hidden-sm-and-down
    ul
      div(v-for="toc in article.toc" :key="toc.id")
        li(v-if='toc.depth==2') {{toc.text}}
        ul(v-else)
          li {{toc.text}}

</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  layout: 'textbase',
})
export default class Slug extends Vue {
  [x: string]: any
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug || 'index').fetch()
    return { article }
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
hr
  margin 4rem 0
</style>
