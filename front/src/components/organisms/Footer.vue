<template lang="pug">
v-footer(app absolute class="font-weight-medium")
  v-col(class='text-center' cols='12')
    | {{ new Date().getFullYear() }} — 
    strong CPX
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Footer extends Vue {}
</script>
