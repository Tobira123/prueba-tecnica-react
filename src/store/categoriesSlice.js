import { createSlice } from '@reduxjs/toolkit'

const initialCategories = [
  { id: 'all', name: 'Todas', default: true },
  { id: 'work', name: 'Trabajo', default: false },
  { id: 'personal', name: 'Personal', default: false },
  { id: 'other', name: 'Otros', default: false }
]

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    list: initialCategories
  },
  reducers: {
    addCategory: (state, action) => {
      state.list.push(action.payload)
    },
    removeCategory: (state, action) => {
      state.list = state.list.filter(cat => cat.id !== action.payload)
    },
  }
})

export const { addCategory, removeCategory } = categoriesSlice.actions
export default categoriesSlice.reducer
