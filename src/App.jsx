import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Auth from './Pages/Auth'
import Projects from './Pages/Projects'
import Dashboard from './Pages/Dashboard'
import Footer from './Components/Footer'
import { useContext } from 'react'
import { tokenAuthenticationContext  } from "./Context API/TokenAuth";

function App() {
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthenticationContext)
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Auth/>} />
        <Route path='/register' element={<Auth insideRegister />} />
        <Route path='/dashboard' element={ isAuthorised? <Dashboard/>:<Home/>} />
        <Route path='/projects' element={isAuthorised? <Projects/>:<Home/>} />
        <Route path='/*' element={<Navigate to={'/'}/>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
