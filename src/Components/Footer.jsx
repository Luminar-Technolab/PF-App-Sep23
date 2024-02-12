import React from 'react'
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div
    className="d-flex flex-column align-items-center justify-content-center mt-5 "
    style={{ width: "100%", height: "300px",backgroundColor:'#90ee90' }}
  >
    <div className="footer d-flex justify-content-evenly w-100">
      <div style={{width:'300px'}} className="website">
        <h4 className='fw-bolder text-light'>
        Project Fair
        </h4>
        <h6>
          Designed and built with all the love in the world by the Luminar June23 Batch
          team with the help of our contributors.
        </h6>
        <h6>Code licensed MIT, docs CC BY 3.0.</h6>
        <p>Currently v1.0.0.</p>
      </div>
      <div className="links d-flex flex-column">
        <h4>Links</h4>
        <Link to={'/'} style={{textDecoration:'none',color:'white'}}> Home </Link>
        <Link to={'/login'} style={{textDecoration:'none',color:'white'}}> Login  </Link>
        <Link to={'/register'} style={{textDecoration:'none',color:'white'}}> Register </Link>

      </div>
      <div className="guides d-flex flex-column">
        <h4>Guides</h4>
        <a href={'https://react.dev/'} target='_balank' style={{textDecoration:'none',color:'white'}}> React </a>
        <a href={'https://react-bootstrap.github.io/'} target='_balank' style={{textDecoration:'none',color:'white'}}> React Bootstrap  </a>
        <a href={'https://www.w3schools.com/react/react_router.asp'} target='_balank' style={{textDecoration:'none',color:'white'}}> Routing </a>

      </div>
      <div className="contact ">
          <h4>Contact Us</h4>
          <div className="sub d-flex mt-3">
            <input type="text" className="form-control" placeholder='Enter your Email Id'/>
            <button className='btn btn-warning ms-2 '><i class="fa-solid fa-arrow-right fa-beat"></i></button>
          </div>
          <div className="icons fs-5 d-flex justify-content-between mt-3">
          <Link to={'https://getbootstrap.com/'} style={{ textDecoration: "none", color: "white" }}><i className="fa-solid fa-envelope"></i></Link>
          <Link to={'https://getbootstrap.com/'} style={{ textDecoration: "none", color: "white" }}><i className="fa-brands fa-twitter"></i> </Link>
          <Link to={'https://getbootstrap.com/'} style={{ textDecoration: "none", color: "white" }}><i className="fa-brands fa-linkedin"></i></Link>
          <Link to={'https://getbootstrap.com/'} style={{ textDecoration: "none", color: "white" }}><i class="fa-brands fa-instagram"></i></Link>
          <Link to={'https://getbootstrap.com/'} style={{ textDecoration: "none", color: "white" }}><i className="fa-brands fa-github"></i></Link>
          <Link to={'https://getbootstrap.com/'} style={{ textDecoration: "none", color: "white" }}><i class="fa-brands fa-facebook"></i></Link>
          </div>
        </div>
    </div>

    <p>Copyright © 2024 Project Fair. Built with React.</p>
    </div>
  )
}

export default Footer