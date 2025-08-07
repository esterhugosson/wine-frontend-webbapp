
import './App.css'

import { Route, Routes } from 'react-router-dom'

//Components
import { Navbar } from './components/Navbar/Navbar'
import {Home} from './components/Home/Home'
function App() {

  return (
    <>
    <Navbar/>


      <Routes>
        <Route path="*" element={<Home />} />




      </Routes>


    </>
  )
}

export default App
