import { createRoot } from 'react-dom/client'
import './shadcn.css'
import App from './App'
import { LanguageProvider } from './i18n'

const root = createRoot(document.getElementById('app')!)
root.render(
  <LanguageProvider>
    <App />
  </LanguageProvider>,
)
