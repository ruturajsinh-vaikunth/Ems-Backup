import Sidebar from "./Sidebar";
import React , { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
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

export default function UpdateTask(){

    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);
    const _id = useParams()._id;

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
    const [Description, setDescription] = useState("")
    const [TaskNote, setTaskNote] = useState("")
    const [assign_to, setassignto] = useState("")
    const [Error, setError] = useState("")

    const [AddTaskAlert, setAddTaskAlert] = useState(false)
    const [EmployeeData, setEmployeeData] = useState([])

    var todayDate = new Date().toISOString().slice(0, 10);


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

    function convertYYMMDD(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear() , mnth, day ].join("-");
    }

    function taskInfoById(){
        ProjectService.findTaskbyTaskId(_id)
        .then((response) => {
            settaskname(response.data.task_name)
            sethours(response.data.task_hours)
            setassignto(response.data.assign_to)
            setduedate(convertYYMMDD(response.data.due_date))
            setDescription(response.data.description)
            setTaskNote(response.data.task_note)
        })
        .catch((e) => {
            console.log(e);
        })
    }
    

    useEffect(() => {
        getAllusers();
        taskInfoById()
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



    
    function submitUpdateForm(){
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


        ProjectService.updateTask(task_name, editorRef.current.getContent() , task_hours,  noteRef.current.getContent(), due_date, assign_to, userInfo.firstName, _id)
        .then((response) => {
            if(response.status === 200){
                setAddTaskAlert(true)
                window.scroll(0,0)
                taskInfoById()
            }
        })
        .catch((e) => {
            setError(e)
        })
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
                                                        <h1>Update Task</h1>
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
                                                    <strong>Task Updated!!</strong> Successfully.
                                                    <button type="button" className="close" data-dismiss="alert" onClick={() => setAddTaskAlert(false)}>X</button>
                                                </div>
                                            </div> : null }


                                        
                                        <div className="row mt-3">
                                            <div className="col-sm-12 col-md-12 col-lg-12">
                                                <p className="text-danger">{Error}</p>
                                                <form onSubmit={handleSubmit(submitUpdateForm)}>
                                                                                        
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
                                                                                                    initialValue={Description}
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
                                                                                                    initialValue={TaskNote}
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

                                                                                            <hr/>
                                                                                            <div className="row d-flex justify-content-end">
                                                                                                <div className="col-sm-2">
                                                                                                    <button className="btn btn-primary btn-sm" type="submit">
                                                                                                        Update
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
    else{
        return(
            <Unauthorized/>
        )
    }
}