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
export default class About extends Vue {}
</script>
