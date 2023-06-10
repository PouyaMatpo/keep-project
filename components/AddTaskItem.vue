<template >
    <v-dialog max-width="300" v-model="open">
        <template v-slot:activator="{on}">
            <v-btn icon v-on="on">
                <v-icon>mdi-plus</v-icon>
            </v-btn>  
        </template>
     <v-card>
        <v-card-title class="headlline teal--text">Add New Task</v-card-title>
        <v-card-text>
            <v-form ref="form" >
                <v-text-field v-model="form.title" label="title" required :rules="rules.title"></v-text-field>
                <v-text-field v-model="form.description" label="description" required :rules="rules.description"></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions >
            <v-spacer></v-spacer>
            <v-btn text color="success" @click="save">
              Add
            </v-btn>
        </v-card-actions>
        
    </v-card> 
    </v-dialog>   
  
</template>
<script>
export default {
      data:()=>({
        open : false,
        form:{
            title:null,
            description:null
        },
        rules:{
            title:[
                v => !!v || 'Title is required',
                v => (!!v && v.length > 3) || 'Title Must be grather than 3'    
            ],
            description:[
                v => !!v || 'Description required',
                v => (!!v && v.length < 50 ) || 'Description Must Less than 50'
            ]
        }
      }),
      methods:{
        save : function(){
            if(this.$refs.form.validate()){
                this.$store.dispatch('Task/add',this.form);
                this.$refs.form.reset();
                this.open = false;
            }
        }
      }
      
}
</script>
<style scoped >
    
</style>