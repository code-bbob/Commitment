import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Heatmap from './components/Heatmap'
import YearCalendar from './components/calander'
import { Index } from './pages/index'

function App() {

  return (
   <Routes>
    <Route path="/" element={<Index/>}/>
      </Routes>
  )
}

export default App
