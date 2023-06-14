<template>
    <div>
      <header> <app-bar /></header>
        <v-container fluid>
            <add-bar />
            <v-card class="px-36" max-width="100%" flat v-if="resultQuery">
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
            <v-card v-else max-width="100%" flat class="!flex px-36">
                <v-list>
                    <v-list-item-group class="flex basis-full flex-row flex-wrap items-start opacity-100">
                        <task-item v-for="(task, i) in pendingTasks" :task="task" :key="i" id="text" />
                    </v-list-item-group>
                </v-list>
                <!-- <v-list>
                    <v-list-item-group class="flex basis-full flex-row flex-wrap items-start opacity-100">
                        <task-item v-for="(task, i) in doneTasks" :task="task" :key="i" id="text" />
                    </v-list-item-group>
                </v-list> -->
            </v-card>
            <div class="flex flex-col mt-48">
                <div class="w-full text-center">
                    <v-icon size="140">
                        mdi-bell-ring-outline
                    </v-icon>
                </div>
                <div class="w-full text-center text-3xl pt-3">
                    Notes with upcoming reminders appear here
                </div>
            </div>
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
            this.$store.dispatch('Task/init', window.localStorage.getItem("_tasks_"))
            this.$nuxt.$on('textOfSearchbar', (searchQuery) => {
                this.searchedtext = searchQuery;
            })

        }
    }
</script>