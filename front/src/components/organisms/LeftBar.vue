<template lang="pug">
v-navigation-drawer(app v-model="setDrawer" :mobileBreakpoint='600')
  HeaderImage
  NavBarList
  NavBarServiceList
  v-chip-group(column active-class="primary--text")
    v-chip.ma-1(outlined v-for='tag in tags' :key='tag' :to="{path: '/', query: {tag: tag}}")
      | # {{ tag }}

  template(v-slot:append)
    ProfileCard

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
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
