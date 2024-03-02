
import { Route, Routes } from 'react-router-dom'
import './App.css'

import { Index } from './pages/index'
import Login from './pages/login'
import SingleGroup from './pages/singlegroup'
import Signup from './pages/signup'
import CommitForm from './pages/commit'
import { useSelector } from "react-redux";
import ProtectedRoute from './redux/protectedRoute'
import SingleCommit from './pages/singleCommit'


function App() {
  const { isAuthenticated } = useSelector((state) => state.root);
  return (
   <Routes>
    <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
      <Route path="/" element={<Index/>}/>
      <Route path="/commit/:id" element={<SingleCommit/>}/>
      <Route path="/group/:id" element={<SingleGroup/>}/>
    </Route>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>

    <Route path="/commit/post/" element={<CommitForm/>}/>
    
      </Routes>
  )
}

export default App
