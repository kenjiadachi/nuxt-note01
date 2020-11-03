<template lang="pug">
v-list.pt-0(dense nav flat)
  ListItem(v-for="item in items" :key="item.title" @click='gotoItemPage' :item='item')
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ListItem from '~/components/atoms/ListItem.vue'

@Component({
  components: {
    ListItem,
  },
})
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
    {
      title: 'YOUTRUST',
      icon: 'mdi-clipboard-account',
      url: 'https://youtrust.jp/users/3922f8949a592d60cbea0f02d0fa090e',
      color: '#329DA4',
    },
  ]

  gotoItemPage(url: string) {
    window.open(url, '_blank')
  }
}
</script>
