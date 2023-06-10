<template >
    <div>
        <v-snackbar
                v-model="snackbarStats"
                :timeout="timeout"
            >

                <template v-slot:action="{ attrs }">
                <v-btn
                    :color="snackColor"
                    text
                    v-bind="attrs"
                    @click="snackbarStats = false"
                >
                    Close
                </v-btn>
                </template>
            </v-snackbar >
    </div>
</template>
<script>
export default {
    data:()=>({
        
        snackbarStats: '',
        snackbarText:'',
        timeout: 2200,
        snackColor :'' ,

    }),
    props:{
        mySnack:{
            typeof : Object,
            default :null
    }
    },
}
</script>
<style >
    
</style>