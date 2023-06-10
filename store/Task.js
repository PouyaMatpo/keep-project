export const state = () => ({
  tasks: [],
  colors : ['red','green','blue','black','cyan','yellow'],
  })
  
  export const mutations = {

    init(state,value) { 
          state.tasks = JSON.parse(value) || [];
     },
     resetAllTasks(state) { 
     state.tasks = [];
    },
    save(state) {
      localStorage.setItem('_tasks_', JSON.stringify(state.tasks))
    },
    add(state, { title, description,bgcolor,textColor,Background }) {
      let id, flag = true
      bgcolor = 'white'
      while (flag) {
        id = Math.floor(Math.random() * Math.pow(10,6))
        flag = !!state.tasks.find(task => task.id === id)
      }
      state.tasks.push({
        id, title, description, done: false,bgcolor,textColor :'light',Background :''
      })
    },
    remove(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id)
    },

    changeContent(state, { title,description,id }) { 
      if (!title || !description || id) { 
        state.tasks = state.tasks.map((task) => { 
          if (task.id == id) { 
            task.title = title,
              task.description = description
            return task
          }
        })
      }
    },
    done(state, {id, done = true}) {
      state.tasks = state.tasks.map((task) => {
        if (task.id === id) task.done = done
        return task
      })
    },

    changeColor(state, { id, bgcolor,textColor }) { 

      state.tasks = state.tasks.map(task => {
        if (task.id === id) { 
          task.bgcolor = bgcolor
          task.textColor = textColor
        }
          return task
      })
    },

    
    changeBackground(state, {id,NewBackground}) { 

      state.tasks = state.tasks.map(task => {
        if (task.id === id) { 
          task.Background = NewBackground
        }
          return task
      })
    },

    // searchTask(state, {searchQuery}) { 

    //   state.tasks = state.tasks.filter(task => {
       
    //   })
    // }
  }
  
export const actions = {
      
    init(context,value) { 
        context.commit('init', value)
    },
    resetAllTasks(context){
      context.commit('resetAllTasks')
      context.commit('save')
    },
    add(context, { title, description,bgcolor,textColor,Background}) {
      context.commit('add', { title, description ,bgcolor,textColor,Background})
      context.commit('save')
    },
    remove(context, id) {
      context.commit('remove', parseInt(id))
      context.commit('save')
    },
    done(context, {id, done = true}) {
      context.commit('done', {id: parseInt(id), done})
      context.commit('save')
  },
  changeContent(context, { title,description,id}) { 
    context.commit('changeContent', { id: parseInt(id), title, description })
    context.commit('save')
  },
  changeColor(context, { id, bgcolor,textColor }) { 
    context.commit('changeColor', {id: parseInt(id),bgcolor,textColor})
    context.commit('save')
  },
  changeBackground(context, { id, NewBackground }) { 
    context.commit('changeBackground', {id: parseInt(id),NewBackground})
    context.commit('save')
  }
  }
  
  export const getters = {
    tasks: (state) => {
      return state.tasks
    },
    doneTasks: (state) => {
      return state.tasks.filter(task => task.done == true)
    },
    pendingTasks: (state) => {
      return state.tasks.filter(task => task.done == false)
    },
    task: (state) => (id) => {
      return state.tasks.find(task => task.id === id)
    },
    colors: (state) => { 
      return state.colors
    }
  }