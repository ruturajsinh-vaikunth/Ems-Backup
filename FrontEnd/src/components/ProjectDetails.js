import Sidebar from "./Sidebar";
import React , { useEffect, useState } from "react";
import {useDispatch } from 'react-redux'
import { refreshToken } from "../features/auth/authActions";
import http from '../http-common';
import { logout } from "../features/auth/authSlice";
import '../styles/css/index.d9965542.css'
import '../styles/css/chunk-2014a769.9731fe9b.css'
import ProjectService from "../services/ProjectService";
import { useNavigate, useParams } from "react-router-dom";
import DataTable from 'react-data-table-component';
import {BiArrowBack} from 'react-icons/bi'
import {TbEditCircle} from 'react-icons/tb'
import { Link } from 'react-router-dom';
import {IoMdAdd} from 'react-icons/io'
import {NavLink } from "react-router-dom";
import parse from 'html-react-parser'
import {BsEyeFill} from 'react-icons/bs'
import {RiFileDownloadFill} from 'react-icons/ri'
import {RiFileEditFill} from 'react-icons/ri'
import {RiDeleteBin2Fill} from 'react-icons/ri'
import image from '../public/file.jpg'
import { Modal } from "react-bootstrap";

export default function ProjectDetails(){

    const project_id = useParams()._id;
    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [Projectname, setProjectname] = useState("")
    const [Projectstatus, setProjectstatus] = useState("")
    const [Projecthours, setProjecthours] = useState("")
    const [ProjectDescription, setProjectDescription] = useState("")
    const [ProjectFiles, setProjectFiles] = useState([])
    const [AddProjectfiles, setAddProjectfiles] = useState([])
    const [EditProjectfiles, setEditProjectfiles] = useState([])

    const [TaskDetails, setTaskDetails] = useState([])
    const [showTaskAddButton, setshowTaskAddButton] = useState(false)

    const [showDeleteModal, setDeleteShow] = useState(false);
    const handleDeleteShow = () => setDeleteShow(true);
    const handleDeleteClose = () => setDeleteShow(false);

    const [showEditModal, setEditShow] = useState(false);
    const handleEditShow  = () => setEditShow(true);
    const handleEditClose = () => setEditShow(false);

    const [FilesAddShow, setFilesAddShow] = useState(false)
    const [AddFilesError, setAddFilesError] = useState("")
    const [EditFilesError, setEditFilesError] = useState("")

    const [EditFileName, setEditFileName] = useState("")
    const [EditFileId, setEditFileId] = useState("")

    const [DeleteFileName, setDeleteFileName] = useState("")
    const [DeleteFileId, setDeleteFileId] = useState("")
    const [DeleteFileError, setDeleteFileError] = useState("")
    const [DeleteFileAlert, setDeleteFileAlert] = useState(false)
    const [AddFilesAlert, setAddFilesAlert] = useState(false)
    const [EditFilesAlert, setEditFilesAlert] = useState(false)

    const parseJwt = (id) => {
        dispatch(refreshToken({_id : id}))
    };

    function findProjectDetails(){
        ProjectService.findProjectbyId(project_id)
        .then(response => {
            setProjectname(response.data.project_name)
            setProjectstatus(response.data.status)
            setProjecthours(response.data.hours)
            setProjectDescription(response.data.description)
            setProjectFiles(response.data.files);
        })
        .catch(e => {
            console.log(e);
        })
    }

    function findtaskDetails(){
        ProjectService.findTaskbyProjectId(project_id)
        .then((response) => {

            const AccountInfo = localStorage.getItem('store')
            const userInfo = JSON.parse(AccountInfo);

            if(userInfo.account_type === "Admin" || userInfo.account_type === "Manager"){
                setTaskDetails(response.data);
            }else{
                const Data = response.data

                const EMPTasks = Data.filter(
                    item => item.assign_to && item.assign_to.includes(`${userInfo.employee_id}`)           
                )
                setTaskDetails(EMPTasks)
            }
            
        })
        .catch((e) => {
            console.log(e);
        })
    }


    const columns = [
        {
            name: 'Task Name',
            selector: row => row.task_name,
            cell: row => (
                <Link to={`/task-details/${row._id}`}  style={{textDecoration: 'none'}} className="pointer-change">
                    {row.task_name}
                </Link>
            )
            
        },
        {
            name: 'Assign To',
            selector: row => row.assign_to,
            sortable: true,
            cell: row => (
                <Link to={`/employee-info/${row.assign_to}`}  style={{textDecoration: 'none'}} className="pointer-change">
                    {row.assign_to}
                </Link>
            )
        },
        {
            name: 'Task status',
            selector: row => row.status,
            sortable: true,
        },
        {
            name: 'Created By',
            selector: row => row.assign_by,
            sortable: true,
        },
        {
            name: 'Action',
            cell: row => (
                <NavLink to={`/task-update/${row._id}`}>
                    <TbEditCircle size={24} />
                </NavLink>
            )
        }
    ]

    const columnsForEmp = [
        {
            name: 'Task Name',
            selector: row => row.task_name,
            cell: row => (
                <Link to={`/task-details/${row._id}`}  style={{textDecoration: 'none'}} className="pointer-change">
                    {row.task_name}
                </Link>
            )
            
        },
        {
            name: 'Task status',
            selector: row => row.status,
            sortable: true,
        },
        {
            name: 'Created By',
            selector: row => row.assign_by,
            sortable: true,
        }
    ]

    useEffect(() => {
        findProjectDetails();
        findtaskDetails();

        window.scroll(0,0)

        const AccountInfo = localStorage.getItem('store')
        const userInfo1 = JSON.parse(AccountInfo);

        if(userInfo1.account_type === "Admin" || userInfo1.account_type === "Manager"){
            setshowTaskAddButton(true)
        }
        const minutes = 1 * 60 * 1000;
          
        if(navigator.onLine === true){
        const interval = setInterval(() => {
            parseJwt(userInfo1._id)
          }, minutes);
        
          return () => clearInterval(interval);
        }
        else{
            dispatch(logout())
        }

        const token = localStorage.getItem('userToken')
        const decode = JSON.parse(atob(token.split('.')[1]));
        if (decode.exp * 1000 < new Date().getTime()) {
            dispatch(logout())
            localStorage.removeItem('userToken')
            window.location.reload()
        }
         // eslint-disable-next-line
    }, [])

    const downloadFile = (fileName) => {
        fetch(`http://localhost:5000/public/images/${fileName}`, {
          method: 'GET',
        })
          .then(response => response.blob())
          .then(blob => {
            const url = window.URL.createObjectURL(new Blob([blob]));
    
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
    
            document.body.appendChild(link);
    
            link.click();
    
            link.parentNode.removeChild(link);
          });
      };

    function handleEditFile(FileName, Fileid){
        setEditFileName(FileName)
        setEditFileId(Fileid)
    }

    function handleDeleteFile(FileName, Fileid){
        setDeleteFileName(FileName)
        setDeleteFileId(Fileid)
    }

    function DeleteProjectFile(){
        ProjectService.deleteProjectFile(project_id, DeleteFileName, DeleteFileId)
        .then((res) => {
            if(res.status === 200){
                handleDeleteClose()
                setDeleteFileAlert(true)
                findProjectDetails()
                setDeleteFileError("")
            }
        })
        .catch((e) => {
            setDeleteFileError(e)
        })
    }

    function imageChange(e) {

        const chosenFiles = Array.prototype.slice.call(e.target.files)
        if(e.target.files.length === 0){
            setAddFilesError("Please select file(s)")
            return
        }else{
            setAddFilesError("")
            setAddProjectfiles(chosenFiles);
        }

       
    
    }

    function EditImageChange(e){
        const chosenFiles = Array.prototype.slice.call(e.target.files)
            if(e.target.files.length === 0){
                setEditFilesError("Please select file")
                return
            }else{
                setEditFilesError("")
                setEditProjectfiles(chosenFiles);
            }
    }

    const ProjectFileEdit = async () => {
        if(Editfile.length === 0){
            setEditFilesError("Please select file")
            return
        }else{
            setEditFilesError("")
            const userToken = localStorage.getItem('userToken')
    
            const formData = new FormData();
    
            function getRandomFileName() {
                var timestamp = new Date().toISOString().replace(/[-:.]/g,"");  
                var random = ("" + Math.random()).substring(2, 8); 
                var random_number = timestamp+random;  
                return random_number;
            }

            formData.append('_id',project_id)
            formData.append('oldfileid', EditFileId)
            formData.append('oldfilename', EditFileName)
    
            // eslint-disable-next-line
            Editfile.map((file) => {
                formData.append('file', file, getRandomFileName())
            })

            const resp = await http.post(`/project/edit-project-file`, formData, {
                headers: {
                  "content-type": "multipart/form-data",
                  'Authorization': `Bearer ${userToken}`,
                },
              });
            
    
              if(resp.data.msg === "Updated"){
                setEditFilesAlert(true)
                handleEditClose()
                findProjectDetails()
              }
        }
    }

    const ProjectsFileAdd = async () => {
        if(files.length === 0){
            setAddFilesError("Please select file(s)")
            return
        }else{
            setAddFilesError("")
           
            const userToken = localStorage.getItem('userToken')
    
            const formData = new FormData();
    
            function getRandomFileName() {
                var timestamp = new Date().toISOString().replace(/[-:.]/g,"");  
                var random = ("" + Math.random()).substring(2, 8); 
                var random_number = timestamp+random;  
                return random_number;
            }

            formData.append('_id',project_id)
            if(userInfo.account_type === "Admin"){
                formData.append('upload_by', userInfo.account_type)
            }else{
                formData.append('upload_by', userInfo.employee_id)
            }

    
            // eslint-disable-next-line
            files.map((file) => {
                formData.append('file', file, getRandomFileName())
            })

            const resp = await http.post(`/project/add-project-files`, formData, {
                headers: {
                  "content-type": "multipart/form-data",
                  'Authorization': `Bearer ${userToken}`,
                },
              });
            
    
              if(resp.data.msg === "Added"){
                setAddFilesAlert(true)
                setFilesAddShow(false)
                findProjectDetails()
              }
        }
    }

    const Editfile = EditProjectfiles ? [...EditProjectfiles] : [];
    const files = AddProjectfiles ? [...AddProjectfiles] : [];

    if(userInfo.account_type === "Admin" || userInfo.account_type === "Manager"){
        return(
            <div>
                    <Sidebar/>
                    <div className="app-admin-wrap layout-sidebar-large clearfix">
                        <main>
                            <div className="main-content-wrap d-flex flex-column flex-grow-1 sidenav-open">
                                    <div className="main-content">
                                        <div>
                                            <div className="d-flex justify-content-between">
                                                    <div className="breadcrumb p-2">
                                                        <h1>Project Details</h1>
                                                    </div>
                                                    <div className="p-2">
                                                        <button className="btn round  btn-icon rounded-circle m-1 mb-2" title="Back" onClick={() => navigate(-1)}>
                                                            <BiArrowBack  size={24} className="pointer-change" />    
                                                        </button>
                                                    </div>
                                            </div> 
                                            <div className="separator-breadcrumb border-top"></div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-sm-12 col-md-12 col-lg-12">
                                                <div className="card mb-30">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-sm-3">
                                                                <h5>Project Name :</h5>
                                                            </div>
                                                            <div className="col-sm-4">
                                                                <h5>{Projectname}</h5>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className="col-sm-3">
                                                                <h5>Project Status :</h5>
                                                            </div>
                                                            <div className="col-sm-4">
                                                                <h5>{Projectstatus}</h5>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className="col-sm-3">
                                                                <h5>Project Hours :</h5>
                                                            </div>
                                                            <div className="col-sm-4">
                                                                <h5>{Projecthours}</h5>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className="col-sm-3">
                                                                <h5>Project Description :</h5>
                                                            </div>
                                                            <div className="col-sm-6">
                                                            {parse(ProjectDescription)}
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                </div>

                                                <div className="card mb-30">
                                                    <div className="card-body">
                                                        <div className="d-flex justify-content-between">
                                                            <div className="breadcrumb p-2">
                                                                <h4>Project Files</h4>
                                                            </div>
                                                            <div className="p-1 mb-2">
                                                                        <button className="btn btn-primary m-1" title="Add Project" onClick={() => setFilesAddShow(true)}>
                                                                            <IoMdAdd  size={30} className="mr-1" />Files
                                                                        </button>
                                                                    
                                                            </div>
                                                        </div>
                                                        
                                                        {AddFilesAlert === true ?
                                                            <div className="mt-2 mb-1"> 
                                                                <div className="alert alert-success alert-dismissible">
                                                                    <strong>File(s) Added!!</strong> Successfully.
                                                                    <button type="button" className="close" data-dismiss="alert" onClick={() => setAddFilesAlert(false)}>X</button>
                                                                </div>
                                                            </div> : null }

                                                            
                                                        {DeleteFileAlert === true ?
                                                            <div className="mt-2 mb-1"> 
                                                                <div className="alert alert-danger alert-dismissible">
                                                                    <strong>File Deleted!!</strong> Successfully.
                                                                    <button type="button" className="close" data-dismiss="alert" onClick={() => setDeleteFileAlert(false)}>X</button>
                                                                </div>
                                                            </div> : null }
                                                        
                                                        
                                                        {EditFilesAlert === true ?
                                                        <div className="mt-2 mb-1"> 
                                                                <div className="alert alert-primary alert-dismissible">
                                                                    <strong>File Update!!</strong> Successfully.
                                                                    <button type="button" className="close" data-dismiss="alert" onClick={() => setEditFilesAlert(false)}>X</button>
                                                                </div>
                                                        </div> : null }

                                                        {FilesAddShow === true ? 
                                                            <div className="row mt-3 mb-5 ml-auto mr-auto">
                                                                <div className="col-sm-1">
                                                                    <h6 className="mb-0">Files</h6>
                                                                </div>
                                                                <div className="col-sm-3">
                                                                    <input type="file" className="form-control" onChange={imageChange}  multiple />
                                                                    <p className="text-danger">{AddFilesError}</p>
                                                                </div>
                                                                <div className="col-sm-1">
                                                                    <button className="btn btn-primary" onClick={ProjectsFileAdd}>
                                                                        Submit
                                                                    </button>
                                                                </div>
                                                                <div className="col-sm-1">
                                                                    <button className="btn btn-secondary ml-1" onClick={() => setFilesAddShow(false)}>Cancel</button>
                                                                </div>
                                                            </div>: null
                                                        }

                                                        <div className="row mt-2">
                                                            
                                                            {ProjectFiles && ProjectFiles.map((data, index) => (
                                                                <div className="col-sm-3" key={index}>
                                                                    <div className="card bg-dark text-white o-hidden filescard">
                                                                    {`http://localhost:5000/public/images/${data.file}`.split(".").pop() === 'jpeg' || `http://localhost:5000/public/images/${data.file}`.split(".").pop() === 'png' || `http://localhost:5000/public/images/${data.file}`.split(".").pop() === 'jpg' ? 
                                                                        <img src={`http://localhost:5000/public/images/${data.file}`} alt="" style={{ width: '100%', height: '9rem', objectFit: 'cover' }} />
                                                                        : <img  src={image} alt="" style={{ width: '100%', height: '9rem', objectFit: 'cover' }}/>}
                                                                        <div className="card-img-overlay">
                                                                            <div class="text-right pt-2">
                                                                                <h5 class="card-title mb-2 text-white">
                                                                                    <div className="row justify-content-end">
                                                                                        <div className="col-sm-1">
                                                                                            <a href={`http://localhost:5000/public/images/${data.file}`} target="_blank" rel="noopener noreferrer">
                                                                                                <BsEyeFill size={24} color="white" />
                                                                                            </a>
                                                                                        </div>
                                                                                        <div className="col-sm-1 mr-1">
                                                                                            <RiFileDownloadFill size={24} color="white" title="download" className="pointer-change" onClick={() => downloadFile(data.file)} />
                                                                                        </div>
                                                                                        {userInfo.account_type === 'Admin' ? 
                                                                                            <>{data.upload_by === userInfo.account_type ? 
                                                                                                <>
                                                                                                <div className="col-sm-1 pointer-change">
                                                                                                    <RiFileEditFill size={24} color="white" title="Edit" onClick={() => {handleEditShow(); handleEditFile(data.file, data._id)}} />
                                                                                                </div>
                                                                                                <div className="col-sm-1 mr-2 pointer-change">
                                                                                                    <RiDeleteBin2Fill size={24} color="white" title="Delete" onClick={() => {handleDeleteShow(); handleDeleteFile(data.file, data._id)}} />
                                                                                                </div>
                                                                                                </> : null
                                                                                            }</> :  
                                                                                            <>{data.upload_by == userInfo.employee_id ? 
                                                                                                <>
                                                                                                <div className="col-sm-1 pointer-change">
                                                                                                    <RiFileEditFill size={24} color="white" title="Edit" onClick={() => {handleEditShow(); handleEditFile(data.file, data._id)}} />
                                                                                                </div>
                                                                                                <div className="col-sm-1 mr-2 pointer-change">
                                                                                                    <RiDeleteBin2Fill size={24} color="white" title="Delete" onClick={() => {handleDeleteShow(); handleDeleteFile(data.file, data._id)}} />
                                                                                                </div>
                                                                                                </> : null}</>
                                                                                            }
                                                                                    </div>
                                                                                </h5>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                </div>

                                                            ))}
                                                            
                                                            <Modal show={showEditModal} onHide={handleEditClose} animation={false}>
                                                                <Modal.Header closeButton>
                                                                <Modal.Title>Update the File</Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                    {/* <p className="text-danger">{DeleteFileError}</p> */}
                                                                    <div className="row">
                                                                            <div className="col-sm-12">
                                                                              File Name  : {EditFileName} 
                                                                            </div>    
                                                                    </div>
                                                                    <div className="row mt-3">
                                                                        <div className="col-sm-2">
                                                                            <h6 className="mb-0">File : </h6>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                            <input type="file" className="form-control" onChange={EditImageChange} required />
                                                                            <p className="text-danger">{EditFilesError}</p>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                   
                                                                    <div className="row mt-2 justify-content-end">
                                                                            <div className="col-sm-3 mt-3">
                                                                                <button className="btn btn-primary btn-sm" onClick={ProjectFileEdit}>
                                                                                    Update
                                                                                </button>
                                                                            </div>
                                                                            <div className="col-sm-3 mt-3">
                                                                                <button className="btn btn-secondary btn-sm" onClick={handleEditClose}>
                                                                                    Cancel
                                                                                </button>
                                                                            </div>
                                                                        
                                                                    </div>
                                                                </Modal.Body>
                                                            </Modal>

                                                            <Modal show={showDeleteModal} onHide={handleDeleteClose} animation={false}>
                                                                <Modal.Header closeButton>
                                                                <Modal.Title>Are you sure to delete this File ?</Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                    <p className="text-danger">{DeleteFileError}</p>
                                                                    <div className="row">
                                                                            <div className="col-sm-12">
                                                                              File Name  : {DeleteFileName} 
                                                                            </div>    
                                                                            
                                                                    </div>
                                                                    
                                                                   
                                                                    <div className="row mt-2 justify-content-end">
                                                                            <div className="col-sm-3 mt-3">
                                                                                <button className="btn btn-danger btn-sm" onClick={DeleteProjectFile}>
                                                                                    Delete
                                                                                </button>
                                                                            </div>
                                                                            <div className="col-sm-3 mt-3">
                                                                                <button className="btn btn-secondary btn-sm" onClick={handleDeleteClose}>
                                                                                    Cancel
                                                                                </button>
                                                                            </div>
                                                                        
                                                                    </div>
                                                                </Modal.Body>
                                                            </Modal>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="card mb-30">
                                                    <div className="card-body">
                                                    <div className="d-flex justify-content-between">
                                                        <div className="breadcrumb p-2">
                                                            <h4>Task List</h4>
                                                        </div>
                                                        <div className="p-1 mb-2">
                                                           
                                                            {showTaskAddButton === true ? <>
                                                                <NavLink to={`/add-task/${project_id}`}>
                                                                    <button className="btn btn-primary m-1" title="Add Project">
                                                                        <IoMdAdd  size={30} className="mr-1" />Task
                                                                    </button>
                                                                </NavLink>
                                                            </>: null}
                                                        </div>
                                                    </div>
                                                    <DataTable 
                                                        columns={columns}
                                                        data={TaskDetails}
                                                    />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                            </div>
                        </main>
                    </div>
                    
                </div>
        )
    }
    else{
        return(
            <div>
            <Sidebar/>
            <div className="app-admin-wrap layout-sidebar-large clearfix">
                <main>
                    <div className="main-content-wrap d-flex flex-column flex-grow-1 sidenav-open">
                            <div className="main-content">
                                <div>
                                    <div className="d-flex justify-content-between">
                                            <div className="breadcrumb p-2">
                                                <h1>Project Details</h1>
                                            </div>
                                            <div className="p-2">
                                                <button className="btn round  btn-icon rounded-circle m-1 mb-2" title="Back" onClick={() => navigate(-1)}>
                                                    <BiArrowBack  size={24} className="pointer-change" />    
                                                </button>
                                            </div>
                                    </div> 
                                    <div className="separator-breadcrumb border-top"></div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col-sm-12 col-md-12 col-lg-12">
                                        <div className="card mb-30">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h5>Project Name :</h5>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <h5>{Projectname}</h5>
                                                    </div>
                                                </div>
                                                <div className="row mt-2">
                                                    <div className="col-sm-3">
                                                        <h5>Project Status :</h5>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <h5>{Projectstatus}</h5>
                                                    </div>
                                                </div>
                                                <div className="row mt-2">
                                                    <div className="col-sm-3">
                                                        <h5>Project Hours :</h5>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <h5>{Projecthours}</h5>
                                                    </div>
                                                </div>
                                                <div className="row mt-2">
                                                    <div className="col-sm-3">
                                                        <h5>Task Description :</h5>
                                                    </div>
                                                    <div className="col-sm-6">
                                                    {parse(ProjectDescription)}
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>

                                        <div className="card mb-30">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <div className="breadcrumb p-2">
                                                        <h4>Task Files</h4>
                                                    </div>
                                                </div>
                                                <div className="row mt-2">
                                                            {ProjectFiles && ProjectFiles.map((data, index) => (
                                                                <div className="col-3" key={index}>
                                                                    <div className="card bg-dark text-white o-hidden filescard">
                                                                    {`http://localhost:5000/public/images/${data.file}`.split(".").pop() === 'jpeg' || `http://localhost:5000/public/images/${data.file}`.split(".").pop() === 'png' || `http://localhost:5000/public/images/${data.file}`.split(".").pop() === 'jpg' ? 
                                                                        <img src={`http://localhost:5000/public/images/${data.file}`} alt="" style={{ width: '100%', height: '9rem', objectFit: 'cover' }} />
                                                                        : <img  src={image} alt="" style={{ width: '100%', height: '9rem', objectFit: 'cover' }}/>}
                                                                        <div className="card-img-overlay">
                                                                            <div class="text-right pt-2">
                                                                                <h5 class="card-title mb-2 text-white">
                                                                                    <div className="row justify-content-end">
                                                                                        <div className="col-sm-1">
                                                                                            <a href={`http://localhost:5000/public/images/${data.file}`} target="_blank" rel="noopener noreferrer">
                                                                                                <BsEyeFill size={24} color="white" />
                                                                                            </a>
                                                                                        </div>
                                                                                        <div className="col-sm-1 mr-2">
                                                                                                <RiFileDownloadFill size={24} color="white" title="download" className=" pointer-change" onClick={() => downloadFile(data.file)} />
                                                                                        </div>
                                                                                    </div>
                                                                                </h5>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card mb-30">
                                            <div className="card-body">
                                            <div className="d-flex justify-content-between">
                                                <div className="breadcrumb p-2">
                                                    <h4>Task List</h4>
                                                </div>
                                                
                                                <div className="p-1 mb-2">
                                                   
                                                    {showTaskAddButton === true ? <>
                                                        <NavLink to={`/add-task/${project_id}`}>
                                                            <button className="btn btn-primary m-1" title="Add Project">
                                                                <IoMdAdd  size={30} className="mr-1" />Task
                                                            </button>
                                                        </NavLink>
                                                    </>: null}
                                                </div>
                                            </div>
                                                    <DataTable 
                                                                columns={columnsForEmp}
                                                                data={TaskDetails}
                                                            />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                    </div>
                </main>
            </div>
            
        </div>
        )
    }
}