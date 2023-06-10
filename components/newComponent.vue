<template >
    <div>
        <v-alert close-icon color="success" dark elevation="10" class="mx-auto text-center" max-width="300" >
            <slot name="nnn" v-bind:user="user"></slot>
        </v-alert>
    </div>
</template>
<script>
export default {
    data:()=>({
        user:{
            LastName:'jahi',
            FirstName:'Matin'
        }
    })
}
</script>
<style >
    
</style>