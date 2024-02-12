import React,{useContext, useEffect, useState} from 'react'
import { Modal,Button } from 'react-bootstrap'
import uploadProject from '../assets/Images/upload-project.png'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { addProjectAPI } from '../Services/allAPIs'
import { addProjectResponseContext } from '../Context API/ContextShare'

function AddProject() {
  //get context
  const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)
  const [preview,setPreview] = useState("")
  const [fileStatus,setFileStatus] = useState(false)
  const [show,setShow] = useState(false)
  const [projectData,setProjectData] = useState({
    title:"",languages:"",overview:"",github:"",website:"",projectImage:""
  })

  console.log(projectData);

  const handleShow = ()=>setShow(true)
  const handleClose = ()=>{
    setShow(false)
    setProjectData({
      title:"",languages:"",overview:"",github:"",website:"",projectImage:""
    })
    setPreview("")
  }

  useEffect(()=>{
    // console.log(projectData.projectImage.type);
    if(projectData.projectImage.type=="image/png" ||  projectData.projectImage.type=="image/jpg" || projectData.projectImage.type=="image/jpeg"){
      // console.log("generate image url");
      setPreview(URL.createObjectURL(projectData.projectImage));
      setFileStatus(false)
    }else{
      // console.log("Please Upload following file extensions (png, jpg, jpeg)  only");
      setFileStatus(true)
      setPreview("")
      setProjectData({...projectData,projectImage:""})
    }
  },[projectData.projectImage])

  const handleAddProject = async ()=>{
    const {title,languages,overview,github,website,projectImage} = projectData
    if(!title || !languages || !overview || !github || !website || !projectImage){
      toast.info("Please fill the form completely!!!")
    }else{
      //api call - reqBody
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("projectImage",projectImage)
      //api call - reHeader
      const token = sessionStorage.getItem("token")
      console.log(token);
      if(token){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        //api call
        try{
          const result = await addProjectAPI(reqBody,reqHeader)
        console.log(result);
        if(result.status===200){
          console.log(result.data);
          handleClose()
          setAddProjectResponse(result.data)
        }else{
          toast.warning(result.response.data)
        }
      }catch(err){
        console.log(err);
      }
      }
    }
  }

  return (
    <>
    <button onClick={handleShow} className='btn btn-success'><i className="fa-solid fa-plus"></i> Add Project</button>
    <Modal size='lg'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6">
              <label >
                <input type="file" style={{display:'none'}} onChange={e=>setProjectData({...projectData,projectImage:e.target.files[0]})} />
                <img style={{height:'250px'}} className='w-100' src={preview?preview:uploadProject} alt="upload project image" />
              </label>
              {fileStatus&&<div className="text-danger mt-2"> *Please Upload file with following extensions (png, jpg, jpeg)  only* </div>}
            </div>
            <div className="col-lg-6 ">
              <div className="mb-3 ">
                <input type="text" className="form-control" placeholder='Project Title' value={projectData.title} onChange={e=>setProjectData({...projectData,title:e.target.value})} />
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder='Language Used' value={projectData.languages} onChange={e=>setProjectData({...projectData,languages:e.target.value})} />
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder='Project Github Link' value={projectData.github} onChange={e=>setProjectData({...projectData,github:e.target.value})}/>
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder='Project Website Link' value={projectData.website} onChange={e=>setProjectData({...projectData,website:e.target.value})}/>
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder='Project Overview' value={projectData.overview} onChange={e=>setProjectData({...projectData,overview:e.target.value})}/>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAddProject} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={3000} theme="colored" />
    </>
  )
}

export default AddProject