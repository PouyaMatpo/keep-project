<template>
  <v-app>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>
<script>

export default {
  name: 'DefaultLayout',
  data: () => ({
    snackbarStats: '',
    snackbarText: '',
    timeout: 2200,
    snackColor: '',
    taskId: '',
  }),

  created() {
    this.$nuxt.$on('myevent', ($event) => this.test($event))
  },
  methods: {
    test(e) {
      this.snackbarStats = e.snackbarStats
      this.snackbarText = e.snackbarText
      this.snackColor = e.snackColor
      this.taskId = e.id
    },
  },

}
</script>
<style lang="scss">
.back{
  background-color: #202124;
}
</style>