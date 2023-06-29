import Sidebar from "./Sidebar";
import React , { useEffect, useState } from "react";
import {NavLink } from "react-router-dom";
import {useDispatch } from 'react-redux'
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
import {IoMdAdd} from 'react-icons/io'
import '../styles/css/index.d9965542.css'
import '../styles/css/chunk-2014a769.9731fe9b.css'
import DataTable from 'react-data-table-component';
import {MdOutlineAddTask} from 'react-icons/md';
import ProjectService from "../services/ProjectService";
import Unauthorized from "./Unauthorized";
import {AiOutlineEye} from 'react-icons/ai';
import {TbEditCircle} from 'react-icons/tb'

export default function ProjectsManager(){

    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);

    const dispatch = useDispatch()
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



    function convert(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear() ].join("-");
    }



    const columns = [
        {
            name: 'Project Name',
            selector: row => row.project_name,
            
        },
        {
            name: 'Created By',
            selector: row => row.created_by,
            sortable: true,
        },
        {
            name: 'Created Date',
            selector: row => convert(row.createdAt)
        },
        {
            name: 'Action',
            cell: row => (
                <>
                <NavLink to={`/add-task/${row._id}`}>
                    <MdOutlineAddTask size={26} title="Add task" />
                </NavLink>
                <NavLink to={`/project-details/${row._id}`}>
                    <AiOutlineEye size={26} className="ml-2" title="Project Details" />
                </NavLink>
                <NavLink to={`/project-update/${row._id}`}>
                    <TbEditCircle size={24} className="ml-2" title="Edit" />
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
                                                        <h1>Projects</h1>
                                                    </div>
                                                    <div className="p-1 mb-2">
                                                    <NavLink to={'/add-project'}>
                                                        <button className="btn btn-primary m-1" title="Add Project">
                                                            <IoMdAdd  size={30} className="mr-1" />Project
                                                        </button>
                                                    </NavLink>
                                                    </div>
                                            </div> 
                                            <div className="separator-breadcrumb border-top"></div>
                                        </div>

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