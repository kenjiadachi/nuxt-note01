<template lang="pug">
v-container.pt-0(fluid)
  Profile
  TimeLine
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import TimeLine from '~/components/organisms/TimeLine.vue'
import Profile from '~/components/organisms/Profile.vue'

@Component({
  components: {
    TimeLine,
    Profile,
  },
})
export default class About extends Vue {
  async asyncData({ $content, store }) {
    const tagsObj = await $content('articles')
      .where({ isDraft: { $eq: false } })
      .only(['tags'])
      .fetch()
    const alltags = tagsObj
      .map(function(obj) {
        return obj.tags
      })
      .flat()
    const tags = [...new Set(alltags)]
    await store.dispatch('fetchTags', tags)
  }
}
</script>
