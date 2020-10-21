<template lang="pug">
v-row.py-4
  v-col
  
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Card from '~/components/molecules/Card.vue'

@Component({
  components: {
    Card,
  },
})
export default class Header extends Vue {}
</script>
