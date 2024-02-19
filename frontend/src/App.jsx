import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [commit, setCommit] = useState([])
  useEffect(()=>{
    async function getAllCommit(){
      try {
        const commit = await axios.get("http://127.0.0.1:8000/api/commit/test")
        setCommit(commit.data)
      }
      catch (e){
        console.log(e)
      }
    } 
    getAllCommit()
  },[])

  return (
    <>
    <h1>Hiiii {commit?.name}</h1>
    </>
  )
}

export default App
