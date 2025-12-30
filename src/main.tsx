import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// 设置全局字体
import '@/config/font.ts'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
