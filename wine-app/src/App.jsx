
import './App.css'

import { Route, Routes } from 'react-router-dom'

//Messages
import { ToastContainer, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//Components
import { Navbar } from './components/Navbar/Navbar'
import {Home} from './components/Home/Home'
import { Average } from './components/Average/Average'

function App() {

  return (
    <>
    <Navbar/>


      <Routes>
        <Route path="*" element={<Home />} />

        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Home />} />
        <Route path='/average' element={<Average />} />




      </Routes>


      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />


    </>
  )
}

export default App
