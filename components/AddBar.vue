<template >
  <v-card class="mx-auto rounded-lg my-20" max-width="500" v-click-outside="save">
    <v-form ref="form" lazy-validation>
      <v-text-field required v-model="form.title" :rules="rules.title" dense solo single-line label="Take a Note..."
        hide-details="" hide-spin-buttons placeholder="Title" @click="displayitem = true" autocomplete="off" full-width
        id="1" flat>
      </v-text-field>
      <v-expand-transition>
        <v-text-field required v-model="form.description" :rules="rules.description" solo single-line v-show="displayitem"
          hide-details="" placeholder="Description" class="border-none" id="2" autofocus flat></v-text-field>
      </v-expand-transition>
    </v-form>
  </v-card>
</template>
<script>
export default {

  data: () => ({
    displayitem: false,
    isTyping: false,

    form: {
      title: null,
      description: null
    },
    rules: {
      title: [
        v => !!v || 'Title is required',
        v => (!!v && v.length > 4) || 'Title Must be Grather than 4'
      ],
      description: [
        v => !!v || 'description is required',
        v => (!!v && v.length < 50) || 'Title Must be Less than 50'
      ]
    }
  }),
  methods: {
    onClickOutside() {
      this.displayitem = false
    },
    save: function () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('Task/add', this.form);
        this.$refs.form.reset();
      }
      this.onClickOutside();
    }
  },
}
</script>