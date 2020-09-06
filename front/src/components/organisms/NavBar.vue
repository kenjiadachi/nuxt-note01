<template lang="pug">
v-app-bar(app clipped-right clipped-left dense)
  v-toolbar-title
    v-img(src="/img/cpx.png" width='8rem')
  v-tabs
    NavButton(v-for= 'button in buttons' :key='button.title' :title='button.title' :icon='button.icon' :to='button.url' )

</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import NavButton from '~/components/molecules/NavButton.vue'

@Component({
  components: {
    NavButton,
  },
})
export default class NavBar extends Vue {
  buttons = [
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
