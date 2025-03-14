import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../store/themeSlice'
import IconButton from '@mui/material/IconButton'
import Brightness4Icon from '@mui/icons-material/Brightness4' 
import Brightness7Icon from '@mui/icons-material/Brightness7'  

export default function ThemeToggleButton() {
  const dispatch = useDispatch()
  const darkMode = useSelector((state) => state.theme.darkMode)

  const handleToggle = () => {
    dispatch(toggleTheme())
  }

  return (
    <IconButton onClick={handleToggle} color="inherit">
      {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  )
}
