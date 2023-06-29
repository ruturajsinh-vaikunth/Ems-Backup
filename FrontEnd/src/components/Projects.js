import Sidebar from "./Sidebar";
import React , { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import {useDispatch } from 'react-redux'
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
import '../styles/css/index.d9965542.css'
import '../styles/css/chunk-2014a769.9731fe9b.css'
import DataTable from 'react-data-table-component';
import ProjectService from "../services/ProjectService";
import Unauthorized from "./Unauthorized";
import {NavLink } from "react-router-dom";
import {IoMdAdd} from 'react-icons/io'

export default function Projects(){

    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);

    const dispatch = useDispatch()
    const [TaskData, setTaskData] = useState([])
    const [InCompleteStatus, setInCompleteStatus] = useState(0)
    const [OnHoldStatus, setOnHoldStatus] = useState(0)
    const [PendingReviewStatus, setPendingReviewStatus] = useState(0)
    const [CompletedStatus, setCompletedStatus] = useState(0)


    const parseJwt = (id) => {
        dispatch(refreshToken({_id : id}))
        
    };



    function findTasks(){
        ProjectService.findTaskbyEmpId(userInfo.employee_id)
        .then(response => {

            const Data = response.data

            const Taskdatas = Data.filter(
                item => item.assign_to && item.assign_to.includes(`${userInfo.employee_id}`)
            )

            setTaskData(Taskdatas);

            const InCompleteStatus = Taskdatas.filter(
                item => item.status && item.status.includes("In Complete")
            )
            const PendingReviewStatus = Taskdatas.filter(
                item => item.status && item.status.includes("Pending Review")
            )
            const OnHoldStatus = Taskdatas.filter(
                item => item.status && item.status.includes("On Hold")
            )
            
            const CompletedStatus = Taskdatas.filter(
                item => item.status && item.status.includes("Completed")
            )
            
            setInCompleteStatus(InCompleteStatus.length)
            setPendingReviewStatus(PendingReviewStatus.length)
            setOnHoldStatus(OnHoldStatus.length)
            setCompletedStatus(CompletedStatus.length)
        })
        .catch(e => {
            console.log(e);
        })
    }

    

    useEffect(() => {
        findTasks();
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

    const paginationComponentOptions = {
        selectAllRowsItem: true,
        selectAllRowsItemText: "ALL"
      };



    const columns = [
        {
            name: 'Project Name',
            selector: row => row.ProjectData.project_name,
            cell: row => (
                <Link to={`/project-details/${row.project_id}`}  style={{textDecoration: 'none'}} className="pointer-change">
                    {row.ProjectData.project_name}
                </Link>
            )
            
        },
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
            name: 'Task Status',
            selector: row => row.status,
            
        }
    ]

    if(userInfo.account_type === "Employee"){
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
                                                        <h1>Projects</h1>
                                                    </div>
                                                    
                                                    <div className="p-1 mb-2">
                                                    <NavLink to={'/add-task-employee'}>
                                                        <button className="btn btn-primary m-1" title="Add Project">
                                                            <IoMdAdd  size={30} className="mr-1" />Task
                                                        </button>
                                                    </NavLink>
                                                    </div>
                                            </div> 
                                            <div className="separator-breadcrumb border-top"></div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-sm-12 col-md-12 col-lg-12">
                                            <div className="row mb-3">
                                                                <div className="col-sm-3">
                                                                    <div className="card shadow">
                                                                        <div className="card-body">
                                                                            <div className="font-weight-bold">
                                                                            In Complete
                                                                            </div>
                                                                            <span className="text-card"> 
                                                                            {InCompleteStatus}</span>
                                                                        </div>
                                                                        </div>
                                                                    
                                                                </div>
                                                                <div className="col-sm-3">
                                                                    <div className="card shadow">
                                                                        <div className="card-body">
                                                                            <div className="font-weight-bold">
                                                                                On Hold
                                                                            </div>
                                                                            <span className="text-card">{OnHoldStatus}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-3">
                                                                    <div className="card shadow">
                                                                        <div className="card-body">
                                                                            <div className="font-weight-bold">
                                                                                Pending Review
                                                                            </div>
                                                                            <span className="text-card">{PendingReviewStatus}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-3">
                                                                    <div className="card shadow">
                                                                        <div className="card-body">
                                                                            <div className="font-weight-bold">
                                                                                Completed
                                                                            </div>
                                                                            <span className="text-card">{CompletedStatus}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            
                                                            </div>
                                            <div className="card mb-30">
                                                <div className="card-body">
                                                                    <DataTable 
                                                                        columns={columns}
                                                                        data={TaskData}
                                                                        pagination
                                                                        paginationComponentOptions={paginationComponentOptions}
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