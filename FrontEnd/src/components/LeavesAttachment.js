import Sidebar from "./Sidebar";
import Unauthorized from "./Unauthorized";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {BiArrowBack} from 'react-icons/bi';
import LeavesService from "../services/LeavesService";
import DataTable from 'react-data-table-component';
import {useDispatch } from 'react-redux'
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function LeavesAttachment(){

    const _id = useParams();
    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);

    const dispatch = useDispatch()
    const navigate = useNavigate();
    
    const[LeavesFromEmpId, setLeavesFromEmpId] = useState([]);
    const[EmployeeId, setEmployeeId] = useState();
    const[date, setDate] = useState();
    const[LeaveType, setLeaveType] = useState();
    const[Status, setStatus] = useState();
    const[filestodisplay, setFiles] = useState([])
    const[from_date,setFromDate] = useState();

    function convert(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("-");
        }


    function LeavesbyId(){
        LeavesService.Leavesbyid(_id)
        .then((response) => {
           setEmployeeId(response.data.leaves.employee_id);
           setDate(convert(response.data.leaves.date))
           setLeaveType(response.data.leaves.leave_type)
           setStatus(response.data.leaves.status)
           setFiles(response.data.leaves.files)
           setFromDate(convert(response.data.leaves.from_date))

           LeavesService.LeavesbyEmp(response.data.leaves.employee_id)
            .then((response) => {
            setLeavesFromEmpId(response.data.leaves);
            })
            .catch((e) => {
                console.log(e , "Not Found");
            })
        })
        .catch((e) => {
            console.log(e , "Not Found");
        })
    }
    
        const parseJwt = (id) => {
            dispatch(refreshToken({_id : id}))
        };
    
    useEffect(() => {
        LeavesbyId();
        // LeavesbyEmpId();

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

    let PendingAttendance = 
        LeavesFromEmpId.filter(
            item => item.status && item.status.includes("Pending")
        );
    
    const convertedPendingAttendance = []
    for(let i=0; i<PendingAttendance.length; i++){
        convertedPendingAttendance.push({
                _id : PendingAttendance[i]._id,
                employee_id : PendingAttendance[i].employee_id,
                date : convert(PendingAttendance[i].date),
                from_date: convert(PendingAttendance[i].from_date),
                duration : PendingAttendance[i].duration,
                leave_type : PendingAttendance[i].leave_type,
                status : PendingAttendance[i].status,
                createdAt: convert(PendingAttendance[i].createdAt),
                updatedAt: convert(PendingAttendance[i].updatedAt),
        })
    }

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
            name: 'Applied Date',
            selector: row => row.createdAt
        },
        {
            name: 'Leave Type',
            selector: row => row.leave_type,
            sortable: true,
        },
        {
            name: 'Leave Duration',
            cell: row => (
                <>
                {row.duration === 1 ? <div>Full Day</div> : <div>{row.duration === 0.51 ? <div>Second Half</div> : <div>{!row.duration ? <div>Full day</div>: <div>First Half</div>}</div>}</div>}
                </>
            )
        },
        {
            name: 'Leave Date',
            selector: row => row.date,
            sortable: true,
            cell: row => (
                <>
                {row.date === 'aN-aN-NaN' ? <><span>{row.from_date}</span></> : <><span>{row.date}</span></>}
                </>
            )
        },
        {
            name: 'Status',
            selector: row => row.status,
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
                                      <div className="d-flex justify-content-between">
                                                    <div className=" p-2">
                                                        <h4><h4 className="fw-bolder breadcrumb">Attachment of &nbsp;<Link to={`/employee-info/${EmployeeId}`}  style={{textDecoration: 'none'}} className="pointer-change">{EmployeeId}</Link></h4> </h4>
                                                    </div>
                                                    <div className="p-1 mb-2">
                                                        <button className="btn round btn-icon rounded-circle m-1" title="Back" onClick={() => navigate(-1)}>
                                                            <BiArrowBack  size={30} />
                                                        </button>
                                                    </div>
                                        </div> 
                                      <div className="separator-breadcrumb border-top"></div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="container p-0 m-0">
                                                        
                                                        <div className="row">
                                                                
                                                                <div className="col-sm-4">
                                                                    <h5> Date: {date === 'aN-aN-NaN' ? <>{from_date}</> : <>{date}</>}</h5>
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    <h5> Type: {LeaveType}</h5>
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    <h5> Status: {Status}</h5>
                                                                </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-5">
                                                            {filestodisplay.length !== 0 ? 
                                                                <>
                                                                    <h4 className="mt-3">Attachment(s)</h4>
                                                                    {filestodisplay && filestodisplay.map((data,index) => (
                                                                        <div key={index}>
                                                                            <i className="i-Download mr-2"></i>
                                                                                <a href={`http://localhost:5000/public/images/${data.attachment}`} target="_blank" rel="noopener noreferrer">{data.attachment}</a>
                                                                        </div>
                                                                    ))}
                                                                </> : null}

                                                            </div>

                                                            </div>
                                                            <div className="row">
                                                                
                                                            <div className="col-sm-12">
                                                            <h4 className="mt-4">Other Leave(s)</h4>
                                                                <DataTable 
                                                                    columns={columns}
                                                                    data={convertedPendingAttendance}
                                                                    pagination
                                                                    paginationComponentOptions={paginationComponentOptions}
                                                                />
                                                            </div>
                                                            </div>
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