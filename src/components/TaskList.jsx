import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import TaskItem from './TaskItem'
import { AnimatePresence } from 'framer-motion'
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Tabs, 
  Tab,
  MenuItem,
  Button
} from '@mui/material'

export default function TaskList() {
  const tasks = useSelector(state => state.tasks.list)

  const [filterStatus, setFilterStatus] = useState('todas') 
  const [activeCategory, setActiveCategory] = useState('all') 

  const [showCompleted, setShowCompleted] = useState(false)

  const handleTabChange = (event, newValue) => {
    setActiveCategory(newValue)
    setShowCompleted(false)
  }

  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value)
    setShowCompleted(false)
  }

  const allFilteredTasks = tasks.filter(task => {
    if (activeCategory !== 'all' && task.categoryId !== activeCategory) {
      return false
    }
    if (filterStatus !== 'todas' && task.status !== filterStatus) {
      return false
    }
    return true
  })

  const activeFilteredTasks = allFilteredTasks.filter(t => t.status !== 'completada')
  const completedFilteredTasks = allFilteredTasks.filter(t => t.status === 'completada')

  const handleToggleCompleted = () => {
    setShowCompleted(!showCompleted)
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ width: '100%', mb: 2 }}>
  <Tabs
    value={activeCategory}
    onChange={handleTabChange}
    variant="scrollable"
    scrollButtons="auto"
    allowScrollButtonsMobile
    textColor="primary"
    indicatorColor="primary"
    sx={{
      justifyContent: 'flex-start',
      width: '100%'
    }}
  >
    <Tab label="Todas" value="all" />
    <Tab label="Trabajo" value="work" />
    <Tab label="Personal" value="personal" />
    <Tab label="Otros" value="others" />
  </Tabs>
</Box>


      <FormControl size="small" sx={{ mt: 2, minWidth: 150 }}>
        <InputLabel>Estado</InputLabel>
        <Select
          label="Estado"
          value={filterStatus}
          onChange={handleStatusChange}
        >
          <MenuItem value="todas">Todas</MenuItem>
          <MenuItem value="pendiente">Pendiente</MenuItem>
          <MenuItem value="en progreso">En progreso</MenuItem>
          <MenuItem value="completada">Completada</MenuItem>
        </Select>
      </FormControl>

      <AnimatePresence>
        {activeFilteredTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </AnimatePresence>

      {completedFilteredTasks.length > 0 && (
        <Box sx={{ textAlign: 'center', my: 2 }}>
          <Button onClick={handleToggleCompleted}>
            {showCompleted ? 'Ocultar tareas completadas' : 'Ver tareas completadas'}
          </Button>
        </Box>
      )}

      {showCompleted && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Tareas Completadas
          </Typography>
          <AnimatePresence>
            {completedFilteredTasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </AnimatePresence>
        </Box>
      )}
    </Box>
  )
}
