<template >
         <v-row align="center" class="overflow-hidden">
            <v-col cols="12" >
                <v-app-bar elevation="1"  flat color="#FFFFFF" class="border-orange-600">
                <v-text-field v-model="searchQuery"  v-if="checkStats" light solo prepend-inner-icon="mdi-arrow-left-thin"  background-color="grey lighten-4" placeholder="Search" flat hide-details clearable autofocus  class="rounded-lg d-flex d-sm-none " @click:prepend-inner="checkStats = false"></v-text-field>
   

                    
                    <v-app-bar-nav-icon class="ml-0.5 " v-if="visible" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                            <v-toolbar-title v-if="visible"  >
                                <nuxt-link to="/" class="flex items-center ">
                                <v-img width="35" height="35" src="/keep_2020q4_48dp.png"></v-img>
                                <p class="mb-0 pl-0.5 text-h6 font-weight-regular black--text">Keep</p>
                                </nuxt-link>    
                            </v-toolbar-title>  
                    
                   

                        <v-text-field v-model="searchQuery" light solo background-color="grey lighten-4" placeholder="Search" flat hide-details clearable autofocus  class="rounded-lg d-none d-sm-flex  ml-10" > <v-icon slot="prepend-inner"  color="poobrown" class="cursor-pointer"> mdi-magnify </v-icon> </v-text-field>

                        <v-spacer></v-spacer>   


                        <v-btn icon class="d-flex d-sm-none" @click="checkStats = !checkStats " v-if="!checkStats">
                            <v-icon ref="icon">mdi-magnify</v-icon>
                        </v-btn>


                         <v-dialog
                        v-model="dialog"
                        persistent
                        max-width="290"
                        >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            v-bind="attrs"
                            icon
                            v-on="on"
                            >
                             <v-icon ref="icon">mdi-refresh</v-icon>

                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title class="text-h5">
                            Are you sure?
                            </v-card-title>
                            <v-card-text>you wanna delete all your data?</v-card-text>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="green darken-1"
                                text
                                @click="dialog = false"
                            >
                                Disagree
                            </v-btn>
                            <v-btn
                                color="green darken-1"
                                text
                                @click="dialog = false; ResetAll()"
                            >
                                Agree
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>   


                        <v-btn icon>
                            <v-icon ref="icon">mdi-view-list-outline</v-icon>
                        </v-btn>

                        <v-btn icon>
                            <v-icon ref="icon">mdi-cog</v-icon>
                        </v-btn>
    
                        <v-btn icon>
                            <v-icon ref="icon">mdi-apps</v-icon>
                        </v-btn>

                        <v-btn icon>
                            <v-avatar size="32" >
                            <img  src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                            </v-avatar>
                        </v-btn>
 
                </v-app-bar>
            </v-col>
                     <v-navigation-drawer
                            v-model="drawer"
                            absolute
                            bottom
                            temporary
                            >
                            <v-list
                                nav
                                dense
                            >
                                <v-list-item-group
                                v-model="group"
                                active-class="deep-purple--text text--accent-4"
                                >
                                <v-list-item>
                                    <v-list-item-title>Foo</v-list-item-title>
                                </v-list-item>

                                <v-list-item>
                                    <v-list-item-title>Bar</v-list-item-title>
                                </v-list-item>

                                <v-list-item>
                                    <v-list-item-title>Fizz</v-list-item-title>
                                </v-list-item>

                                <v-list-item>
                                    <v-list-item-title>Buzz</v-list-item-title>
                                </v-list-item>
                                </v-list-item-group>
                            </v-list>
                    </v-navigation-drawer>
         </v-row>
<!--                     
                <v-card max-width="100%" flat >
                <v-list>
                <v-subheader class="pa-5">Tasks </v-subheader>
                <v-list-item-group class="flex basis-full flex-row flex-wrap items-start opacity-100" >
                  <task-item v-for="(task,i) in resultQuery" :task="task" :key="i"/>
                </v-list-item-group>
                </v-list>
            </v-card>
            </v-row> -->
         
</template>
<script>
import {mapGetters} from 'vuex'
export default {
        data: () => ({
            drawer: false,
            group: null,
            checkStats:false,   
            dialog : false,
            searchQuery: null,
         }),
    methods:{
        ResetAll(){
             this.$store.dispatch('Task/resetAllTasks')   
        },
       
    },
    watch: {
      group () {
        this.drawer = false
      },
      searchQuery(){
      this.$nuxt.$emit('textOfSearchbar',this.searchQuery) 
      }
    },
     computed: {
        ...mapGetters({
        Tasks : 'Task/tasks',
        }),
      visible () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': if(this.checkStats == true ){
            return false
          }
          case 'sm': return true
          case 'md': return true
          case 'lg': return true
          case 'xl': return true
        }
      },
    // resultQuery(){
    //   if(this.searchQuery){
    //   return this.Tasks.filter((item)=>{
    //     return this.searchQuery.toLowerCase().split(' ').every(v => item.title.toLowerCase().includes(v))
    //   })
    //   }else{
    //     return this.Tasks;
    //   }
      
    // },
    }
}

     
</script>
<style soped>


</style>