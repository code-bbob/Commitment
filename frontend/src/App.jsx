
import { Route, Routes } from 'react-router-dom'
import './App.css'

import { Index } from './pages/index'
import Login from './pages/login'
import SingleGroup from './pages/singlegroup'


function App() {

  return (
   <Routes>
    <Route path="/" element={<Index/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/group/:id" element={<SingleGroup/>}/>
      </Routes>
  )
}

export default App
