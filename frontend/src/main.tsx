import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ToDoList from "./Pages/ToDoList"
import TailwindTest from "./Pages/TailwindTest"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TailwindTest />
  </StrictMode>,
)
