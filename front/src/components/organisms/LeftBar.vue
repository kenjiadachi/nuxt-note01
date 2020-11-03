<template lang="pug">
v-navigation-drawer(app v-model="setDrawer" :mobileBreakpoint='600')
  NavBarHeaderImage
  NavBarList
  NavBarServiceList
  NavBarChips(:tags = "tags")

  template(v-slot:append)
    NavBarProfileCard
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import NavBarHeaderImage from '~/components/molecules/NavBar/HeaderImage.vue'
import NavBarList from '~/components/molecules/NavBar/List.vue'
import NavBarServiceList from '~/components/molecules/NavBar/ServiceList.vue'
import NavBarChips from '~/components/molecules/NavBar/Chips.vue'
import NavBarProfileCard from '~/components/molecules/NavBar/ProfileCard.vue'

@Component({
  components: {
    NavBarHeaderImage,
    NavBarList,
    NavBarServiceList,
    NavBarChips,
    NavBarProfileCard,
  },
})
export default class LeftBar extends Vue {
  @Prop({ type: Boolean, default: null })
  drawer: Boolean

  get setDrawer(): Boolean {
    return this.drawer
  }

  set setDrawer(val: Boolean) {
    this.$emit('update:drawer', val)
  }

  get tags() {
    return this.$store.state.tags
  }
}
</script>
