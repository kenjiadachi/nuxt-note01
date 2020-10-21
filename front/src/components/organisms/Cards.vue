<template lang="pug">
v-row
  v-col(v-for='article in articles' cols="12" md="6" lg="4" xl="3")
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
export default class Cards extends Vue {
  @Prop({ type: Array, required: true })
  articles: Array<Article>
}
</script>
