
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Commits from './pages/commits'
import { Index } from './pages/index'
import Login from './pages/login'
import SingleGroup from './pages/singlegroup'
import Signup from './pages/signup'
import CommitForm from './pages/commitPost'
import { useSelector } from "react-redux";
import ProtectedRoute from './redux/protectedRoute'
import SingleCommit from './pages/singleCommit'
import UserInfo from './pages/userinfo'
import Groups from './pages/groups'
import  UserAuthForm  from './pages/signup'
import UserRegister from './pages/userRegister'


function App() {
  const { isAuthenticated } = useSelector((state) => state.root);
  return (
   <Routes>
    <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
      <Route path="/" element={<Index/>}/>
      <Route path="/commits" element={<Commits/>}/>
      <Route path="/groups" element={<Groups/>}/>
      <Route path="/commit/:id" element={<SingleCommit/>}/>
      <Route path="/group/:id" element={<SingleGroup/>}/>
      <Route path='/user/' element={<UserInfo/>}>
        <Route path=':id'/>
        </Route>

    </Route>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<UserAuthForm/>}/>
    <Route path='/register' element={<UserRegister/>}/>

    <Route path="/commits/post/" element={<CommitForm/>}/>
    
      </Routes>
  )
}

export default App
