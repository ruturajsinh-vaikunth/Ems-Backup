import Sidebar from "./Sidebar";
import React , { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useParams , useNavigate } from "react-router-dom";
import {useDispatch } from 'react-redux'
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
import '../styles/css/index.d9965542.css'
import '../styles/css/chunk-2014a769.9731fe9b.css'
import UserService from "../services/UserService";
import ProjectService from "../services/ProjectService";
import { Editor } from '@tinymce/tinymce-react';
import {BiArrowBack} from 'react-icons/bi';
import Unauthorized from "./Unauthorized";

export default function UpdateProject(){

    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);

    const _id = useParams()._id;

    const editorRef = useRef(null);
    const navigate = useNavigate();

    const dispatch = useDispatch()
    const { handleSubmit } = useForm()
    
    const [project_name, setprojectname] = useState("")
    const [hours, sethours] = useState("")
    const [titleError, settitleError] = useState("")
    const [hoursError, sethoursError] =  useState("")
    const [assign_to, setassignto] = useState("")
    const [description, setdescription] = useState("")
    const [status, setstatus] = useState("")
    const [Error, setError] = useState("")

    const [AddProjectAlert, setAddProjectAlert] = useState(false)
    const [ManagerData, setManagerData] = useState([])

    const parseJwt = (id) => {
        dispatch(refreshToken({_id : id}))
        
    };

    function findProjectDetails(){
        ProjectService.findProjectbyId(_id)
        .then((res) => {
             setprojectname(res.data.project_name)
             sethours(res.data.hours)
             setassignto(res.data.assign_to)
             setdescription(res.data.description)
             setstatus(res.data.status)
        })
        .catch((e) => {
            console.log(e);
        })
    }

    function getAllusers(){
        UserService.allUsers()
        .then(response => {
            const Data = response.data

            const ManagerData = Data.filter(
                item => item.account_type && item.account_type.includes("Manager")
            )

                const Final_Manager_Data = []

                for(let i=0; i< ManagerData.length; i++){
                    Final_Manager_Data.push({employee_id : ManagerData[i].employee_id, Name: ManagerData[i].firstName})
                }

                setManagerData(Final_Manager_Data)
        })
        .catch(e => {
            console.log(e);
        })
    }

    useEffect(() => {
        findProjectDetails();
        getAllusers();
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
        if(!project_name || /^\s*$/.test(project_name) ){
            window.scroll(0,0)
            settitleError('Please Enter Project Name')
            return
        }else{
            settitleError("")
        }
        if(hours === '0'){
            sethoursError("Please Enter Hours")
            return
        }else{
            sethoursError("");
        }


        ProjectService.updateProject(_id, project_name, editorRef.current.getContent() , hours, assign_to, status)
        .then((response) => {
            if(response.status === 200){
                setAddProjectAlert(true)
                window.scroll(0,0)
                findProjectDetails()
            }
        })
        .catch((e) => {
            setError(e)
        })
    }



    if(userInfo.account_type === "Admin"){
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
                                                        <h1>Edit Project</h1>
                                                    </div>
                                                    <div className="p-2">
                                                        <button className="btn round  btn-icon rounded-circle m-1 mb-2" title="Back" onClick={() => navigate(-1)}>
                                                            <BiArrowBack  size={24} className="pointer-change" />    
                                                        </button>
                                                    </div>
                                            </div> 
                                            <div className="separator-breadcrumb border-top"></div>
                                        </div>

                                        


                                        {AddProjectAlert === true ?
                                            <div className="mt-2 mb-1"> 
                                                <div className="alert alert-success alert-dismissible">
                                                    <strong>Project Updated!!</strong> Successfully.
                                                    <button type="button" className="close" data-dismiss="alert" onClick={() => setAddProjectAlert(false)}>X</button>
                                                </div>
                                            </div> : null }


                                        
                                        <div className="row mt-3">
                                            <div className="col-sm-12 col-md-12 col-lg-12">
                                                <p className="text-danger">{Error}</p>
                                                <form onSubmit={handleSubmit(submitForm)}>
                                                                                        
                                                                                        <div className="row ml-auto mr-auto">
                                                                                                <div className="col-sm-3">
                                                                                                    <h6 className="mb-0">Project Name</h6>
                                                                                                </div>
                                                                                                <div className="col-sm-9">
                                                                                                    <input type='text' className='form-control' value={project_name} onChange={(e) => setprojectname(e.target.value)} required/>
                                                                                                    <span className="text-danger">{titleError}</span>
                                                                                                </div>
                                                                                        </div>

                                                                                        <div className="row mt-3 ml-auto mr-auto">
                                                                                                <div className="col-sm-3">
                                                                                                    <h6 className="mb-0">Description</h6>
                                                                                                </div>
                                                                                                <div className="col-sm-9">
                                                                                                <div className="bv-no-focus-ring">
                                                                                                <Editor
                                                                                                    onInit={(evt, editor) => editorRef.current = editor}
                                                                                                    initialValue={description}
                                                                                                    init={{
                                                                                                    height: 300,
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
                                                                                                </div>
                                                                                                </div>
                                                                                        </div>
                                                                                        

                                                                                        <div className="row mt-3 ml-auto mr-auto">
                                                                                                <div className="col-sm-3">
                                                                                                    <h6 className="mb-0">Hours</h6>
                                                                                                </div>
                                                                                                <div className="col-sm-9">
                                                                                                    <input type='number' className='form-control' value={hours} onChange={(e) => sethours(e.target.value)} required/>
                                                                                                    <span className="text-danger">{hoursError}</span>
                                                                                                </div>
                                                                                        </div>
                                                                                        <div className="row mt-3 ml-auto mr-auto">
                                                                                                <div className="col-sm-3">
                                                                                                    <h6 className="mb-0">Assign To</h6>
                                                                                                </div>
                                                                                                <div className="col-sm-9">
                                                                                                    <select className="custom-select" value={assign_to} onChange={(e) => setassignto(e.target.value)} required>
                                                                                                        <option value="">Select</option>
                                                                                                        {ManagerData && ManagerData.map((data, index) => (
                                                                                                            <option value={data.employee_id} key={index}>{data.Name}{`(${data.employee_id})`}</option>
                                                                                                        ))}
                                                                                                    </select>
                                                                                                </div>
                                                                                        </div>
                                                                                        <div className="row mt-3 ml-auto mr-auto">
                                                                                                <div className="col-sm-3">
                                                                                                    <h6 className="mb-0">Status</h6>
                                                                                                </div>
                                                                                                <div className="col-sm-9">
                                                                                                    <select className="custom-select" value={status} onChange={(e) => setstatus(e.target.value)} required>
                                                                                                        <option value="">Select</option>
                                                                                                        <option value="In Complete">In Complete</option>
                                                                                                        <option value="Completed">Completed</option>
                                                                                                    </select>
                                                                                                </div>
                                                                                        </div>
                                                                                    
                                                                                        
                                                                                           
                                                                                            <hr/>
                                                                                            <div className="row d-flex justify-content-end">
                                                                                                <div className="col-sm-2">
                                                                                                    <button className="btn btn-primary btn-sm" type="submit">
                                                                                                        Submit
                                                                                                    </button>
                                                                                                </div>
                                                                                                <div className="col-sm-2">
                                                                                                    <button className="btn btn-secondary ml-2" type="cancel" onClick={() => navigate(-1)}>Cancel</button>
                                                                                                </div>
                                                                                            </div>
                                                                        
                                                </form>
                                            </div>
                                        </div>

                                    </div>
                            </div>
                        </main>
                    </div>
                    
                </div>
            )
    }   
    if(userInfo.account_type === "Manager"){
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
                                                        <h1>Edit Project</h1>
                                                    </div>
                                                    <div className="p-2">
                                                        <button className="btn round  btn-icon rounded-circle m-1 mb-2" title="Back" onClick={() => navigate(-1)}>
                                                            <BiArrowBack  size={24} className="pointer-change" />    
                                                        </button>
                                                    </div>
                                            </div> 
                                            <div className="separator-breadcrumb border-top"></div>
                                        </div>

                                        


                                        {AddProjectAlert === true ?
                                            <div className="mt-2 mb-1"> 
                                                <div className="alert alert-success alert-dismissible">
                                                    <strong>Project Updated!!</strong> Successfully.
                                                    <button type="button" className="close" data-dismiss="alert" onClick={() => setAddProjectAlert(false)}>X</button>
                                                </div>
                                            </div> : null }


                                        
                                        <div className="row mt-3">
                                            <div className="col-sm-12 col-md-12 col-lg-12">
                                                <p className="text-danger">{Error}</p>
                                                <form onSubmit={handleSubmit(submitForm)}>
                                                                                        
                                                                                        <div className="row ml-auto mr-auto">
                                                                                                <div className="col-sm-3">
                                                                                                    <h6 className="mb-0">Project Name</h6>
                                                                                                </div>
                                                                                                <div className="col-sm-9">
                                                                                                    <input type='text' className='form-control' value={project_name} onChange={(e) => setprojectname(e.target.value)} required/>
                                                                                                    <span className="text-danger">{titleError}</span>
                                                                                                </div>
                                                                                        </div>

                                                                                        <div className="row mt-3 ml-auto mr-auto">
                                                                                                <div className="col-sm-3">
                                                                                                    <h6 className="mb-0">Description</h6>
                                                                                                </div>
                                                                                                <div className="col-sm-9">
                                                                                                <div className="bv-no-focus-ring">
                                                                                                <Editor
                                                                                                    onInit={(evt, editor) => editorRef.current = editor}
                                                                                                    initialValue={description}
                                                                                                    init={{
                                                                                                    height: 300,
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
                                                                                                </div>
                                                                                                </div>
                                                                                        </div>
                                                                                        

                                                                                        <div className="row mt-3 ml-auto mr-auto">
                                                                                                <div className="col-sm-3">
                                                                                                    <h6 className="mb-0">Hours</h6>
                                                                                                </div>
                                                                                                <div className="col-sm-9">
                                                                                                    <input type='number' className='form-control' value={hours} onChange={(e) => sethours(e.target.value)} required/>
                                                                                                    <span className="text-danger">{hoursError}</span>
                                                                                                </div>
                                                                                        </div>
                                                                                        <div className="row mt-3 ml-auto mr-auto">
                                                                                                <div className="col-sm-3">
                                                                                                    <h6 className="mb-0">Status</h6>
                                                                                                </div>
                                                                                                <div className="col-sm-9">
                                                                                                    <select className="custom-select" value={status} onChange={(e) => setstatus(e.target.value)} required>
                                                                                                        <option value="">Select</option>
                                                                                                        <option value="In Complete">In Complete</option>
                                                                                                        <option value="Completed">Completed</option>
                                                                                                    </select>
                                                                                                </div>
                                                                                        </div>

                                                                                            <hr/>
                                                                                            <div className="row d-flex justify-content-end">
                                                                                                <div className="col-sm-2">
                                                                                                    <button className="btn btn-primary btn-sm" type="submit">
                                                                                                        Submit
                                                                                                    </button>
                                                                                                </div>
                                                                                                <div className="col-sm-2">
                                                                                                    <button className="btn btn-secondary ml-2" type="cancel" onClick={() => navigate(-1)}>Cancel</button>
                                                                                                </div>
                                                                                            </div>
                                                                        
                                                </form>
                                            </div>
                                        </div>

                                    </div>
                            </div>
                        </main>
                    </div>
                    
                </div>
            )
    }
    if(userInfo.account_type === "Employee"){
        return(
            <Unauthorized/>
        )
    }
}