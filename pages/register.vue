<template>
    <div class="h-full flex items-center justify-center">
        <div class="w-[500px] h-[500px] mt-28 rounded-lg">
            <nuxt-link to="/" class="flex items-center">
                <v-img contain width="80" height="80" src="/keep_2020q4_48dp.png"></v-img>
            </nuxt-link>
            <v-form>
                <v-container>
                    <v-text-field v-model="name" label="Name" required></v-text-field>
                    <v-text-field v-model="email" label="Email" required></v-text-field>
                    <v-text-field v-model="password" type="password" label="Password" required></v-text-field>
                    <v-text-field v-model="password_confirmation" type="password" label="RE-Password" required></v-text-field>
                </v-container>
            </v-form>
            <div class="px-3">
                <v-btn large class="w-full">Register</v-btn>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            name:'',
            email:'',
            password:'',
            password_confirmation:''
        }
    },
    mounted() {
        if(this.$store.state.user != undefined){
            this.$router.push('/')
        }
    },

    methods:{
        register(){
            this.$axios.post('http://127.0.0.1:8000/api/auth/register', 
            {name:this.name, email: this.email, password: this.password, password_confirmation: this.password_confirmation})
            .then(response => {
                this.$store.dispatch('setToken',response.data)
                this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
                this.$router.push('/');
            })
            .catch(error => {
                console.log(error)
            });
        }
    }
}
</script>