import React, { useState,useContext } from "react";
import { Form ,Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from "../Services/allAPIs";
import { tokenAuthenticationContext  } from "../Context API/TokenAuth";
import loginImg from '../assets/Images/login.webp'

function Auth({ insideRegister }) {
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthenticationContext)
  const [loginStatus,setLoginStatus] = useState(false)
  const navigate = useNavigate()
  const [userData,setUserData] = useState({
    username:"",email:"",password:""
  })

  const handleRegister = async (e)=>{
    e.preventDefault()
    console.log(userData);
    const {username,email,password} = userData
    if(!username || !email || !password){
      toast.info("Please fill the form completely!!!")
    }else{
      // toast.success("Proceed to api call")
      try{
        const result = await registerAPI(userData)
        console.log(result);
        if(result.status===200){
          toast.success(`${result.data.username} has registered successfully!!!`)
          setUserData({username:"",email:"",password:""})
          setTimeout(() => {
            navigate('/login')
          }, 3000);
         
        }else {
          toast.warning(result.response.data)
        }
      }catch(err){
        console.log(err);
      }
    }
  }

  const handleLogin = async (e) =>{
    e.preventDefault()
    const {email,password} = userData
    if(!email || !password){
      toast.info("Please fill the form completely!!!")
    }else{
      try{
        const result = await loginAPI({email,password})
        console.log(result);
        if(result.status===200){
          setLoginStatus(true)
          sessionStorage.setItem("username",result.data.exisitngUser.username)
          sessionStorage.setItem("token",result.data.token)
          sessionStorage.setItem("userDetails",JSON.stringify(result.data.exisitngUser))
          setIsAuthorised(true)
          setTimeout(() => {
            setUserData({email:"",password:""})
            navigate('/')
            setLoginStatus(false)
          }, 2000);
        }else {
          toast.warning(result.response.data)
        }
      }catch(err){
        console.log(err);
      }
    }
  }
  return (
    <div
      style={{ width: "100%", height: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <div className="container w-75">
        <Link to={"/"}>
          {" "}
          <i className="fa-solid fa-arrow-left me-1"></i> Back to Home
        </Link>
        <div className="card shadow p-5 bg-success">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img height={'300px'}
                className="w-100"
                src={loginImg}
                alt="login"
              />
            </div>
            <div className="col-lg-6">
              <div className="d-flex align-items-center flex-column">
                <h1 className="fw-bolder text-light mt-2">
                  {" "}
                  <i
                    style={{ height: "41px" }}
                    className="fa-solid fa-paperclip"
                  ></i>{" "}
                  Project Fair{" "}
                </h1>
                <h5 className="fw-bolder mt-2 pb-3 text-light">
                  {insideRegister
                    ? "Sign up to your Account"
                    : "Sign In to your Account"}
                </h5>
                <Form className="w-100">
                  {insideRegister && (
                    <Form.Group className="mb-3" controlId="formBasicName">
                      <Form.Control type="text" placeholder="Enter Username" onChange={e=>setUserData({...userData,username:e.target.value})} value={userData.username} />
                    </Form.Group>
                  )}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter email" onChange={e=>setUserData({...userData,email:e.target.value})} value={userData.email}/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" onChange={e=>setUserData({...userData,password:e.target.value})} value={userData.password}/>
                  </Form.Group>
                  {
                    insideRegister?
                    <div>
                      <button onClick={handleRegister} className="btn btn-light mb-2">Register</button>
                      <p>Already have an Account? Click here to <Link to={'/login'} className="text-light">Login</Link> </p>
                    </div>:
                     <div>
                     <button onClick={handleLogin} className="btn btn-light mb-2">Login {loginStatus&&<Spinner animation="border" variant="warning" />} </button>
                     <p>New User? Click here to <Link to={'/register'} className="text-light">Register</Link> </p>
                   </div>
                  }
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer autoClose={3000} theme="colored" />

    </div>
  );
}

export default Auth;
