<template>
    <div class="bg-red-300 h-full">
        <header> <app-bar /></header>
        <v-container fluid>
            <add-bar />
            <!-- <add-task-item /> -->
            <v-card class="px-36 border-none !bg-red-300" max-width="100%" flat>
                <v-list class="!bg-red-300">
                    <v-subheader class="pa-5 !bg-red-300">in progress Tasks </v-subheader>
                    <v-list-item-group class="flex basis-full flex-row flex-wrap items-start opacity-100">
                        <task-item v-for="(task, i) in pendingTasks" :task="task" :key="i" />
                    </v-list-item-group>
                    <v-subheader class="mt-10 pa-5">Done Tasks</v-subheader>
                    <v-list-item-group class="flex basis-full flex-row flex-wrap items-start opacity-100">
                        <task-item v-for="(task, i) in doneTasks" :key="i" :task="task" />
                    </v-list-item-group>
                </v-list>
            </v-card>
            <v-card class="px-36 !bg-red-300 border-none" max-width="100%" flat v-if="resultQuery">
                <v-list class="!bg-red-300">
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
            <v-card v-else max-width="100%" flat class="!flex px-36 !bg-red-300 border-none">
                <v-list class="!bg-red-300">
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
<style lang="scss">
.back-color {
    background-color: #fde86a;
}
</style>