import Sidebar from "./Sidebar";
import React , { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import http from '../http-common';
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

export default function AddProject(){

    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);

    const editorRef = useRef(null);
    const navigate = useNavigate();

    const dispatch = useDispatch()
    const { handleSubmit } = useForm()
    
    const [project_name, setprojectname] = useState("")
    const [hours, sethours] = useState("")
    const [titleError, settitleError] = useState("")
    const [hoursError, sethoursError] =  useState("")
    const [assign_to, setassignto] = useState("")
    const [Error, setError] = useState("")

    const [AddProjectAlert, setAddProjectAlert] = useState(false)
    const [ManagerData, setManagerData] = useState([])
    const [Projectfiles, setProjectfiles] = useState(null);

    const parseJwt = (id) => {
        dispatch(refreshToken({_id : id}))
        
    };

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

    function imageChange(e) {

        const chosenFiles = Array.prototype.slice.call(e.target.files)
        setProjectfiles(chosenFiles);
    
    }


    const submitForm = async () => {
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
        
        if(files.length === 0){
            ProjectService.addNewProject(project_name, editorRef.current.getContent() , hours, assign_to, userInfo.account_type)
            .then((response) => {
                if(response.status === 200){
                    setAddProjectAlert(true)
                    window.scroll(0,0)
                    setprojectname("")
                    sethours("")
                    setassignto("")
                    if (editorRef.current) {
                    editorRef.current.setContent("<p> </p>")
                    }
                }
            })
            .catch((e) => {
                setError(e)
            })
        }
        else{
            const userToken = localStorage.getItem('userToken')
    
            const formData = new FormData();
    
            function getRandomFileName() {
                var timestamp = new Date().toISOString().replace(/[-:.]/g,"");  
                var random = ("" + Math.random()).substring(2, 8); 
                var random_number = timestamp+random;  
                return random_number;
            }

            formData.append('project_name',project_name)
            formData.append('description',editorRef.current.getContent())
            formData.append('hours',hours)
            formData.append('assign_to',assign_to)
            formData.append('created_by',userInfo.account_type)
            formData.append('upload_by', userInfo.account_type)
    
            // eslint-disable-next-line
            files.map((file) => {
                formData.append('file', file, getRandomFileName())
            })

            const resp = await http.post(`/project/add-project`, formData, {
                headers: {
                  "content-type": "multipart/form-data",
                  'Authorization': `Bearer ${userToken}`,
                },
              });
            
    
              if(resp.data.msg === "Added"){
                setAddProjectAlert(true)
                window.scroll(0,0)
                setprojectname("")
                sethours("")
                setassignto("")
                if (editorRef.current) {
                    editorRef.current.setContent("<p> </p>")
                }
              }

        }
    }


    const files = Projectfiles ? [...Projectfiles] : [];


    function reset(){
        setprojectname("")
                sethours("")
                setassignto("")
                if (editorRef.current) {
                    (editorRef.current.setContent("<p> </p>"))
                }
    }

    const submitManagerForm = async () => {
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

        if(files.length === 0){
            ProjectService.addNewProject(project_name, editorRef.current.getContent() , hours, userInfo.employee_id, userInfo.firstName)
            .then((response) => {
                if(response.status === 200){
                    setAddProjectAlert(true)
                    window.scroll(0,0)
                    setprojectname("")
                    sethours("")
                    setassignto("")
                    if (editorRef.current) {
                        editorRef.current.setContent("<p> </p>")
                    }
                }
            })
            .catch((e) => {
                setError(e)
            })
        }else{
            const userToken = localStorage.getItem('userToken')
    
            const formData = new FormData();
    
            function getRandomFileName() {
                var timestamp = new Date().toISOString().replace(/[-:.]/g,"");  
                var random = ("" + Math.random()).substring(2, 8); 
                var random_number = timestamp+random;  
                return random_number;
            }

            formData.append('project_name',project_name)
            formData.append('description',editorRef.current.getContent())
            formData.append('hours',hours)
            formData.append('assign_to',userInfo.employee_id)
            formData.append('created_by',userInfo.firstName)
            formData.append('upload_by', userInfo.employee_id)
    
            // eslint-disable-next-line
            files.map((file) => {
                formData.append('file', file, getRandomFileName())
            })

            const resp = await http.post(`/project/add-project`, formData, {
                headers: {
                  "content-type": "multipart/form-data",
                  'Authorization': `Bearer ${userToken}`,
                },
              });
            
    
              if(resp.data.msg === "Added"){
                setAddProjectAlert(true)
                window.scroll(0,0)
                setprojectname("")
                sethours("")
                setassignto("")
                if (editorRef.current) {
                    editorRef.current.setContent("<p> </p>")
                }
              }

        }
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
                                                        <h1>Add New Project</h1>
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
                                                    <strong>Project Added!!</strong> Successfully.
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
                                                                                                    initialValue="<p> </p>"
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
                                                                                                    <h6 className="mb-0">Files</h6>
                                                                                                </div>
                                                                                                <div className="col-sm-9">
                                                                                                    <input type="file" className="form-control" onChange={imageChange} multiple />
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
                                                                                                <button className="btn btn-secondary ml-2" type="reset" onClick={reset}>Reset</button>
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
                                                        <h1>Add New Project</h1>
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
                                                    <strong>Project Added!!</strong> Successfully.
                                                    <button type="button" className="close" data-dismiss="alert" onClick={() => setAddProjectAlert(false)}>X</button>
                                                </div>
                                            </div> : null }


                                        
                                        <div className="row mt-3">
                                            <div className="col-sm-12 col-md-12 col-lg-12">
                                                <p className="text-danger">{Error}</p>
                                                <form onSubmit={handleSubmit(submitManagerForm)}>
                                                                                        
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
                                                                                                    initialValue="<p> </p>"
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
                                                                                                    <h6 className="mb-0">Files</h6>
                                                                                                </div>
                                                                                                <div className="col-sm-9">
                                                                                                    <input type="file" id="uploadFiles" className="form-control" onChange={imageChange} multiple />
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
                                                                                                    <button className="btn btn-secondary ml-2"type="reset" onClick={reset}>Reset</button>
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