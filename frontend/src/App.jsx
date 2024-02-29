
import { Route, Routes } from 'react-router-dom'
import './App.css'

import { Index } from './pages/index'
import Login from './pages/login'
import SingleGroup from './pages/singlegroup'
import Signup from './pages/signup'
import CommitForm from './pages/commit'


function App() {

  return (
   <Routes>
    <Route path="/" element={<Index/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/group/:id" element={<SingleGroup/>}/>
    <Route path="/commit/post/" element={<CommitForm/>}/>
    
      </Routes>
  )
}

export default App
