<template>
  <v-app >
    <v-main>
      <header> <app-bar /></header>
        <!-- <v-container fluid class="ma-0 pa-0"> -->
          <nuxt/>
           <!-- <v-snackbar
                v-model="snackbarStats"
                :timeout="timeout"
            >
              Task {{taskId}} was {{snackbarText}} 
                <template v-slot:action="{ attrs }">
                <v-btn
                    :color="snackColor"
                    text
                    v-bind="attrs"
                    @click="snackbarStats = false"
                >
                    Close
                </v-btn>
                </template>
            </v-snackbar >
        </v-container> -->
    </v-main>
  </v-app>
</template>
<script>

export default {
  name: 'DefaultLayout',
  data:()=>({   
        snackbarStats: '',
        snackbarText: '',
        timeout: 2200,
        snackColor :'' ,
        taskId:'',
    }),

  created() {
    this.$nuxt.$on('myevent', ($event) => this.test($event))
  },
  methods: {
    test(e) {
      this.snackbarStats = e.snackbarStats
      this.snackbarText = e.snackbarText
      this.snackColor =  e.snackColor
      this.taskId = e.id
    },
  },

}
</script>
<style scoped>

</style>
