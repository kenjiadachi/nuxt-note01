<template lang="pug">
v-card.mx-0(flat)
  v-card-title
    v-avatar.mr-2.my-1(size="40")
      v-img(src="/img/profile.png")
    | だちけん
  v-card-subtitle.pb-2
    | webエンジニア
  v-card-text
    | 株式会社ムジカルを設立し、webアプリケーションの開発、webマーケティングを担当しています。
  v-card-actions
    v-btn(text)
      | about
    v-btn(text)
      | twitter
    v-btn(text)
      | github
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class CardRow extends Vue {}
</script>
