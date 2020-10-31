<template lang="pug">
v-card(flat)
  v-row(align='center')
    v-col(cols="3")
      v-img(src="/img/profile.png")
    v-col(cols="9")
      v-card-title
        | だちけん
      v-card-text
        | 株式会社ムジカルで取締役をしています。
        | 学生時代に立ち上げたサービスのmusicalu、LiveDeliを通して音楽家の仕事のインフラを作っています。
        | ほかにも、副業的にフリーランスエンジニアとしても活動しています。
        | 個人のエンパワメントができる仕組み造りに興味があります。
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import TimeLineItem from '~/components/molecules/TimeLineItem.vue'

@Component({
  components: {
    TimeLineItem,
  },
})
export default class Profile extends Vue {
  items = [
    {
      title: 'LiveDeliの開発、運用',
      season: '2016年9月〜現在',
      description:
        'これまでやってきた主な業務です。特に工夫したのは、管理機能(案件・演奏家)の設計です。webマーケティングやコミュニティ形成、営業などもこれで軽く経験しました。',
    },
    {
      title: 'エンジニアと企業のマッチングサービスのAPI作成',
      season: '2019年5月〜2019年7月',
      description:
        'はじめて自社サービス以外を他のエンジニアと開発しました。他エンジニアはフロント担当だったので、APIは一人で設計しました。フロント担当のエンジニアとすり合わせながらモデル設計を行うプロセスがとても新鮮で楽しかったです。',
    },
    {
      title: 'Musicaluの設計、運用',
      season: '2019年7月〜現在',
      description: '自社サービスとして、はじめて外注しています。デザイナーとの要件すり合わせ、開発の進捗をスクラムで管理しています。',
    },
    {
      title: 'TwitterクライアントシステムのAPI作成',
      season: '2020年2月〜2020年5月',
      description: '友人のスタートアップのシステム開発を担当しました。Expressで非同期処理も含め設計を行いました。',
    },
    {
      title: 'SaaS企業のシステム開発',
      season: '2020年4月〜2020年7月',
      description:
        'はじめてSESとして仕事をしました。CircleCIやrobocopなど、コードを担保するノウハウが面白いと感じています。設計書の作成→実装→単体テスト→連動テストまでを一貫して行いました。',
    },
  ]
}
</script>
