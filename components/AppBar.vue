<template >
    <v-row align="center" class="overflow-hidden">
        <v-col cols="12">
            <v-app-bar app clipped-left elevation="1" flat>
                <v-text-field v-model="searchQuery" v-if="checkStats" light solo prepend-inner-icon="mdi-arrow-left-thin"
                 placeholder="Search" flat hide-details clearable autofocus
                    class="rounded-lg d-flex d-sm-none " @click:prepend-inner="checkStats = false"></v-text-field>
                <v-app-bar-nav-icon class="ml-0.5 " v-if="visible" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                <v-toolbar-title v-if="visible">
                    <nuxt-link to="/" class="flex items-center ">
                        <v-img width="35" height="35" src="/keep_2020q4_48dp.png"></v-img>
                        <p v-if="$vuetify.breakpoint.mdAndUp" class="mb-0 pl-0.5 text-h6 font-weight-regular black--text">Keep</p>
                    </nuxt-link>
                </v-toolbar-title>
                <v-text-field v-model="searchQuery" light solo placeholder="Search" flat
                    hide-details clearable autofocus class="rounded-lg d-none d-sm-flex  ml-10"> <v-icon
                        slot="prepend-inner" class="cursor-pointer"> mdi-magnify </v-icon> </v-text-field>
                <v-spacer></v-spacer>
                <v-btn icon class="d-flex d-sm-none" @click="checkStats = !checkStats" v-if="!checkStats">
                    <v-icon ref="icon">mdi-magnify</v-icon>
                </v-btn>
                <v-dialog v-model="dialog" persistent max-width="290">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn title="Restart items" v-bind="attrs" icon v-on="on">
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
                            <v-btn text @click="dialog = false">
                                Disagree
                            </v-btn>
                            <v-btn text @click="dialog = false; ResetAll()">
                                Agree
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-btn icon title="Setting">
                    <v-icon ref="icon">mdi-cog</v-icon>
                </v-btn>
                <v-btn icon title="Change Stats" @click="toggleIcon">
                    <v-icon ref="icon">{{ icon }}</v-icon>
                </v-btn>
                <div class="text-center">
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn icon title="Change Stats" v-bind="attrs" v-on="on">
                                <v-avatar size="32">
                                    <v-icon ref="icon">mdi-login-variant</v-icon>
                                </v-avatar>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item :to="item.slug" class="cursor-pointer" v-for="(item, index) in items" :key="index">
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </v-app-bar>
        </v-col>
        <v-navigation-drawer mini-variant-width="100" v-model="drawer" expand-on-hover app mini-variant clipped>
            <v-list nav dense>
                <v-list-item-group v-model="group">
                    <v-list-item>
                        <v-list-item-title class="py-4">
                            <nuxt-link class="black--text" to="/">
                                <div class="flex flex-row items-center pl-4">
                                    <v-btn icon>
                                        <v-icon size="30">
                                            mdi-lightbulb-outline
                                        </v-icon>
                                    </v-btn>
                                    <div class="text-xl ml-6">
                                        Notes
                                    </div>
                                </div>
                            </nuxt-link>
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title class="py-4">
                            <nuxt-link class="black--text" to="/reminder">
                                <div class="flex flex-row items-center pl-4">
                                    <v-btn icon>
                                        <v-icon size="30">
                                            mdi-bell-ring-outline
                                        </v-icon>
                                    </v-btn>
                                    <div class="text-xl ml-6">
                                        Reminders
                                    </div>
                                </div>
                            </nuxt-link>
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title class="py-4">
                            <div class="flex flex-row items-center pl-4">
                                <v-btn icon>
                                    <v-icon size="30">
                                        mdi-pencil-outline
                                    </v-icon>
                                </v-btn>
                                <div class="text-xl ml-6">
                                    Edit labels
                                </div>
                            </div>
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title class="py-4">
                            <nuxt-link class="black--text" to="/archive">
                                <div class="flex flex-row items-center pl-4">
                                    <v-btn icon to="/archive">
                                        <v-icon size="30">
                                            mdi-archive-arrow-down-outline
                                        </v-icon>
                                    </v-btn>
                                    <div class="text-xl ml-6">
                                        Archive
                                    </div>
                                </div>
                            </nuxt-link>
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title class="py-4">
                            <nuxt-link class="black--text" to="/trash">
                                <div class="flex flex-row items-center pl-4">
                                    <v-btn icon>
                                        <v-icon size="30">
                                            mdi-trash-can-outline
                                        </v-icon>
                                    </v-btn>
                                    <div class="text-lg ml-6">
                                        Trash
                                    </div>
                                </div>
                            </nuxt-link>
                        </v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </v-row>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data: () => ({
        items: [
            {
                title: 'Log In',
                slug: '/login'
            },
            {
                title: 'Register',
                slug: '/register'
            }, 
            {
                title: 'Log Out',
                slug: '/login'
            }
        ],
        icon: "mdi-view-grid",
        drawer: false,
        group: null,
        checkStats: false,
        dialog: false,
        searchQuery: null,
    }),
    methods: {
        ResetAll() {
            this.$store.dispatch('Task/resetAllTasks')
        },
        toggleIcon() {
            this.icon = this.icon === "mdi-view-grid" ? "mdi-view-list" : "mdi-view-grid";
        },
        logout(){
            this.$store.dispatch('logout');
            this.$router.push('/login');
        }
    },
    watch: {
        group() {
            this.drawer = false
        },
        searchQuery() {
            this.$nuxt.$emit('textOfSearchbar', this.searchQuery)
        }
    },
    computed: {
        ...mapGetters({
            Tasks: 'Task/tasks',
        }),
        visible() {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': if (this.checkStats == true) {
                    return false
                }
                case 'sm': return true
                case 'md': return true
                case 'lg': return true
                case 'xl': return true
            }
        },
    }
}
</script>
