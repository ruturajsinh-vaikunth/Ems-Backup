import Sidebar from "./Sidebar";
import React, { useEffect, useState} from "react";
import Unauthorized from "./Unauthorized";
import { Link } from 'react-router-dom';
import {useDispatch } from 'react-redux'
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
import TicketService from "../services/TicketService";
import DataTable from 'react-data-table-component';
import {GrNotes} from 'react-icons/gr'

export default function Tickets(){

    const dispatch = useDispatch()
    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);

    const [TicketDatas, setTicketDatas] = useState([])


    const parseJwt = (id) => {
        dispatch(refreshToken({_id : id}))
        
    };

    function convert(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear() ].join("-");
    }

    function DataTickets(){
        TicketService.AllTickets()
        .then((response) => {
            setTicketDatas(response.data)
        })
        .catch((e) => {
            console.log(e);
        })
    }


    useEffect(() => {
        DataTickets();

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

    const columns = [
        {
            name: 'Employee Id',
            selector: row => row.employee_id,
            sortable: true,
            cell: row =>(
                <>
                <Link to={`/employee-info/${row.employee_id}`}  style={{textDecoration: 'none'}} className="pointer-change">
                    {row.employee_id}
                </Link>
                </>
            )      
        },
        {
            name: 'Created Date',
            selector: row => convert(row.createdAt),
            sortable: true      
        },
        {
            name: 'Category',
            selector: row => row.category,
            sortable: true            
        },
        {
            name: 'Assign To',
            selector: row => row.Assign_to,
            sortable: true            
        },
        // {
        //     name: 'Comment',
        //     selector: row => row.comment,
        //     sortable: true            
        // },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true            
        },
        {
            name: 'Action',
            cell: row => (
                 <>
                <Link to={`/ticket-chat/${row._id}`}  style={{textDecoration: 'none'}} className="pointer-change">
                    <GrNotes size={24} color="black"  title="Conversation"/>
                </Link>
                </>
                
            )
        }
    ]

    const paginationComponentOptions = {
        selectAllRowsItem: true,
        selectAllRowsItemText: "ALL"
      };


    if(userInfo.account_type === "Admin" || userInfo.account_type === "Manager"){
        return(
            <div>
                    <Sidebar/>
                    <div className="app-admin-wrap layout-sidebar-large clearfix">
                        <main>
                            <div className="main-content-wrap d-flex flex-column flex-grow-1 sidenav-open">
                                    <div className="main-content">
                                        <div>
                                            <div className="breadcrumb">
                                                <h1>Tickets</h1>
                                            </div>
                                            <div className="separator-breadcrumb border-top"></div>
                                        </div>
                                        <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <div className="card mb-30">
                                                <div className="card-body">
                                                    {/* <div className="d-flex justify-content-between">
                                                        <div className="mr-auto p-1">
                                                            <h5 className="fw-bolder">Tickets</h5>
                                                        </div>
                                                        
                                                    </div> */}

                                                    <DataTable 
                                                                columns={columns}
                                                                data={TicketDatas}
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