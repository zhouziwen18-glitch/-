/**  
 * @file App.tsx  
 * @description Application root. Sets up the hash-based router and renders the home page.  
 */

import { HashRouter, Route, Routes } from 'react-router'
import HomePage from './pages/Home'

/**  
 * @description Top-level application component wiring the router to the home page.  
 */
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </HashRouter>
  )
}
