import React,{useState,useEffect, useContext} from 'react'
import AddProject from './AddProject'
import EditProject from './EditProject'
import { deleteProjectAPI, getUserProjectAPI } from '../Services/allAPIs'
import { addProjectResponseContext, editProjectResponseContext } from '../Context API/ContextShare'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function MyProjects() {
  const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)
  const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)
  const [allProjects,setAllprojects] = useState([])
  const getUserProjects = async ()=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      } 
      const result = await getUserProjectAPI(reqHeader)
      if(result.status===200){
        setAllprojects(result.data)
      }else{
        console.log(result);
      }
    }
  }
  console.log(allProjects);
  useEffect(()=>{
    console.log("Inside myproject useeffect");
    getUserProjects()
   },[addProjectResponse,editProjectResponse])

   const handleDeleteProject = async (pid)=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      try{
        const result = await deleteProjectAPI(pid,reqHeader)
        if(result.status==200){
          getUserProjects()
        }else{
          toast.warning(result.response.data)
        }
      }catch(err){
        console.log(err);
      }
    }
      
   }

  return (
    <div className='card shadow p-3 '>
      <div className="d-flex justify-content-between">
        <h2>My Projects</h2>
        <div> <AddProject/> </div>
      </div>
      <div className="mt-4">
        {
          allProjects.length>0?
          allProjects.map((project,index)=>(
            <div key={index} className="border rounded d-flex justify-content-between align-items-center text-danger mb-3 p-2">
          <h5>{project?.title}</h5>
          <div className="d-flex icons align-items-center">
            <EditProject project={project}/>
            <a target='_blank' className='btn'  href={project?.github}><i style={{height:'34px'}} className="fa-brands fa-github fa-2x"></i></a>
            <button onClick={()=>handleDeleteProject(project?._id)} className='btn'><i style={{height:'34px'}}  className="fa-solid fa-trash fa-2x"></i></button>
          </div>
          </div>
          ))
        :
        <div className="text-danger fs-4 fw-bolder">No projects are uploaded yet!!!</div>
        }
      </div>
      <ToastContainer autoClose={3000} theme="colored" />
    </div>
  )
}

export default MyProjects