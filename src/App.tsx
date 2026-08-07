import { Route, Routes } from 'react-router-dom'
import Layout from './components/main-page/Layout'
import About from './pages/About'
import Projects from './pages/Projects'
import WorkExp from './pages/WorkExp'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/work-exp" element={<WorkExp />} />
      <Route path="/contact-me" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
