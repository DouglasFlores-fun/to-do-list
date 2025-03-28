import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ToDoList from "@pages/ToDoList.tsx"
import TailwindTest from "@pages/TailwindTest.tsx"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TailwindTest />
  </StrictMode>,
)
