import { Route, Routes } from 'react-router'
import './App.css'
import NexusFlowUltra from './pages/home'
function App() {

  return (
    <Routes>
      <Route path="/" element={<NexusFlowUltra/>}/>
    </Routes>
  )
}

export default App
