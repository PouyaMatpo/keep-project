<template>
  <v-hover v-slot="{ hover }" :value="false">
    <v-card :ripple="false" @dblclick="changeContent = !changeContent" :color="selectedColor"
      :dark="themeColorActive == 'dark' ? true : false" min-width="200" width="280" max-height="auto"
      :elevation="hover ? 7 : 2" :class="{ 'on-hover': hover }"
      class="ma-5 cursor-pointer rounded-lg relative opacity-100">
      <v-list-item inactive :light="themeColorActive == 'light' ? true : false">
        <v-list-item-content class="z-50 pa-0">
          <v-form lazy-validation ref="myForm" class="pa-0">
            <v-list-item-title>
              <slot name="title">
              </slot>
              <v-text-field background-color="transparent" :value="task.title" solo flat :autofocus="false"
                :rules="[rules.required, rules.TitleTextlenght]" :disabled="!changeContent"></v-text-field>
            </v-list-item-title>
            <v-list-item-subtitle>
              <v-text-field background-color="transparent" :value="task.description" solo flat
                :rules="[rules.required, rules.DescriptionTextlenght]" :disabled="!changeContent"
                @keydown.enter="openDialog('change')"> </v-text-field>
            </v-list-item-subtitle>
          </v-form>
          <v-dialog v-model="dialog" max-width="250" light>
            <v-card>
              <v-card-title class="text-h5">
                {{ DialogHeader }}
              </v-card-title>
              <v-card-text>
                {{ DialogText }}
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="mutationTask(`${dialogType}`)">
                  {{ DialogHeader }}
                </v-btn>
                <v-btn color="red darken-1" text @click="dialog = false">
                  cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list-item-content>
        <v-list-item-action class="w-full absolute -bottom-1 z-50 px-5">
          <div class="flex flex-row items-end justify-end w-full px-5">
            <v-btn :class="{ 'show-btns': hover, 'darkTheme': themeColorActive == 'dark' }" color="transparent" icon
              @click="changeStats" title="Change Stats">
              <v-icon
                :class="{ 'show-btns': hover, 'darkTheme': themeColorActive == 'dark', 'lightTheme': themeColorActive == 'light' }">
                {{ Icon }}
              </v-icon>
            </v-btn>
            <v-btn :class="{ 'show-btns': hover }" color="transparent" icon @click="openDialog('delete')" title="Delete">
              <v-icon
                :class="{ 'show-btns': hover, 'darkTheme': themeColorActive == 'dark', 'lightTheme': themeColorActive == 'light' }">
                mdi-trash-can
              </v-icon>
            </v-btn>
            <v-btn :class="{ 'show-btns': hover }" color="transparent" icon @click="ShowColorCanves = !ShowColorCanves">
              <v-icon
                :class="{ 'show-btns': hover, 'darkTheme': themeColorActive == 'dark', 'lightTheme': themeColorActive == 'light' }">
                mdi-brush-variant
              </v-icon>
            </v-btn>
          </div>
          <v-row class="absolute -top-[21rem] -left-6 z-50" v-if="ShowColorCanves">
            <v-col cols="12">
              <v-color-picker v-model="colorSe" hide-mode-switch flat width="300" hide-inputs
                v-click-outside="onClickOutside"></v-color-picker>
            </v-col>
          </v-row>
        </v-list-item-action>
      </v-list-item>
    </v-card>
  </v-hover>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    dialog: false,
    dialogType: '',
    DialogHeader: '',
    DialogText: '',
    taskId: '',
    image: null,
    url: null,
    changeContent: false,
    dataloaded: false,
    selectedColor: '',
    ShowColorCanves: false,
    themeColorActive: '',

    snack: {
      delete: {
        snackbarStats: true,
        snackbarText: 'deleted',
        snackColor: 'error',
        id: '',
      },
      updated: {
        snackbarStats: true,
        snackbarText: 'updated',
        snackColor: 'success',
        id: '',
      }
    },
    types: ['hex', 'hexa', 'rgba', 'hsla', 'hsva'],
    type: 'hex',
    hex: '#FF00FF',
    hexa: '#FF00FFFF',
    rgba: { r: 255, g: 0, b: 255, a: 1 },
    hsla: { h: 300, s: 1, l: 0.5, a: 1 },
    hsva: { h: 300, s: 1, v: 1, a: 1 },

    rules: {
      required: v => !!v || 'Required',
      TitleTextlenght: v => !!v && v.length > 3 || 'Title at least Should have 4 char',
      DescriptionTextlenght: v => !!v && v.length > 7 || 'Description at least Should have 8 char',
    },
  }),
  props: {
    task: {
      type: Object,
      default: null
    },
  },
  methods: {
    changeStats() {
      this.$store.dispatch('Task/done', {
        id: this.task.id,
        done: !this.task.done
      })
    },
    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);

      });
    },
    async changeImage(e) {
      let imgSrc = await this.toBase64(e);
      this.$store.dispatch('Task/changeBackground', {
        id: this.task.id,
        NewBackground: imgSrc
      })
    },
    onClickOutside() {
      this.ShowColorCanves = false
    },
    changeColor() {
      this.$store.dispatch('Task/changeColor', {
        id: this.task.id,
        bgcolor: this.selectedColor,
        textColor: this.themeColorActive,
      })
    },
    mutationTask(s) {
      let taskId = this.task.id;
      if (s == 'delete') {
        this.$store.dispatch('Task/remove', taskId)
        $nuxt.$emit('myevent', this.snack.delete)
      }

      else if (s == 'change' || s == 'Update' || 'edit') {
        this.$store.dispatch('Task/changeContent', {
          id: this.task.id,
          title: this.$refs.myForm.$children[0].internalValue,
          description: this.$refs.myForm.$children[1].internalValue
        })
        this.$nuxt.$emit('myevent', this.snack.updated)
      }
      this.dialog = false

    },
    openDialog(type) {
      if (!!type) {
        this.dialogType = type
        if (type == 'delete') {
          this.DialogHeader = 'Delete';
          this.DialogText = `Are you sure you want to delete task ${this.task.id}?`
        }
        else {
          this.DialogHeader = 'Edit';
          this.DialogText = `Are you sure you want to Edit task ${this.task.id}?`
        }
        this.dialog = true
      }
    },

  },
  computed: {
    ...mapGetters({
      colors: 'Task/colors'
    }),
    Icon() {
      return this.task.done ? 'mdi-check' : 'mdi-reload-alert';
    },
    colorSe: {
      get() {
        return this[this.type]
      },
      set(v) {
        this.selectedColor = v
      },


    },

  },
  created() {
    this.selectedColor = this.task.bgcolor
    this.themeColorActive = this.task.textColor
    this.changeContent = false
    this.snack.delete.id = this.task.id
    this.snack.updated.id = this.task.id
  },

  watch: {
    selectedColor: function (e) {
      if (!!this.dataloaded) {
        if (!!e) {
          var e = e.substring(1);
          var rgb = parseInt(e, 16);
          var r = (rgb >> 16) & 0xff;
          var g = (rgb >> 8) & 0xff;
          var b = (rgb >> 0) & 0xff;

          var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          if (luma < 40) {
            this.themeColorActive = 'dark'
          }
          else {
            this.themeColorActive = 'light'

          }
          return this.changeColor()
        }
      }
      else {
        this.dataloaded = true
      }

    },

  }
}
</script>
