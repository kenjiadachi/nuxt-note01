<template lang="pug">
v-chip-group(column active-class="primary--text")
  Chip(v-for='tag in tags' :key='tag' :tag="tag" @click='searchWithTag')
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import Chip from '~/components/atoms/Chip.vue'

@Component({
  components: {
    Chip,
  },
})
export default class NavBarChips extends Vue {
  @Prop({ type: Array })
  tags: Array<string>

  searchWithTag(tag: string) {
    this.$router.push({ path: '/', query: { tag: tag } })
  }
}
</script>
