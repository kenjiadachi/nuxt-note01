<template lang="pug">
v-navigation-drawer(app v-model="drawer" :mobileBreakpoint='600')
  HeaderImage
  NavBarList
  template(v-slot:append)
    ProfileCard

</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ProfileCard from '~/components/molecules/ProfileCard.vue'
import HeaderImage from '~/components/molecules/HeaderImage.vue'
import NavBarList from '~/components/molecules/NavBarList.vue'

@Component({
  components: {
    ProfileCard,
    HeaderImage,
    NavBarList,
  },
})
export default class LeftBar extends Vue {
  drawer = null
}
</script>
