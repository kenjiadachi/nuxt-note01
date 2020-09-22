<template lang="pug">
div
  div(v-for='article in articles')
    Card(:key='article.slug' :article='article')
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import Card from '~/components/molecules/Card.vue'

interface Article {
  slug: string
}

@Component({
  components: {
    Card,
  },
})
export default class CardRow extends Vue {
  @Prop({ type: Array, required: true })
  articles: Array<Article>
}
</script>

<style lang="stylus">
.v-card
  margin: 0 2rem 2rem
</style>
