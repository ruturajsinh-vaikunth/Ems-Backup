import Sidebar from "./Sidebar";
import Unauthorized from "./Unauthorized";
import { useEffect, useState } from "react";
import LeavesService from "../services/LeavesService";
import DataTable from 'react-data-table-component';
import {ImCancelCircle} from 'react-icons/im';
import {BsFillCheckCircleFill} from 'react-icons/bs';
import { Link } from 'react-router-dom';
import {useDispatch } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";


export default function CancelRequests(){

    const dispatch = useDispatch()  
    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);
   
    const [AllEmployeeLeaves, setAllEmployeeLeaves] = useState([])
    const [ApproveCancelRequestAlert, setApproveCancelRequestAlert] = useState(false)
    const [RejectCancelRequestAlert, setRejectCancelRequestAlert] = useState(false)

    const [showApproveModal, setApproveShow] = useState(false);
    const handleApproveShow = () => setApproveShow(true);
    const handleApproveClose = () => setApproveShow(false);

    const [showCancelModal, setCancelShow] = useState(false);
    const handleCancelShow = () => setCancelShow(true);
    const handleCancelClose = () => setCancelShow(false);

    const [id, setId] = useState("")
    const [employee_id, setEmployeeid] = useState("")
    const [AppliedDate, setAppliedDate] = useState("")
    const [LeaveType, setLeaveType] = useState("")
    const [LeaveDate, setDate] = useState("")
    const [Status, setStatus] = useState("")

    function AllLeaves(){
        LeavesService.findAllLeaves()
        .then((response) => {
            setAllEmployeeLeaves(response.data);
        })
        .catch((e) => {
            console.log(e , "Not Found");
        })
    }

    const TotalCancelRequest = AllEmployeeLeaves.filter(
        item => item.status && item.status.includes("Cancel Request")
    )

    function convert(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear() ].join("-");
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
            selector: row => convert(row.createdAt)
        },
        {
            name: 'Leave Type',
            selector: row => row.leave_type,
            sortable: true,
        },
        {
            name: 'Leave Duration',
            selector: row => row.duration,
            cell: row => (
                <>
                {row.duration === 1 ? <div>Full Day</div> : <div>{row.duration === 0.51 ? <div>Second Half</div> : <div>{!row.duration ? <div>Full day</div>: <div>First Half</div>}</div>}</div>}
                </>
            )
        },
        {
            name: 'Leave Date',
            selector: row => convert(row.date),
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
        },
        {
            name: 'Action',
            cell: row => (
                <>{row.status === 'Canceled'
                    ? (<>   
                        <p>Already Canceled</p>
                        </>) 
                    : (<>
                        <BsFillCheckCircleFill className="pointer-change" color="green" size={26} onClick={() => {handleApproveShow(); handleCancelChange(row._id,row.employee_id, convert(row.createdAt), row.leave_type, row.duration , convert(row.date), row.status)}}/>
                        <ImCancelCircle className="pointer-change ml-3" color="red"size={26} onClick={() => {handleCancelShow(); handleCancelChange(row._id, row.employee_id, convert(row.createdAt), row.leave_type, row.duration , convert(row.date), row.status)}}/>  
                        </>)

                    }
                </>
            )
        }
    ]

    const paginationComponentOptions = {
        selectAllRowsItem: true,
        selectAllRowsItemText: "ALL"
    };

    const parseJwt = (id) => {
         dispatch(refreshToken({_id : id}))
    };

    function handleCancelChange(id,employee_id, createdAt, leave_type, duration , date, status){
        setId(id)
        setEmployeeid(employee_id)
        setAppliedDate(createdAt)
        setLeaveType(leave_type)
        setDate(date)
        setStatus(status)
    }

    useEffect(() => {
        AllLeaves();
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

    function approveCancelRequest(){
        LeavesService.ApprovalOfCancelLeaveRequest({_id : id, status : "Canceled"})
        .then((response) => {
            if(response.status === 200){
                setApproveCancelRequestAlert(true);
                handleApproveClose()
                AllLeaves();
            }
        })
        .catch((e) => {
            console.log(e , "Not Found");
        })
    }

    function rejectCancelRequest(){
        LeavesService.ApprovalOfCancelLeaveRequest({_id : id, status : "Taken"})
        .then((response) => {
            if(response.status === 200){
                setRejectCancelRequestAlert(true);
                handleCancelClose()
                AllLeaves();
            }
        })
        .catch((e) => {
            console.log(e , "Not Found");
        })
    }

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
                                                <h1>Leave Cancel Request(s)</h1>
                                            </div>
                                            <div className="separator-breadcrumb border-top"></div>
                                        </div>
                                        <div className="col-md-12 mt-3">
                                        {ApproveCancelRequestAlert === true ?
                                                    <div style={{fontSize : '16px'}}> 
                                                        <div className="alert alert-dismissible alert-success">
                                                            <strong>Approve Cancel Request!!</strong> Successfully.
                                                            <button type="button" className="close" data-dismiss="alert" onClick={() => setApproveCancelRequestAlert(false)}>X</button>
                                                        </div>
                                                    </div> : null
                                        }
                                        {RejectCancelRequestAlert === true ?
                                                    <div style={{fontSize : '16px'}}> 
                                                        <div className="alert alert-dismissible alert-danger">
                                                            <strong>Reject Cancel Request!!</strong> Successfully.
                                                            <button type="button" className="close" data-dismiss="alert" onClick={() => setRejectCancelRequestAlert(false)}>X</button>
                                                        </div>
                                                    </div> : null
                                            }
                                        </div>
                                            <div className="col-md-12 mt-3">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <DataTable 
                                                                columns={columns}
                                                                data={TotalCancelRequest}
                                                                pagination
                                                                paginationComponentOptions={paginationComponentOptions}
                                                            />
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                    <Modal show={showApproveModal} onHide={handleApproveClose} animation={false}>
                                    <Modal.Header closeButton>
                                    <Modal.Title>Do you want to Approve Request?</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                    <h5 className="font-weight-bold">Employee Id:
                                    <Link to={`/employee-info/${employee_id}`}  style={{textDecoration: 'none'}} className="pointer-change">{employee_id} </Link></h5><br/>
                                    <h5 className="font-weight-bold">Date: {LeaveDate}</h5><br/>
                                    <h5 className="font-weight-bold">Applied Date: {AppliedDate}</h5><br/>
                                    <h5 className="font-weight-bold">Status: {Status}</h5><br/>
                                    <h5 className="font-weight-bold">Type: {LeaveType}</h5>
                                    <hr/>
                                        <div className="row d-flex justify-content-end">
                                            <div className="col-sm-3">
                                                <button className="btn btn-primary btn-sm" onClick={approveCancelRequest}>
                                                    Approve
                                                </button>
                                            </div>
                                            <div className="col-sm-3">
                                                <button className="btn btn-secondary btn-sm" onClick={handleApproveClose}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </Modal.Body>
                                    </Modal>

                                    <Modal show={showCancelModal} onHide={handleCancelClose} animation={false}>
                                    <Modal.Header closeButton>
                                    <Modal.Title>Do you want to Reject Request?</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                    
                                    <h5 className="font-weight-bold">Employee Id: <Link to={`/employee-info/${employee_id}`}  style={{textDecoration: 'none'}} className="pointer-change">{employee_id} </Link></h5><br/>
                                    <h5 className="font-weight-bold">Date: {LeaveDate}</h5> <br/>
                                    <h5 className="font-weight-bold">Applied Date: {AppliedDate}</h5><br/>
                                    <h5 className="font-weight-bold">Status: {Status}</h5><br/>
                                    <h5 className="font-weight-bold">Type: {LeaveType}</h5>
                                    <hr/>
                                        <div className="row d-flex justify-content-end">
                                            <div className="col-sm-3">
                                                <button className="btn btn-danger btn-sm" onClick={rejectCancelRequest}>
                                                    Reject
                                                </button>
                                            </div>
                                            <div className="col-sm-3">
                                                <button className="btn btn-secondary btn-sm" onClick={handleCancelClose}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </Modal.Body>
                                    </Modal>
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