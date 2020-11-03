<template lang="pug">
v-col(cols=12 lg=8 xl=7)
  v-img(:src="article.image" aspect-ratio=1.9047)
  .px-4
    h1.heading3.pt-12.pb-6
      | {{article.title}}
    .tags-container.pb-4
      Chip(v-for='tag in article.tags' :key='tag' :tag="tag")
    p.font-weight-light.pb-6
      | {{ this.datetime }}
    nuxt-content(:document="article")

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import Chip from '~/components/atoms/Chip.vue'

interface ArticleContentObject {
  body: object
  createdAt: string
  updatedAt: string
  image: string
  title: string
  tags: Array<string>
}

@Component({
  components: {
    Chip,
  },
})
export default class ArticleContent extends Vue {
  @Prop({ type: Array, required: true })
  article: ArticleContentObject

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
  p, li
    margin-bottom 1rem
</style>
