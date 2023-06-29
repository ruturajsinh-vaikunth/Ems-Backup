import Sidebar from "./Sidebar";
import React , { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import http from '../http-common';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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

export default function AddTask(){

    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);
    const project_id = useParams()._id;

    const editorRef = useRef(null);
    const noteRef = useRef(null)
    const navigate = useNavigate();

    const dispatch = useDispatch()
    const { handleSubmit } = useForm()
    
    const [task_name, settaskname] = useState("")
    const [task_hours, sethours] = useState("")
    const [titleError, settitleError] = useState("")
    const [hoursError, sethoursError] =  useState("")
    const [due_date, setduedate] = useState("")
    const [assign_to, setassignto] = useState("")
    const [Error, setError] = useState("")

    const [AddTaskAlert, setAddTaskAlert] = useState(false)
    const [EmployeeData, setEmployeeData] = useState([])
    const [Taskfiles, setTaskfiles] = useState(null);

    const parseJwt = (id) => {
        dispatch(refreshToken({_id : id}))
        
    };

    function getAllusers(){
        UserService.allUsers()
        .then(response => {
            const Data = response.data

            const Employee_Data = Data.filter(
                item => !item.account_type.includes("Manager")
            )

                const Final_Employee_Data = []

                for(let i=1; i< Employee_Data.length; i++){
                    Final_Employee_Data.push({employee_id : Employee_Data[i].employee_id, Name: Employee_Data[i].firstName})
                }

                setEmployeeData(Final_Employee_Data)
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


    var todayDate = new Date().toISOString().slice(0, 10);

    function imageChange(e) {

        const chosenFiles = Array.prototype.slice.call(e.target.files)
        setTaskfiles(chosenFiles);
    
    }
    
    const submitForm = async () => {
        if(!task_name || /^\s*$/.test(task_name) ){
            window.scroll(0,0)
            settitleError('Please Enter Task Name')
            return
        }else{
            settitleError("")
        }
        if(task_hours === '0'){
            window.scroll(90,300)
            sethoursError("Please Enter Hours")
            return
        }else{
            sethoursError("");
        }

        if(files.length === 0){
            ProjectService.addNewTask(task_name, editorRef.current.getContent() , task_hours,  noteRef.current.getContent(), due_date, assign_to, userInfo.firstName, project_id)
            .then((response) => {
                if(response.status === 200){
                    setAddTaskAlert(true)
                    window.scroll(0,0)
                    settaskname("")
                    sethours("")
                    setassignto("")
                    setduedate("")
                    if (editorRef.current) {
                    editorRef.current.setContent("<p> </p>")
                    }
                    if (noteRef.current) {
                        noteRef.current.setContent("<p> </p>")
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

            formData.append('task_name',task_name)
            formData.append('description',editorRef.current.getContent())
            formData.append('task_hours',task_hours)
            formData.append('task_note',noteRef.current.getContent())
            formData.append('due_date',due_date)
            formData.append('assign_to', assign_to)
            formData.append('assign_by',userInfo.firstName)
            formData.append('project_id', project_id)

            if(userInfo.account_type === "Admin"){
                formData.append('upload_by', userInfo.account_type)
            }else{
                formData.append('upload_by', userInfo.employee_id)
            }
    
            // eslint-disable-next-line
            files.map((file) => {
                formData.append('file', file, getRandomFileName())
            })

            const resp = await http.post(`/project/add-task`, formData, {
                headers: {
                  "content-type": "multipart/form-data",
                  'Authorization': `Bearer ${userToken}`,
                },
              });
            
    
              if(resp.data.msg === "Added"){
                    setAddTaskAlert(true)
                    window.scroll(0,0)
                    settaskname("")
                    sethours("")
                    setassignto("")
                    setduedate("")
                    if (editorRef.current) {
                    editorRef.current.setContent("<p> </p>")
                    }
                    if (noteRef.current) {
                        noteRef.current.setContent("<p> </p>")
                    }
              }

        }
        
    }

    const files = Taskfiles ? [...Taskfiles] : [];

    function reset(){
        settaskname("")
                sethours("")
                setassignto("")
                setduedate("")
                if (editorRef.current) {
                    editorRef.current.setContent("<p> </p>")
                }
                if (noteRef.current) {
                    noteRef.current.setContent("<p> </p>")
                }
    }


    if(userInfo.account_type === "Manager" || userInfo.account_type === "Admin"){
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
                                                        <h1>Add New Task</h1>
                                                    </div>
                                                    <div className="p-2">
                                                        <button className="btn round  btn-icon rounded-circle m-1 mb-2" title="Back" onClick={() => navigate(-1)}>
                                                            <BiArrowBack  size={24} className="pointer-change" />    
                                                        </button>
                                                    </div>
                                            </div> 
                                            <div className="separator-breadcrumb border-top"></div>
                                        </div>

                                        


                                        {AddTaskAlert === true ?
                                            <div className="mt-2 mb-1"> 
                                                <div className="alert alert-success alert-dismissible">
                                                    <strong>Task Added!!</strong> Successfully.
                                                    <button type="button" className="close" data-dismiss="alert" onClick={() => setAddTaskAlert(false)}>X</button>
                                                </div>
                                            </div> : null }


                                        
                                        <div className="row mt-3">
                                            <div className="col-sm-12 col-md-12 col-lg-12">
                                                <p className="text-danger">{Error}</p>
                                                <form onSubmit={handleSubmit(submitForm)}>
                                                                                        
                                                                                        <div className="row ml-auto mr-auto">
                                                                                                <div className="col-sm-3">
                                                                                                    <h6 className="mb-0">Task Name</h6>
                                                                                                </div>
                                                                                                <div className="col-sm-9">
                                                                                                    <input type='text' className='form-control' value={task_name} onChange={(e) => settaskname(e.target.value)} required/>
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
                                                                                                    <h6 className="mb-0">Task Hours</h6>
                                                                                                </div>
                                                                                                <div className="col-sm-9">
                                                                                                    <input type='number' className='form-control' value={task_hours} onChange={(e) => sethours(e.target.value)} required/>
                                                                                                    <span className="text-danger">{hoursError}</span>
                                                                                                </div>
                                                                                        </div>

                                                                                        <div className="row mt-3 ml-auto mr-auto">
                                                                                                <div className="col-sm-3">
                                                                                                    <h6 className="mb-0">task Note</h6>
                                                                                                </div>
                                                                                                <div className="col-sm-9">
                                                                                                <div className="bv-no-focus-ring">
                                                                                                <Editor
                                                                                                    onInit={(evt, editor) => noteRef.current = editor}
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
                                                                                                    <h6 className="mb-0">Task Due Date</h6>
                                                                                                </div>
                                                                                                <div className="col-sm-9">
                                                                                                    <input type='date' className='form-control' value={due_date} onChange={(e) => setduedate(e.target.value)} min={todayDate} required/>
                                                                                                </div>
                                                                                        </div>

                                                                                        <div className="row mt-3 ml-auto mr-auto">
                                                                                                <div className="col-sm-3">
                                                                                                    <h6 className="mb-0">Task Assign To</h6>
                                                                                                </div>
                                                                                                <div className="col-sm-9">
                                                                                                    <select className='custom-select' value={assign_to} onChange={(e) => setassignto(e.target.value)} required >
                                                                                                     
                                                                                                        <option value="">Select</option>
                                                                                                            {EmployeeData.map((data,index) => (
                                                                                                                <option key={index} value={data.employee_id}>{data.Name}({data.employee_id})</option>
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
    else{
        return(
           <Unauthorized/>
        )
    }
}