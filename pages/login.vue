<template>
    <div class="w-full flex items-center justify-center">
        <div class="w-[500px] h-[500px] grey mt-28 rounded-lg">
            <template>
                <template>
                    <v-form>
                        <v-container>
                            <v-text-field v-model="firstname" label="Email" required></v-text-field>
                            <v-text-field v-model="lastname" label="Password" required></v-text-field>
                        </v-container>
                    </v-form>
                    <div class="px-3">
                        <v-btn large class="w-full">Submit</v-btn>
                    </div>
                </template>
            </template>
        </div>
    </div>
</template>
<script>
export default {

}
</script>