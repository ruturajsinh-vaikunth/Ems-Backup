import Sidebar from "./Sidebar";
import React , { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {useDispatch } from 'react-redux'
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
import {IoMdAdd} from 'react-icons/io'
import { Modal } from 'react-bootstrap'
import '../styles/css/index.d9965542.css'
import '../styles/css/chunk-2014a769.9731fe9b.css'
import DataTable from 'react-data-table-component';
import {MdOutlineAddTask} from 'react-icons/md';
import ProjectService from "../services/ProjectService";
import {NavLink } from "react-router-dom";
import Unauthorized from "./Unauthorized";

export default function ProjectsManager(){

    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);

    const dispatch = useDispatch()
    const { handleSubmit } = useForm()
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [title, settitle] = useState("")
    const [description, setdescription] = useState("")
    const [titleError, settitleError] = useState("")
    const [descError, setdescError] = useState("")
    const [Error, setError] = useState("")

    const [AddTaskAlert, setAddTaskAlert] = useState(false)
    const [ProjectData, setProjectData] = useState([])

    const parseJwt = (id) => {
        dispatch(refreshToken({_id : id}))
        
    };


    function getAllProjects(){
        ProjectService.findAllHolidays()
        .then(response => {
            const Data = response.data;
            const ManagerData = Data.filter(
                item => item.assign_to && item.assign_to.includes(userInfo.employee_id)          
            )
            setProjectData(ManagerData)
        })
        .catch(e => {
            console.log(e);
        })
    }

    

    useEffect(() => {
        getAllProjects();
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
        if(!title || /^\s*$/.test(title) ){
            settitleError('Please Enter Title')
            return
        }else{
            settitleError("")
        }

        if(!description || /^\s*$/.test(description)){
            setdescError("Please Enter description")
            return
        }else{
            setdescError("")
        }

        ProjectService.addNewProject(title, description, userInfo.employee_id)
        .then((response) => {
            if(response.status === 200){
                handleClose();
                setAddTaskAlert(true)
                settitle("")
                setdescription("")
                getAllProjects()
            }
        })
        .catch((e) => {
            setError(e)
        })
    }


    function convert(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear() ].join("-");
    }



    const columns = [
        {
            name: 'Date',
            selector: row => convert(row.createdAt)
        },
        {
            name: 'Title',
            selector: row => row.title,
            
        },
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true,
        },
        {
            name: 'Action',
            cell: row => (
                <>
                <NavLink to={`/task/${row._id}`}>
                    <MdOutlineAddTask size={26} title="task" />
                </NavLink>
                </>)
        }
    ]

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
                                                        <h1>Tasks</h1>
                                                    </div>
                                                    <div className="p-1 mb-2">
                                                        <button className="btn btn-primary m-1" title="Add Expenses" onClick={handleShow}>
                                                            <IoMdAdd  size={30} className="mr-1" />Task
                                                        </button>
                                                    </div>
                                            </div> 
                                            <div className="separator-breadcrumb border-top"></div>
                                        </div>

                                        <Modal show={showModal} onHide={handleClose} animation={false}>
                                            <Modal.Header closeButton>
                                                <Modal.Title> Add new Task</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <p className="text-danger">{Error}</p>
                                                <form onSubmit={handleSubmit(submitForm)}>
                                                                                        
                                                                                        <div className="row ml-auto mr-auto">
                                                                                                <div className="col-sm-4">
                                                                                                    <h6 className="mb-0">Title</h6>
                                                                                                </div>
                                                                                                <div className="col-sm-6">
                                                                                                    <input type='text' className='form-control' value={title} onChange={(e) => settitle(e.target.value)} required/>
                                                                                                    <span className="text-danger">{titleError}</span>
                                                                                                </div>
                                                                                        </div>

                                                                                        <div className="row mt-3 ml-auto mr-auto">
                                                                                                <div className="col-sm-4">
                                                                                                    <h6 className="mb-0">Description</h6>
                                                                                                </div>
                                                                                                <div className="col-sm-6">
                                                                                                    <textarea className='form-control' value={description} onChange={(e) => setdescription(e.target.value)} required/>
                                                                                                    <span className="text-danger">{descError}</span>
                                                                                                </div>
                                                                                        </div>
                                                                                            <hr/>
                                                                                            <div className="row d-flex justify-content-end">
                                                                                                <div className="col-sm-3">
                                                                                                    <button className="btn btn-primary btn-sm" type="submit">
                                                                                                        Submit
                                                                                                    </button>
                                                                                                </div>
                                                                                            <div className="col-sm-3">
                                                                                                <button className="btn btn-secondary ml-2" onClick={handleClose}>Cancel</button>
                                                                                            </div>
                                                                                            </div>
                                                                        
                                                                    </form>
                                                                </Modal.Body>
                                        </Modal>


                                        {AddTaskAlert === true ?
                                            <div className="mt-2 mb-1"> 
                                                <div className="alert alert-success alert-dismissible">
                                                    <strong>Task Added!!</strong> Successfully.
                                                    <button type="button" className="close" data-dismiss="alert" onClick={() => setAddTaskAlert(false)}>X</button>
                                                </div>
                                            </div> : null }


                                        
                                        <div className="row mt-3">
                                            <div className="col-sm-12 col-md-12 col-lg-12">
                                            <div className="card mb-30">
                                                <div className="card-body">
                                                                    <DataTable 
                                                                        columns={columns}
                                                                        data={ProjectData}
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
            <Unauthorized/>
        )
    }
}