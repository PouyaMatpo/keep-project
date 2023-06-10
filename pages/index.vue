    <template >
    <v-container fluid class="pa-0 ma-0">
        <add-bar />
        <!-- <v-card max-width="100%" flat >
         <v-list>
                <v-subheader class="pa-5">in progress Tasks </v-subheader>
                <v-list-item-group class="flex basis-full flex-row flex-wrap items-start opacity-100" >
                  <task-item v-for="(task,i) in pendingTasks" :task="task" :key="i"/>
                </v-list-item-group>
                <v-subheader class="mt-10 pa-5">Done Tasks</v-subheader>
                <v-list-item-group class="flex basis-full flex-row flex-wrap items-start opacity-100" >
                  <task-item  v-for="(task,i) in doneTasks" :key="i" :task="task"/>
                </v-list-item-group>
            </v-list>
    </v-card> -->
        <v-card max-width="100%" flat v-if="resultQuery">
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
        <v-card v-else max-width="100%" flat class="!flex px-28">
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
    </v-container>
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