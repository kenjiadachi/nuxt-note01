<template lang="pug">
v-list.pb-0(dense nav flat)
  v-list-item(v-for="item in items" :key="item.title" :to="item.url")
    v-list-item-icon
      v-icon {{ item.icon }}
    v-list-item-content
      v-list-item-title {{ item.title }}
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class NavBarList extends Vue {
  items = [
    {
      title: 'HOME',
      icon: 'mdi-home',
      url: '/',
    },
    {
      title: 'ABOUT',
      icon: 'mdi-account',
      url: '/about',
    },
  ]
}
</script>
