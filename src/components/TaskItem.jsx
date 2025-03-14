import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeTask, updateTaskStatus } from '../store/tasksSlice'
import { motion } from 'framer-motion'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Button
} from '@mui/material'
import { format } from 'date-fns'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import DeleteIcon from '@mui/icons-material/Delete'

import '../styles/TaskStatusNeumorphicToggle.css'

function TaskStatusNeumorphicToggle({ checked, onChange }) {
  const containerClass = checked
    ? 'toggle-label-task inprogress' 
    : 'toggle-label-task pending'    

  return (
    <label className={containerClass}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <div className="slider-task"></div>
    </label>
  )
}

export default function TaskItem({ task }) {
  const dispatch = useDispatch()
  const darkMode = useSelector(state => state.theme.darkMode)

  const isCompleted = task.status === 'completada'
  const isInProgress = task.status === 'en progreso'

  const handleRemove = () => {
    dispatch(removeTask(task.id))
  }

  const handleToggle = (e) => {
    const newStatus = e.target.checked ? 'en progreso' : 'pendiente'
    dispatch(updateTaskStatus({ id: task.id, status: newStatus }))
  }

  const handleComplete = () => {
    dispatch(updateTaskStatus({ id: task.id, status: 'completada' }))
  }

  const handleUncomplete = () => {
    dispatch(updateTaskStatus({ id: task.id, status: 'pendiente' }))
  }

  const renderStatusChip = (status) => {
    switch (status) {
      case 'pendiente':
        return (
          <Chip
            label="Pendiente"
            icon={<HourglassEmptyIcon />}
            color="warning"
            size="small"
          />
        )
      case 'en progreso':
        return (
          <Chip
            label="En Progreso"
            icon={<CheckCircleIcon />}
            color="info"
            size="small"
          />
        )
      case 'completada':
        return (
          <Chip
            label="Completada"
            icon={<DoneAllIcon />}
            color="success"
            size="small"
          />
        )
      default:
        return null
    }
  }

  let dueDateText = 'Sin fecha'
  if (task.dueDate) {
    try {
      dueDateText = format(new Date(task.dueDate), 'dd MMM yyyy')
    } catch (error) {
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 10 }}
      style={{ marginBottom: '16px' }}
    >
      <Card
        sx={{
          backgroundColor: isCompleted
            ? (darkMode ? 'grey.800' : 'grey.200')
            : 'background.paper',
          color: isCompleted
            ? (darkMode ? 'grey.500' : 'text.secondary')
            : 'text.primary'
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ textDecoration: isCompleted ? 'line-through' : 'none' }}
          >
            {task.title}
          </Typography>

          <Typography
            variant="body2"
            sx={{ textDecoration: isCompleted ? 'line-through' : 'none' }}
          >
            {task.description || 'Sin descripción'}
          </Typography>

          <Typography variant="body2" sx={{ mt: 1 }}>
            Fecha: {dueDateText}
          </Typography>

          {task.priority && (
            <Chip
              label="Alta Prioridad"
              color="error"
              size="small"
              sx={{ mt: 1 }}
            />
          )}

          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            {renderStatusChip(task.status)}
          </Typography>
        </CardContent>

        <CardActions>
          {!isCompleted && (
            <>
              <TaskStatusNeumorphicToggle
                checked={isInProgress}
                onChange={handleToggle}
              />
              <Button variant="outlined" color="success" onClick={handleComplete}>
                Completada
              </Button>
            </>
          )}

          {isCompleted && (
            <Button
              variant="outlined"
              color="warning"
              onClick={handleUncomplete}
            >
              Descompletar
            </Button>
          )}

          <Button size="small" color="error" onClick={handleRemove}>
            <DeleteIcon />
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  )
}
