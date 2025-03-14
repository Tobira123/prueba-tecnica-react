import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../store/themeSlice'

import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { IconButton, Tooltip } from '@mui/material'

export default function ThemeToggle() {
  const dispatch = useDispatch()
  const darkMode = useSelector(state => state.theme.darkMode)

  const handleToggle = () => {
    dispatch(toggleTheme())
  }

  return (
    <Tooltip title="Cambiar tema">
      <IconButton
        sx={{ ml: 1 }}
        onClick={handleToggle}
        color="inherit"
      >
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  )
}
