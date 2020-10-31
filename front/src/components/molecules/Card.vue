<template lang="pug">

v-card.mx-0.mb-4(outline @click="gotoArticlePage")
  v-img(:src="article.image" aspect-ratio=1.9047)
  v-card-title
    | {{ article.title }}
  v-card-subtitle
    | {{ article.description }}
  v-card-text
    v-chip.ma-1(outlined v-for='tag in article.tags' :key='tag' :to="{path: '/', query: {tag: tag}}")
      | # {{ tag }}

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class Card extends Vue {
  @Prop({ type: Object, required: true })
  article: object

  gotoArticlePage() {
    this.$router.push({ path: this.article.path })
  }
}
</script>
