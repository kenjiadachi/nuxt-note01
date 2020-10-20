<template lang="pug">
v-navigation-drawer(app v-model="drawer")
  ProfileCard

</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ProfileCard from '~/components/molecules/ProfileCard.vue'

@Component({
  components: {
    ProfileCard,
  },
})
export default class LeftBar extends Vue {
  drawer = null
}
</script>
