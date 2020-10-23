<template lang="pug">
v-timeline(dense)
  v-timeline-item(v-for="item in items" :key="item.title")
    span(slot="opposite")
      | Tus eu perfecto
    v-card.elevation-2
      v-card-title.headline
        | {{ item.title }}
      v-card-text
        | {{ item.description }}
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Card from '~/components/molecules/Card.vue'

@Component({
  components: {
    Card,
  },
})
export default class TimeLine extends Vue {
  items = [
    {
      title: 'HOME',
      description: 'mdi-home',
    },
    {
      title: 'HOMEeeee',
      description: 'mdi-home',
    },
  ]
}
</script>
