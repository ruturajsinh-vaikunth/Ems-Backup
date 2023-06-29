import Sidebar from "./Sidebar";
import React , { useEffect, useState } from "react";
import { useRef } from "react";
import {useDispatch } from 'react-redux';
import http from '../http-common';
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
import '../styles/css/index.d9965542.css';
import '../styles/css/chunk-2014a769.9731fe9b.css';
import ProjectService from "../services/ProjectService";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {BiArrowBack} from 'react-icons/bi'
import { Editor } from '@tinymce/tinymce-react';
import parse from 'html-react-parser';
import {RiUserSmileFill} from 'react-icons/ri';
import { Modal } from 'react-bootstrap';
import {BsEyeFill} from 'react-icons/bs';
import {RiFileDownloadFill} from 'react-icons/ri';
import {RiFileEditFill} from 'react-icons/ri'
import {RiDeleteBin2Fill} from 'react-icons/ri'
import {IoMdAdd} from 'react-icons/io'
import image from '../public/file.jpg'

export default function TaskDetails(){

    const _id = useParams()._id;

    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);
    const { handleSubmit } = useForm()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const editorRef = useRef(null);
    const EditTaskNoteRef = useRef(null)

    const [Task_id, setTask_id] = useState("")
    const [Taskname, setTaskname] = useState("")
    const [Taskstatus, setTaskstatus] = useState("")
    const [Taskhours, setTaskhours] = useState("")
    const [TaskDueDate, setTaskDueDate] = useState("")
    const [TaskDescription, setTaskDescription] = useState("")
    const [TaskFiles, setTaskFiles] = useState([])
    const [Error, setError] = useState("")
    const [showTaskNotesEdit, setshowTaskNotesEdit] = useState(false)
    const [TasknoteAlert, setTasknoteAlert] = useState(false)
    const [TaskNoteData, setTaskNoteData] = useState([])
    const [Edit_TaskNot, setEditTaskNote] = useState("")
    const [Edit_id, setEditId] = useState("")
    const [DelTaskId, setDelTaskId] = useState("")
    const [TaskNotError, setTaskNotError] = useState("")

    const [FilesAddShow, setFilesAddShow] = useState(false)
    const [AddFilesError, setAddFilesError] = useState("")

    const [showUpdateButton, setshowUpdateButton] = useState(false)
    const [showUpdateButtonManager, setshowUpdateButtonManager] = useState(false)
    const [DeleteFileError, setDeleteFileError] = useState("")

    const [EditFilesError, setEditFilesError] = useState("")

    const [EditFileName, setEditFileName] = useState("")
    const [EditFileId, setEditFileId] = useState("")

    const [DeleteFileName, setDeleteFileName] = useState("")
    const [DeleteFileId, setDeleteFileId] = useState("")

    const [EditTaskfiles, setEditTaskfiles] = useState([])

    const [showModal, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [showDelModal, setDelShow] = useState(false);
    const handleDelShow = () => setDelShow(true)
    const handleDelClose = () => setDelShow(false)

    const [showDeleteModal, setDeleteShow] = useState(false);
    const handleDeleteShow = () => setDeleteShow(true);
    const handleDeleteClose = () => setDeleteShow(false);

    const [showEditModal, setEditShow] = useState(false);
    const handleEditShow  = () => setEditShow(true);
    const handleEditClose = () => setEditShow(false);

    const [EditFilesAlert, setEditFilesAlert] = useState(false)
    const [AddFilesAlert, setAddFilesAlert] = useState(false)
    const [AddTaskfiles, setAddTaskfiles] = useState(false)
    const [DeleteFileAlert, setDeleteFileAlert] = useState(false)

    const [limit, setlimit] = useState(10)
    const [ShowloadMore, setShowloadMore] = useState(false)

    const parseJwt = (id) => {
        dispatch(refreshToken({_id : id}))
        
    };

    function findTaskDetails(){
        ProjectService.findTaskbyTaskId(_id)
        .then(response => {
            setTask_id(response.data._id)
            setTaskname(response.data.task_name)
            setTaskstatus(response.data.status)
            setTaskhours(response.data.task_hours)
            setTaskDueDate(response.data.due_date)
            setTaskDescription(response.data.description)
            setTaskFiles(response.data.files);
            if(userInfo.employee_id == response.data.assign_to){
                setshowTaskNotesEdit(true)
            }
        })
        .catch(e => {
            console.log(e);
        })
    }

    function convert(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear() ].join("-");
    }

    function findTaskNotesData(){
        ProjectService.findTaskNotesbyTaskId(_id, limit)
        .then((response) => {
            setTaskNoteData(response.data);
            if(response.data.length < 10 || response.data.length === 0){
                setShowloadMore(false)
            }else{
                setShowloadMore(true)
            }
        })
        .catch((e) => {
            console.log(e);
        })
    }

    function loadnext(){
        
        let newLimit = limit + 10
        setlimit(newLimit)

        ProjectService.findTaskNotesbyTaskId(_id, newLimit)
        .then((response) => {
            setTaskNoteData(response.data);
            if(response.data.length < limit ){
                setShowloadMore(false)
            }else{
                setShowloadMore(true)
            }
            
        })
        .catch((e) => {
            console.log(e);
        })
    }
    

    useEffect(() => {
        findTaskDetails();
        findTaskNotesData();

        window.scroll(0,0)

        const AccountInfo = localStorage.getItem('store')
        const userInfo1 = JSON.parse(AccountInfo);
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


    
    function submitForm(){

        let content = editorRef.current.getContent();
        let regex = /^<p>(&nbsp;\s)+(&nbsp;)+<\/p>$/g;

        // editorRef.current.getContent({format: 'text'})

        if(content === ' ' || regex.test(content)){
            setTaskNotError("Please Enter Task Note")
            return
        }else{
            setTaskNotError("")
        }

        ProjectService.AddTaskNote(editorRef.current.getContent() , _id, userInfo.firstName)
        .then((response) => {
            if(response.status === 200){
                setTasknoteAlert(true)
                if (editorRef.current) {
                    editorRef.current.setContent("<p> </p>")
                }
                setTaskNotError("")
                findTaskNotesData()
            }
        })
        .catch((e) => {
            setError(e)
        })
    }

    function handleTaskNoteEdit(EditTaskNote, Edit_id){
        setEditTaskNote(EditTaskNote)
        setEditId(Edit_id)
    }

    function handleTaskNoteDelete(Delete_id){
        setDelTaskId(Delete_id)
    }

    function updateTaskNote(){
        ProjectService.updateTaskNote(Edit_id, EditTaskNoteRef.current.getContent())
        .then((res) => {
            if(res.status === 200){
                handleClose();
                findTaskNotesData();
            }
        })
        .catch((e) => {
            console.log(e);
        })
    }

    function deleteTaskNote(){
        ProjectService.deleteTaskNote(DelTaskId)
        .then((res) => {
            if(res.status === 200){
                handleDelClose();
                findTaskNotesData();
            }
        })
        .catch((e) => {
            console.log(e);
        })
    }

    function StatusUpdate(){
        ProjectService.updateTaskStatus(Task_id, Taskstatus)
        .then((res) => {
            if(res.status === 200){
                setshowUpdateButton(false)
                findTaskDetails()
            }
        })
    }

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

    function EditImageChange(e){
        const chosenFiles = Array.prototype.slice.call(e.target.files)
            if(e.target.files.length === 0){
                setEditFilesError("Please select file")
                return
            }else{
                setEditFilesError("")
                setEditTaskfiles(chosenFiles);
            }
    }

    function imageChange(e) {

        const chosenFiles = Array.prototype.slice.call(e.target.files)
        if(e.target.files.length === 0){
            setAddFilesError("Please select file(s)")
            return
        }else{
            setAddFilesError("")
            setAddTaskfiles(chosenFiles);
        }
    
    }

    function DeleteTaskFile(){
        ProjectService.deleteTaskFile(_id, DeleteFileName, DeleteFileId)
        .then((res) => {
            if(res.status === 200){
                handleDeleteClose()
                setDeleteFileAlert(true)
                findTaskDetails()
                setDeleteFileError("")
            }
        })
        .catch((e) => {
            setDeleteFileError(e)
        })
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

            formData.append('_id',_id)
            formData.append('oldfileid', EditFileId)
            formData.append('oldfilename', EditFileName)
    
            // eslint-disable-next-line
            Editfile.map((file) => {
                formData.append('file', file, getRandomFileName())
            })

            const resp = await http.post(`/project/edit-task-file`, formData, {
                headers: {
                  "content-type": "multipart/form-data",
                  'Authorization': `Bearer ${userToken}`,
                },
              });
            
    
              if(resp.data.msg === "Updated"){
                setEditFilesAlert(true)
                handleEditClose()
                findTaskDetails()
              }
        }
    }

    const TaskFileAdd = async () => {
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

            formData.append('_id',_id)

            if(userInfo.account_type === "Admin"){
                formData.append('upload_by', userInfo.account_type)
            }else{
                formData.append('upload_by', userInfo.employee_id)
            }
    
            // eslint-disable-next-line
            files.map((file) => {
                formData.append('file', file, getRandomFileName())
            })

            const resp = await http.post(`/project/add-task-files`, formData, {
                headers: {
                  "content-type": "multipart/form-data",
                  'Authorization': `Bearer ${userToken}`,
                },
              });
            
    
              if(resp.data.msg === "Added"){
                setAddFilesAlert(true)
                setFilesAddShow(false)
                findTaskDetails()
              }
        }
    }

    const Editfile = EditTaskfiles ? [...EditTaskfiles] : [];
    const files = AddTaskfiles ? [...AddTaskfiles] : [];

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
                                                        <h1>Task Details</h1>
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
                                                                <h5>Task Name :</h5>
                                                            </div>
                                                            <div className="col-sm-4">
                                                                <h5>{Taskname}</h5>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className="col-sm-3">
                                                                <h5>Task Hours :</h5>
                                                            </div>
                                                            <div className="col-sm-4">
                                                                <h5>{Taskhours}</h5>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className="col-sm-3">
                                                                <h5>Due Date :</h5>
                                                            </div>
                                                            <div className="col-sm-4">
                                                                <h5>{convert(TaskDueDate)}</h5>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className="col-sm-3">
                                                                <h5>Task Status :</h5>
                                                            </div>
                                                            <div className="col-sm-4">
                                                                    <select className="custom-select" value={Taskstatus} onChange={(e) => {setTaskstatus(e.target.value); setshowUpdateButtonManager(true)}}>
                                                                        <option value="In Complete">In Complete</option>
                                                                        <option value="Pending Review">Pending Review</option>
                                                                        <option value="On Hold">On Hold</option>
                                                                        <option value="Completed">Completed</option>
                                                                    </select>
                                                            </div>
                                                            {showUpdateButtonManager === true ? 
                                                            <div className="col-sm-4">
                                                                <button className="btn btn-primary" onClick={StatusUpdate}>Update</button>
                                                            </div> : null}
                                                            
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className="col-sm-3">
                                                                <h5>Task Description :</h5>
                                                            </div>
                                                            <div className="col-sm-6">
                                                            {parse(TaskDescription)}
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
                                                                    <button className="btn btn-primary" onClick={TaskFileAdd}>
                                                                        Submit
                                                                    </button>
                                                                </div>
                                                                <div className="col-sm-1">
                                                                    <button className="btn btn-secondary ml-1" onClick={() => setFilesAddShow(false)}>Cancel</button>
                                                                </div>
                                                            </div>: null
                                                        }

                                                    <div className="row mt-2">
                                                            {TaskFiles && TaskFiles.map((data, index) => (
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
                                                                                        <div className="col-sm-1 pointer-change mr-1" >
                                                                                                <RiFileDownloadFill size={24} color="white" title="download" onClick={() => downloadFile(data.file)} />
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
                                                                                <button className="btn btn-danger btn-sm" onClick={DeleteTaskFile}>
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
                                                            <h4>Task Notes List</h4>
                                                            
                                                            {TasknoteAlert === true ?
                                                            <div className="mt-2 mb-1"> 
                                                                <div className="alert alert-success alert-dismissible">
                                                                    <strong>Task Note Added!!</strong> Successfully.
                                                                    <button type="button" className="close" data-dismiss="alert" onClick={() => setTasknoteAlert(false)}>X</button>
                                                                </div>
                                                            </div> : null }

                                                            <p className="text-danger">{Error}</p>
                                                            <form onSubmit={handleSubmit(submitForm)} className="mb-5"> 
                                                                <div className="row mt-3 ml-auto mr-auto">
                                                                    
                                                                    <div className="col-sm-12">
                                                                        <div className="bv-no-focus-ring">
                                                                                                <Editor
                                                                                                    onInit={(evt, editor) => editorRef.current = editor}
                                                                                                    initialValue="<p> </p>"
                                                                                                    init={{
                                                                                                    height: 200,
                                                                                                    menubar: false,
                                                                                                    plugins: [
                                                                                                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                                                                                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                                                                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                                                                                    ],
                                                                                                    toolbar: 'undo redo | blocks | ' +
                                                                                                        'bold italic forecolor | alignleft aligncenter ' +
                                                                                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                                                                                        'removeformat | help',
                                                                                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                                                                                    }}
                                                                                                />
                                                                                                <p className="text-danger">{TaskNotError}</p>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                </div>
                                                                <div className="row mt-3 ml-auto mr-auto justify-content-center">
                                                                
                                                                    <div className="col-sm-2">
                                                                            <button className="btn btn-primary btn-sm" type="submit">
                                                                                Submit
                                                                            </button>
                                                                        </div>
                                                                    
                                                                </div>
                                                                
                                                            </form> 
                                                            
                                                            {TaskNoteData.map((data, index) => (
                                                                <div key={index}>
                                                               
                                                                        <div className="d-flex flex-row mb-4  ml-auto mr-auto">
                                                                        <div className="col-sm-3">
                                                                            <div className="row">
                                                                                <RiUserSmileFill size={40} color="black" className="mt-2" />
                                                                            </div>
                                                                            <div className="row text-center">
                                                                                <p style={{fontSize: '13px', textAlign: 'center'}}>{data.added_by}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="p-3 ms-3 col-sm-6" style={{borderRadius: '15px' ,  backgroundColor: 'rgba(57, 192, 237,.2)'}}>
                                                                            <h5>{parse(data.task_note)}</h5>
                                                                            <h5 style={{fontSize: '11px'}}>{convert(data.updatedAt)} {new Date(data.updatedAt).toLocaleTimeString()}</h5>
                                                                            {data.added_by === userInfo.firstName ? 
                                                                            <div className="row ml-1" >
                                                                            <h5 className="text-edit pointer-change" onClick={() => {handleShow() ; handleTaskNoteEdit(data.task_note, data._id)}}>Edit</h5> 
                                                                            <h5 className="text-delete  pointer-change ml-3" onClick={() => {handleDelShow(); handleTaskNoteDelete(data._id)}}>Delete</h5>
                                                                            </div>
                                                                            : null}
                                                                        </div>
                                                                        </div>
                                                                </div>
                                                            ))}
                                                            
                                                            {ShowloadMore === true ? 
                                                                <div className="divider pointer-change mb-4">
                                                                    <span></span>
                                                                    <span className="text-center mx-3 mb-0" style={{color: '#a2aab7'}} onClick={loadnext}>Load More</span>
                                                                    <span></span>
                                                                </div> : null}
                                                            
                                                            <Modal show={showModal} onHide={handleClose} animation={false} size='xl'>
                                                                <Modal.Header closeButton>
                                                                <Modal.Title>Edit Note</Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                    <form onSubmit={handleSubmit(updateTaskNote)} className="ml-auto mr-auto">
                                                                        <Editor
                                                                                                    onInit={(evt, editor) => EditTaskNoteRef.current = editor}
                                                                                                    initialValue={Edit_TaskNot}
                                                                                                    init={{
                                                                                                    height: 150,
                                                                                                    menubar: false,
                                                                                                    plugins: [
                                                                                                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                                                                                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                                                                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                                                                                    ],
                                                                                                    toolbar: 'undo redo | blocks | ' +
                                                                                                        'bold italic forecolor | alignleft aligncenter ' +
                                                                                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                                                                                        'removeformat | help',
                                                                                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                                                                                    }}
                                                                        />
                                                                    <hr/>
                                                                    <div className="row d-flex justify-content-end mt-3">
                                                                    <div className="col-sm-3">
                                                                        <button className="btn btn-primary btn-sm" type="submit">
                                                                            Update
                                                                        </button>
                                                                    </div>
                                                                    <div className="col-sm-3">
                                                                        <button className="btn btn-secondary btn-sm" onClick={handleClose}>
                                                                            Cancel
                                                                        </button>
                                                                        </div>
                                                                    </div>

                                                                    </form>
                                                                </Modal.Body>
                                                            </Modal>

                                                            <Modal show={showDelModal} onHide={handleDelClose} animation={false} size='xl'>
                                                                <Modal.Header closeButton>
                                                                <Modal.Title>Do you want to Delete this Note ??</Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                            
                                                                    <div className="row d-flex justify-content-end mt-3">
                                                                    <div className="col-sm-3">
                                                                        <button className="btn btn-danger btn-sm" onClick={deleteTaskNote}>
                                                                            Delete
                                                                        </button>
                                                                    </div>
                                                                    <div className="col-sm-3">
                                                                        <button className="btn btn-secondary btn-sm" onClick={handleDelClose}>
                                                                            Cancel
                                                                        </button>
                                                                        </div>
                                                                    </div>

                                                                   
                                                                </Modal.Body>
                                                            </Modal>
                                                            
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
                                                <h1>Task Details</h1>
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
                                                        <h5>Task Name :</h5>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <h5>{Taskname}</h5>
                                                    </div>
                                                </div>
                                                <div className="row mt-2">
                                                    <div className="col-sm-3">
                                                        <h5>Task Hours :</h5>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <h5>{Taskhours}</h5>
                                                    </div>
                                                </div>
                                                <div className="row mt-2">
                                                    <div className="col-sm-3">
                                                        <h5>Due Date :</h5>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <h5>{convert(TaskDueDate)}</h5>
                                                    </div>
                                                </div>
                                                <div className="row mt-2">
                                                    <div className="col-sm-3">
                                                        <h5>Task Status :</h5>
                                                    </div>
                                                    {Taskstatus === 'Completed' ?
                                                        <div className="col-sm-4">
                                                        <h5>{Taskstatus}</h5> </div> : 
                                                        <>
                                                            <div className="col-sm-4">
                                                                <select className="custom-select" value={Taskstatus} onChange={(e) => {setTaskstatus(e.target.value); setshowUpdateButton(true)}}>
                                                                    <option value="In Complete">In Complete</option>
                                                                    <option value="Pending Review">Pending Review</option>
                                                                    <option value="On Hold">On Hold</option>
                                                                </select>
                                                            </div>
                                                            {showUpdateButton === true ? 
                                                            <div className="col-sm-4">
                                                                <button className="btn btn-primary" onClick={StatusUpdate}>Update</button>
                                                            </div> : null}
                                                        </>
                                                    }
                                                    
                                                </div>
                                                <div className="row mt-2">
                                                            <div className="col-sm-3">
                                                                <h5>Task Description :</h5>
                                                            </div>
                                                            <div className="col-sm-6">
                                                            {parse(TaskDescription)}
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
                                                                    <button className="btn btn-primary" onClick={TaskFileAdd}>
                                                                        Submit
                                                                    </button>
                                                                </div>
                                                                <div className="col-sm-1">
                                                                    <button className="btn btn-secondary ml-1" onClick={() => setFilesAddShow(false)}>Cancel</button>
                                                                </div>
                                                            </div>: null
                                                        }


                                                        <div className="row mt-2">
                                                            {TaskFiles && TaskFiles.map((data, index) => (
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
                                                                                            <div className="col-sm-1 pointer-change mr-2">
                                                                                                    <RiFileDownloadFill size={24} color="white" title="download" onClick={() => downloadFile(data.file)} />
                                                                                            </div>
                                                                                            {data.upload_by == userInfo.employee_id ? 
                                                                                                <>
                                                                                                <div className="col-sm-1 pointer-change">
                                                                                                    <RiFileEditFill size={24} color="white" title="Edit" onClick={() => {handleEditShow(); handleEditFile(data.file, data._id)}} />
                                                                                                </div>
                                                                                                <div className="col-sm-1 mr-2 pointer-change">
                                                                                                    <RiDeleteBin2Fill size={24} color="white" title="Delete" onClick={() => {handleDeleteShow(); handleDeleteFile(data.file, data._id)}} />
                                                                                                </div>
                                                                                                </> : null}
                                                                                            
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
                                                                                <button className="btn btn-danger btn-sm" onClick={DeleteTaskFile}>
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
                                                    <h4>Task Notes List</h4>
                                                    
                                                    {TasknoteAlert === true ?
                                                    <div className="mt-2 mb-1"> 
                                                        <div className="alert alert-success alert-dismissible">
                                                            <strong>Task Note Added!!</strong> Successfully.
                                                            <button type="button" className="close" data-dismiss="alert" onClick={() => setTasknoteAlert(false)}>X</button>
                                                        </div>
                                                    </div> : null }

                                                    {showTaskNotesEdit === true ?
                                                    <>
                                                    <p className="text-danger">{Error}</p>
                                                    <form onSubmit={handleSubmit(submitForm)} className="mb-5"> 
                                                        <div className="row mt-3 ml-auto mr-auto">
                                                            
                                                            <div className="col-sm-12">
                                                                <div className="bv-no-focus-ring">
                                                                                        <Editor
                                                                                            onInit={(evt, editor) => editorRef.current = editor}
                                                                                            initialValue="<p> </p>"
                                                                                            init={{
                                                                                            height: 200,
                                                                                            menubar: false,
                                                                                            plugins: [
                                                                                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                                                                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                                                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                                                                            ],
                                                                                            toolbar: 'undo redo | blocks | ' +
                                                                                                'bold italic forecolor | alignleft aligncenter ' +
                                                                                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                                                                                'removeformat | help',
                                                                                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                                                                            }}
                                                                                        />
                                                                                <p className="text-danger">{TaskNotError}</p>

                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                        <div className="row mt-3 ml-auto mr-auto justify-content-center">
                                                                <div className="col-sm-2">
                                                                    <button className="btn btn-primary btn-sm" type="submit">
                                                                        Submit
                                                                    </button>
                                                                </div>
                                                        </div>
                                                        
                                                    </form> </> : null}
                                                    
                                                    {TaskNoteData.map((data, index) => (
                                                       <div key={index}>
                                                               
                                                       <div className="d-flex flex-row mb-4  ml-auto mr-auto">
                                                       <div className="col-sm-3">
                                                           <div className="row">
                                                               <RiUserSmileFill size={40} color="black" className="mt-2" />
                                                           </div>
                                                           <div className="row text-center">
                                                               <p style={{fontSize: '13px', textAlign: 'center'}}>{data.added_by}</p>
                                                           </div>
                                                       </div>
                                                       <div className="p-3 ms-3 col-sm-6" style={{borderRadius: '15px' ,  backgroundColor: 'rgba(57, 192, 237,.2)'}}>
                                                           <h5>{parse(data.task_note)}</h5>
                                                           <h5 style={{fontSize: '11px'}}>{convert(data.updatedAt)} {new Date(data.updatedAt).toLocaleTimeString()}</h5>
                                                           {data.added_by === userInfo.firstName ? 
                                                           <div className="row ml-1" >
                                                           <h5 className="text-edit pointer-change" onClick={() => {handleShow() ; handleTaskNoteEdit(data.task_note, data._id)}}>Edit</h5> 
                                                           <h5 className="text-delete pointer-change ml-3" onClick={() => {handleDelShow(); handleTaskNoteDelete(data._id)}}>Delete</h5>
                                                           </div>
                                                           : null}
                                                       </div>
                                                       </div>
                                                    </div>
                                                    ))}
                                                    

                                                    {ShowloadMore === true ? 
                                                                <div className="divider pointer-change mb-4">
                                                                    <span></span>
                                                                    <span className="text-center mx-3 mb-0" style={{color: '#a2aab7'}} onClick={loadnext}>Load More</span>
                                                                    <span></span>
                                                                </div> : null}

                                                            <Modal show={showModal} onHide={handleClose} animation={false} size='xl'>
                                                                <Modal.Header closeButton>
                                                                <Modal.Title>Edit Note</Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                    <form onSubmit={handleSubmit(updateTaskNote)} className="ml-auto mr-auto">
                                                                        <Editor
                                                                                                    onInit={(evt, editor) => EditTaskNoteRef.current = editor}
                                                                                                    initialValue={Edit_TaskNot}
                                                                                                    init={{
                                                                                                    height: 150,
                                                                                                    menubar: false,
                                                                                                    plugins: [
                                                                                                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                                                                                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                                                                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                                                                                    ],
                                                                                                    toolbar: 'undo redo | blocks | ' +
                                                                                                        'bold italic forecolor | alignleft aligncenter ' +
                                                                                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                                                                                        'removeformat | help',
                                                                                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                                                                                    }}
                                                                        />
                                                                    <hr/>
                                                                    <div className="row d-flex justify-content-end mt-3">
                                                                    <div className="col-sm-3">
                                                                        <button className="btn btn-primary btn-sm" type="submit">
                                                                            Update
                                                                        </button>
                                                                    </div>
                                                                    <div className="col-sm-3">
                                                                        <button className="btn btn-secondary btn-sm" onClick={handleClose}>
                                                                            Cancel
                                                                        </button>
                                                                        </div>
                                                                    </div>

                                                                    </form>
                                                                </Modal.Body>
                                                            </Modal>

                                                            <Modal show={showDelModal} onHide={handleDelClose} animation={false} size='xl'>
                                                                <Modal.Header closeButton>
                                                                <Modal.Title>Do you want to Delete this Note ??</Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                            
                                                                    <div className="row d-flex justify-content-end mt-3">
                                                                    <div className="col-sm-3">
                                                                        <button className="btn btn-danger btn-sm" onClick={deleteTaskNote}>
                                                                            Delete
                                                                        </button>
                                                                    </div>
                                                                    <div className="col-sm-3">
                                                                        <button className="btn btn-secondary btn-sm" onClick={handleDelClose}>
                                                                            Cancel
                                                                        </button>
                                                                        </div>
                                                                    </div>

                                                                   
                                                                </Modal.Body>
                                                            </Modal>
                                                    
                                                    
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