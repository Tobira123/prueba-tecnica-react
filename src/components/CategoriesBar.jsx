// src/components/CategoriesBar.jsx
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addCategory, removeCategory } from '../store/categoriesSlice'
import { nanoid } from '@reduxjs/toolkit'
import {
  Box,
  Button,
  IconButton,
  Typography,
  TextField
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

export default function CategoriesBar({ currentCategory, onChangeCategory }) {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.categories.list)

  const [newCatName, setNewCatName] = React.useState('')

  const handleAddCategory = () => {
    if (!newCatName.trim()) return
    dispatch(addCategory({
      id: nanoid(),
      name: newCatName
    }))
    setNewCatName('')
  }

  const handleRemoveCategory = (catId) => {
    dispatch(removeCategory(catId))
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {categories.map(cat => (
        <Box key={cat.id} sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            variant={cat.id === currentCategory ? 'contained' : 'text'}
            onClick={() => onChangeCategory(cat.id)}
          >
            {cat.name}
          </Button>
          {!cat.default && (
            <IconButton
              size="small"
              onClick={() => handleRemoveCategory(cat.id)}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          )}
        </Box>
      ))}

      <TextField
        size="small"
        placeholder="Nueva sección"
        value={newCatName}
        onChange={(e) => setNewCatName(e.target.value)}
      />
      <Button variant="outlined" onClick={handleAddCategory}>
        +
      </Button>
    </Box>
  )
}
