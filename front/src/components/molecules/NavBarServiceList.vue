<template lang="pug">
v-list.pt-0(dense nav flat)
  v-list-item(v-for="item in items" :key="item.title" :href="item.url" target="_blank")
    v-list-item-icon
      v-icon( :color="item.color" ) {{ item.icon }}
    v-list-item-content
      v-list-item-title {{ item.title }}
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class NavBarServiceList extends Vue {
  items = [
    {
      title: 'Twitter',
      icon: 'mdi-twitter',
      url: 'https://twitter.com/dach1_ken',
      color: '#1DA1F2',
    },
    {
      title: 'GitHub',
      icon: 'mdi-github',
      url: 'https://github.com/kenjiadachi/',
      color: '#24292e',
    },
    {
      title: 'Menta',
      icon: 'mdi-rocket',
      url: 'https://menta.work/user/4103',
      color: '#22B1C0',
    },
  ]
}
</script>
