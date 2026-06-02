import { createRoot } from 'react-dom/client'
import '@fontsource/inter/400.css'
import '@fontsource/dm-sans/700.css'
import '@fontsource/jetbrains-mono/400.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(<App />)
