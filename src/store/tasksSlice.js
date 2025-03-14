import { createSlice } from '@reduxjs/toolkit'
import { initialTasks } from '../utils/initialTasks'

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    list: initialTasks
  },
  reducers: {
    addTask: (state, action) => {
      const newId = state.list.length
        ? state.list[state.list.length - 1].id + 1
        : 1

      const newTask = {
        id: newId,
        ...action.payload
      }
      state.list.push(newTask)
    },

    removeTask: (state, action) => {
      state.list = state.list.filter(task => task.id !== action.payload)
    },

    updateTaskStatus: (state, action) => {
      const { id, status } = action.payload
      const taskIndex = state.list.findIndex(task => task.id === id)
      if (taskIndex !== -1) {
        state.list[taskIndex].status = status
      }
    }

  }
})

export const { addTask, removeTask, updateTaskStatus } = tasksSlice.actions
export default tasksSlice.reducer
