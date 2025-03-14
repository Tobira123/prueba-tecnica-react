import React, { useState } from "react"
import { useSelector } from "react-redux"
import TaskList from "./components/TaskList"
import ThemeToggleButton from "./components/ThemeToggleButton" 
import { Container, Typography, Fab, Dialog, Box, IconButton } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import CloseIcon from "@mui/icons-material/Close"
import TaskForm from "./components/TaskForm"

function App() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const darkMode = useSelector((state) => state.theme.darkMode)

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, justifyContent: 'space-between', }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 800 }}
        >
          WorkBee
        </Typography>

        <ThemeToggleButton />
      </Box>

      <TaskList />

      <Fab
        onClick={handleOpen}
        sx={{
          position: "fixed",
          bottom: { xs: 30, md: 100 },
          right: { xs: 10, md: 290 },
          zIndex: 999,
          backgroundColor: darkMode ? "#fff" : "#000",
          color: darkMode ? "#000" : "#fff",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
        }}
      >
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>

        <TaskForm onClose={handleClose} />
      </Dialog>
    </Container>
  )
}

export default App
