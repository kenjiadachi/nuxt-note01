<template lang="pug">
v-layout(column justify-center align-center)
  v-flex(xs12 sm8 md6)
    

</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

@Component({
  components: {
    Logo,
    VuetifyLogo,
  },
})
export default class Index extends Vue {}
</script>
