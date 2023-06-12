<template>
    <div class="h-full flex items-center justify-center">
        <div class="w-[500px] h-[500px] mt-28 rounded-lg">
            <nuxt-link to="/" class="flex items-center">
                <v-img contain width="80" height="80" src="/keep_2020q4_48dp.png"></v-img>
            </nuxt-link>
            <v-form>
                <v-container>
                    <v-text-field v-model="firstname" label="Name" required></v-text-field>
                    <v-text-field v-model="firstname" label="Email" required></v-text-field>
                    <v-text-field v-model="lastname" label="Password" required></v-text-field>
                    <v-text-field v-model="lastname" label="RE-Password" required></v-text-field>
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

}
</script>