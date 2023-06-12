<template>
    <div class="h-full w-full flex items-center justify-center">
        <div class="w-[500px] h-[500px] mt-28 rounded-lg">
            <nuxt-link to="/" class="flex items-center ">
                <v-img contain width="80" height="80" src="/keep_2020q4_48dp.png"></v-img>
            </nuxt-link>
            <v-form>
                <v-container>
                    <v-text-field class="mt-5" v-model="firstname" label="Email" required></v-text-field>
                    <v-text-field class="mt-3" v-model="lastname" label="Password" required></v-text-field>
                    <nuxt-link to="/register" class="flex items-center ">
                        <div class="w-full mt-8 mb-2">not registered yet? Register :)</div>
                    </nuxt-link>
                </v-container>
            </v-form>
            <div class="px-3">
                <v-btn large class="w-full">login</v-btn>
            </div>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="scss">
.back-col {
    background-color: #eceff1;
}
</style>