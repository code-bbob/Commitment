import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Heatmap from './Heatmap'

function App() {


  const [name, setName] = useState([])
  useEffect(()=>{
    async function getAllCommit(){
      try {
        const name = await axios.get("http://127.0.0.1:8000/api/commit/test")
        setName(name.data)
      }
      catch (e){
        console.log(e)
      }
    } 
    getAllCommit()
  },[])
  console.log(name)

  return (
    <>
    <h1>Hiiii {name?.name}</h1>
    <Heatmap/>
    </>
  )
}

export default App
