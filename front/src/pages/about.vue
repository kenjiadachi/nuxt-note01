<template lang="pug">
v-container.pt-0(fluid)
  TimeLine
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import TimeLine from '~/components/organisms/TimeLine.vue'

@Component({
  components: {
    TimeLine,
  },
})
export default class About extends Vue {}
</script>
