<template lang="pug">
v-navigation-drawer(app v-model="drawer" :mobileBreakpoint='600')
  HeaderImage
  NavBarList
  NavBarServiceList
  v-chip-group(column)
    v-chip.ma-1(outlined v-for='tag in tags' :key='tag' :to="{path: '/', query: {tag: tag}}")
      | # {{ tag }}

  template(v-slot:append)
    ProfileCard

</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ProfileCard from '~/components/molecules/ProfileCard.vue'
import HeaderImage from '~/components/molecules/HeaderImage.vue'
import NavBarList from '~/components/molecules/NavBarList.vue'
import NavBarServiceList from '~/components/molecules/NavBarServiceList.vue'

@Component({
  components: {
    ProfileCard,
    HeaderImage,
    NavBarList,
    NavBarServiceList,
  },
})
export default class LeftBar extends Vue {
  drawer = null

  get tags() {
    return this.$store.state.tags
  }
}
</script>
