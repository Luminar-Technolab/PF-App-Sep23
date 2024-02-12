import React,{useContext} from 'react'
import { Navbar,Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthenticationContext  } from "../Context API/TokenAuth";

function Header({insideDashboard}) {
  const navigate = useNavigate()
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthenticationContext)

  const handleLogout = ()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("username")
    setIsAuthorised(false)
    navigate('/')
  }

  return (
    <Navbar style={{backgroundColor:'#90ee90'}}>
        <Container>
          <Navbar.Brand className='text-light fw-bolder fs-4'>
         <Link to={'/'} className='text-light' style={{textDecoration:'none'}}> <i style={{height:'26px'}} className="fa-solid fa-paperclip"></i> <span >Project Fair</span></Link>
          </Navbar.Brand>
          {
            insideDashboard &&
            <div className='ms-auto'>
                <button onClick={handleLogout} className='btn text-dark'><i className="fa-solid fa-gear"></i> Logout</button>
            </div>
          }
        </Container>
      </Navbar>
  )
}

export default Header