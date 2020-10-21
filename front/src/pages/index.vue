<template lang="pug">
v-container.pt-0(fluid)
  Header(v-if="$route.query.tag" :tag="$route.query.tag")
  Cards(:articles='articles')
  Pagenation(:hasPrevPage='hasPrevPage', :hasNextPage='hasNextPage', @gotoPrevPage='gotoPrevPage', @gotoNextPage='gotoNextPage')

</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Cards from '~/components/organisms/Cards.vue'
import Pagenation from '~/components/organisms/Pagenation.vue'
import Header from '~/components/organisms/Header.vue'

@Component({
  components: {
    Cards,
    Pagenation,
    Header,
  },
  watchQuery: ['page'],
})
export default class Index extends Vue {
  async asyncData({ $content, query }) {
    const PER_PAGE = 24
    const PAGE = parseInt(query.page) || 1
    const articles = await $content('articles')
      .only(['title', 'path', 'tags', 'image', 'description'])
      .sortBy('createdAt', 'desc')
      .skip(PER_PAGE * (PAGE - 1))
      .limit(PER_PAGE)
      .fetch()
    const hasPrevPage = PAGE !== 1
    const hasNextPage = articles.length === PER_PAGE
    return { articles, hasPrevPage, hasNextPage }
  }

  gotoPrevPage() {
    this.$router.push({ path: '/', query: { page: parseInt(this.$route.query.page) - 1 } })
  }

  gotoNextPage() {
    if (this.$route.query.page) {
      this.$router.push({ path: '/', query: { page: parseInt(this.$route.query.page) + 1 } })
    } else {
      this.$router.push({ path: '/', query: { page: 2 } })
    }
  }
}
</script>
