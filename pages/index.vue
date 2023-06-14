<template>
    <div class="h-full overflow-x-hidden">
        <header> <app-bar /></header>
        <v-container fluid>
            <add-bar />
            <!-- <add-task-item /> -->
            <v-card class="md:px-36 border-none" max-width="100%" flat>
                <v-list>
                    <v-subheader class="pa-5">in progress Tasks </v-subheader>
                    <v-list-item-group class="flex basis-full flex-row flex-wrap items-start opacity-100">
                        <task-item v-for="(task, i) in pendingTasks" :task="task" :key="i" />
                    </v-list-item-group>
                    <v-subheader class="mt-10 pa-5">Done Tasks</v-subheader>
                    <v-list-item-group class="flex basis-full flex-row flex-wrap items-start opacity-100">
                        <task-item v-for="(task, i) in doneTasks" :key="i" :task="task" />
                    </v-list-item-group>
                </v-list>
            </v-card>
            <v-card class="md:px-36 border-none" max-width="100%" flat v-if="resultQuery">
                <v-list>
                    <v-subheader class="pa-5">Tasks </v-subheader>
                    <v-list-item-group class="flex basis-full flex-row flex-wrap items-start opacity-100">
                        <task-item v-for="(task, i) in resultQuery" :task="task" :key="i" id="text">
                            <template v-slot:title>
                                <text-highlight v-if="resultQuery[0]" :queries="searchedtext">{{ resultQuery[0].title
                                }}</text-highlight>
                            </template>
                        </task-item>
                    </v-list-item-group>
                </v-list>
            </v-card>
            <v-card v-else max-width="100%" flat class="!flex md:px-36 border-none">
                <v-list>
                    <v-list-item-group class="flex basis-full flex-row flex-wrap items-start opacity-100">
                        <task-item v-for="(task, i) in pendingTasks" :task="task" :key="i" id="text" />
                    </v-list-item-group>
                </v-list>
            </v-card>
        </v-container>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default
    {
        data: () => ({
            searchedtext: '',
            selectedTask: null,
            tasks:[],
        }),
        computed: {
            ...mapGetters({
                Tasks: 'Task/tasks',
                doneTasks: 'Task/doneTasks',
                pendingTasks: 'Task/pendingTasks',


            }),
            resultQuery() {
                if (this.searchedtext) {
                    return this.Tasks.filter((item) => {
                        return this.searchedtext.toLowerCase().split(' ').every(v => item.title.toLowerCase().includes(v))
                    })
                }
            },

        },

        mounted() {
            this.tasksList()
            this.$store.dispatch('Task/init', window.localStorage.getItem("_tasks_"))
            this.$nuxt.$on('textOfSearchbar', (searchQuery) => {
                this.searchedtext = searchQuery;
            })
        },
        methods:{
            tasksList() {
                this.$axios.get('http://127.0.0.1:8000/api/tasks')
                .then(response => {
                    this.tasks = response.data;
                }).catch(err => {
                    console.log(err)
                })
            },
            storeTask(){
                this.$axios.post('http://127.0.0.1:8000/api/tasks', {title: 'this.title', description: 'this.description', bg_color:'this.bg_color', text_color:'this.text_color', done:true})
                .then(response => {
                    response.data;
                }).catch(err => {
                    console.log(err)
                })
            },
            updateTask(){
                let id = 2 // task id
                this.$axios.put('http://127.0.0.1:8000/api/tasks/' + id , {title: 'this.title', description: 'this.description', bg_color:'this.bg_color', text_color:'this.text_color', done:false})
                .then(response => {
                    response.data;
                }).catch(err => {
                    console.log(err)
                })
            },
            deleteTask(){
                let id = 3 // task id
                this.$axios.delete('http://127.0.0.1:8000/api/tasks/' + id )
                .then(response => {
                    response.data;
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>
<style lang="scss">
.back-color {
    background-color: #fde86a;
}
</style>
