<template lang="pug">

v-timeline-item
  span(slot="opposite")
    | {{ item.title }}
  v-card.elevation-2
    v-card-title
      | {{ item.title }}
    v-card-subtitle.text--secondary.pb-2
      | {{ item.season}}
    v-card-text
      | {{ item.description }}

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class TimeLineItem extends Vue {
  @Prop({ type: Object, required: true })
  item: object
}
</script>
