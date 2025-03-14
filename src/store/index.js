import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './tasksSlice'
import themeReducer from './themeSlice'
import categoriesReducer from './categoriesSlice'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    theme: themeReducer,
    categories: categoriesReducer
  }
})
