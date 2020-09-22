<template lang="pug">
v-layout(column)

  CardRow(:articles='articles')

</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import CardRow from '~/components/organisms/CardRow.vue'

@Component({
  components: {
    CardRow,
  },
})
export default class Index extends Vue {
  async asyncData({ $content }) {
    const query = await $content('articles').limit(15)
    const articles = await query.fetch()
    return { articles }
  }
}
</script>
