<template>
    <div class="h-full w-full flex items-center justify-center">
        <div class="w-[500px] h-[500px] mt-28 rounded-lg">
            <nuxt-link to="/" class="flex items-center ">
                <v-img contain width="80" height="80" src="/keep_2020q4_48dp.png"></v-img>
            </nuxt-link>
            <v-form ref="form">
                <v-container>
                    <v-text-field class="mt-5" v-model="email" label="Email" ></v-text-field>
                    <v-text-field class="mt-3" type="password" v-model="password" label="Password" ></v-text-field>
                    <nuxt-link to="/register" class="flex items-center ">
                        <div class="w-full mt-8 mb-2">not registered yet? Register :)</div>
                    </nuxt-link>
                </v-container>
            </v-form>
            <div class="px-3">
                <v-btn large class="w-full" @click="login">login</v-btn>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            email:'pouya@gmail.com',
            password:'123456'
        }
    },
    mounted() {
        if(this.$store.state.user != undefined){
            this.$router.push('/')
        }
    },
    methods:{
        login() {
            this.$axios.post('http://127.0.0.1:8000/api/auth/login', {email: this.email, password: this.password})
            .then(response => {
                this.$store.dispatch('setToken',response.data)
                this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
                this.$router.push('/')
            })
            .catch(error => {
                console.log(error)
            });
        }
    }
}
</script>
<style lang="scss">
.back-col {
    background-color: #eceff1;
}
</style>