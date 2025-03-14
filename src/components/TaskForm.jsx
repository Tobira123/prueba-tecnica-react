import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTask } from '../store/tasksSlice'
import AddIcon from '@mui/icons-material/Add'

import {
  Box,
  TextField,
  MenuItem,
  Grid,
  Typography,
  Button
} from '@mui/material'

import { DatePicker } from '@mui/x-date-pickers/DatePicker'

export default function TaskForm({ onClose }) {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.categories.list)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('pendiente')
  const [categoryId, setCategoryId] = useState('all')
  const [dueDate, setDueDate] = useState(null)
  const [priority, setPriority] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return

    const dueDateString = dueDate ? dueDate.toISOString() : null

    dispatch(addTask({
      title,
      description,
      status,
      categoryId,
      dueDate: dueDateString,
      priority
    }))

    setTitle('')
    setDescription('')
    setStatus('pendiente')
    setCategoryId('all')
    setDueDate(null)
    setPriority(false)

    if (onClose) onClose()
  }

  const togglePriority = () => {
    setPriority(!priority)
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: 3, backgroundColor: 'background.paper' }}
    >
      <Typography variant="h6" gutterBottom>
        Agregar Nueva Tarea
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Título"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Descripción"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            select
            label="Estado"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
          >
            <MenuItem value="pendiente">Pendiente</MenuItem>
            <MenuItem value="en progreso">En progreso</MenuItem>
            <MenuItem value="completada">Completada</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            select
            label="Categoría"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            fullWidth
          >
           
            {categories.map(cat => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={4}>
          <DatePicker
            label="Fecha"
            value={dueDate}
            onChange={(newValue) => setDueDate(newValue)}
            renderInput={(params) => (
              <TextField {...params} fullWidth />
            )}
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
        <Button
          variant={priority ? 'contained' : 'outlined'}
          color="error"
          onClick={togglePriority}
        >
          {priority ? 'Alta Prioridad' : 'Marcar Prioridad'}
        </Button>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          startIcon={<AddIcon />}
          sx={{ ml: 'auto' }}
        >
          Agregar Tarea
        </Button>
      </Box>
    </Box>
  )
}
