import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Unauthorized from "./Unauthorized";
import LeavesService from "../services/LeavesService";
import DataTable from 'react-data-table-component';
import {ImCancelCircle} from 'react-icons/im';
import {BsEyeFill} from 'react-icons/bs';
import {BiArrowBack} from 'react-icons/bi';
import {FcApproval} from 'react-icons/fc';
import {FcCancel} from 'react-icons/fc';
import { NavLink, Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import {useDispatch } from 'react-redux'
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";

export default function UserOnLeave(){

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);
    const [AllEmployeeLeaves, setAllEmployeeLeaves] = useState([])

    const [showApproveModal, setApproveShow] = useState(false);
    const handleApproveShow = () => setApproveShow(true);
    const handleApproveClose = () => setApproveShow(false);

    const [showRejectModal, setRejectShow] = useState(false);
    const handleRejectShow = () => setRejectShow(true);
    const handleRejectClose = () => setRejectShow(false);

    const [Editemployeeid , setEditemployeeid] = useState("");
    const [Editid , setEditid] = useState("");
    const [Editdate , setEditdate] = useState("");
    const [Editleavetype , setEditleavetype] = useState("");
    const [Editduration , setEditduration] = useState("");
    const [Editstatus , setEditstatus] = useState("");
    const [Editfiles, setEditfiles] = useState([]);

    const [StatusChangedAlert, setStatusChangedAlert] = useState(false);

    function TodayLeaves(){

        function convertAAA(str) {
            var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
            return [date.getFullYear() , mnth, day ].join("-");
        }

        const Dateoftoday = new Date(new Date().setDate(new Date().getDate()));
        const today = convertAAA(Dateoftoday)

        LeavesService.findTodayLeaves(today)
        .then((response) => {
            setAllEmployeeLeaves(response.data);
        })
        .catch((e) => {
            console.log(e , "Not Found");
        })
    }

    const convertedAllEmployeeLeaves = []
    for(let i=0; i<AllEmployeeLeaves.length;i++){
        convertedAllEmployeeLeaves.push({
                _id : AllEmployeeLeaves[i]._id,
                employee_id : AllEmployeeLeaves[i].employee_id,
                date : convertAAA(AllEmployeeLeaves[i].date),
                duration : AllEmployeeLeaves[i].duration,
                leave_type : AllEmployeeLeaves[i].leave_type,
                status : AllEmployeeLeaves[i].status,
                files: AllEmployeeLeaves[i].files,
                createdAt: convertAAA(AllEmployeeLeaves[i].createdAt),
                updatedAt: convertAAA(AllEmployeeLeaves[i].updatedAt),
                from_date: convertAAA(AllEmployeeLeaves[i].from_date)
        })
    }

    function convertAAA(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("-");
        }

    const DisplayDataofAllLeaves = []

    for(let i=0; i<AllEmployeeLeaves.length;i++){
        var x = convertedAllEmployeeLeaves[i].date;
        var a = x.split('-');
        var dateSplit = new Date (a[2], a[1] - 1,a[0]);
        var Today = new Date();
        if (dateSplit > Today || convertedAllEmployeeLeaves[i].status === 'Cancel' || convertedAllEmployeeLeaves[i].status === 'Canceled' || convertedAllEmployeeLeaves[i].status === 'Approve' || convertedAllEmployeeLeaves[i].status === 'Reject'){
            DisplayDataofAllLeaves.push({
                _id : convertedAllEmployeeLeaves[i]._id,
                employee_id : convertedAllEmployeeLeaves[i].employee_id,
                date :  convertedAllEmployeeLeaves[i].date,
                duration : convertedAllEmployeeLeaves[i].duration,
                leave_type : convertedAllEmployeeLeaves[i].leave_type,
                status : convertedAllEmployeeLeaves[i].status,
                createdAt: convertedAllEmployeeLeaves[i].createdAt,
                updatedAt: convertedAllEmployeeLeaves[i].updatedAt,
            })

        }
        else{
            DisplayDataofAllLeaves.push({
                _id : convertedAllEmployeeLeaves[i]._id,
                employee_id : convertedAllEmployeeLeaves[i].employee_id,
                date : convertedAllEmployeeLeaves[i].date,
                duration : convertedAllEmployeeLeaves[i].duration,
                leave_type : convertedAllEmployeeLeaves[i].leave_type,
                status : "Taken",
                createdAt: convertedAllEmployeeLeaves[i].createdAt,
                updatedAt: convertedAllEmployeeLeaves[i].updatedAt,
            })
        }
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
                {row.duration === 1 ? <div>Full Day</div> : <div>{row.duration === 0.51 ? <div>Second Half</div> : <div>First Half</div>}</div>}
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
        },
        {
            name: 'Action',
            cell: row => (
                <>{row.status === 'Cancel Request' || row.status === 'Canceled'
                    ? (<>
                        <NavLink  to={`/leaves-attachment/${row._id}`} state={{ _id : row._id, employee_id : row.employee_id, date: row.date, type: row.leave_type, files: row.files,from_date: row.from_date}}>
                            <BsEyeFill size={26} title="Leave Attachment" />
                        </NavLink>
                        <FcCancel size={26} className={'ml-2'}/>
                        </>) 
                    : (<>
                        {row.status === 'Approve' ? 
                            <>
                                <NavLink  to={`/leaves-attachment/${row._id}`} state={{ _id : row._id, employee_id : row.employee_id, date: row.date, type: row.leave_type, files: row.files, from_date: row.from_date}}>
                                    <BsEyeFill size={26} title="Leave Attachment" />
                                </NavLink>
                                <ImCancelCircle size={26} title="Reject Leave" className="ml-2 pointer-change" onClick={() => {handleRejectShow(); handleApproveChange(row._id, row.employee_id, row.date, row.leave_type, row.duration, row.status, row.files, row.from_date)}} />
                            </> : 
                            <>
                            {row.status === 'Reject' ? 
                                <>
                                    <NavLink to={`/leaves-attachment/${row._id}`} state={{ _id : row._id, employee_id : row.employee_id, date: row.date, type: row.leave_type, files: row.files, from_date: row.from_date}}>
                                        <BsEyeFill size={26} title="Leave Attachment" />
                                    </NavLink>
                                </> :
                                <>
                                    <NavLink  to={`/leaves-attachment/${row._id}`} state={{ _id : row._id, employee_id : row.employee_id, date: row.date, type: row.leave_type, files: row.files, from_date: row.from_date}}>
                                        <BsEyeFill size={26} title="Leave Attachment" />
                                    </NavLink>
                                    <FcApproval size={26} className="ml-2 pointer-change" title="Approve Leave"  onClick={() => {handleApproveShow(); handleApproveChange( row._id, row.employee_id, row.date, row.leave_type, row.duration, row.status, row.files, row.from_date)}}/>
                                    <ImCancelCircle size={26} className="ml-2 pointer-change" title="Reject Leave" onClick={() => {handleRejectShow(); handleApproveChange(row._id, row.employee_id, row.date, row.leave_type, row.duration, row.status, row.files, row.from_date)}} />
                                </>
                            }
                            </>
                        }
                        </>)

                    }
                </>
            )
        }
    ]

    function handleApproveChange(_id, employee_id, date, leave_type, duration, status, files , from_date){
        setEditemployeeid(employee_id);
        setEditid(_id);
        if(date === 'aN-aN-NaN'){
            setEditdate(from_date);
        }
        else{
            setEditdate(date)
        }
        setEditleavetype(leave_type);
        setEditduration(duration);
        setEditstatus(status);
        setEditfiles(files)
    }


    function approveLeave(){
        LeavesService.ApprovalLeave({_id : Editid, status : "Approve"})
        .then(response => {
            if(response.status === 200){
                handleApproveClose();
                TodayLeaves();
                setStatusChangedAlert(true);
           }
        })
        .catch(e => {
            console.log(e);
        })
    }
     
    function rejectLeave(){
        LeavesService.ApprovalLeave({_id : Editid, status : "Reject"})
        .then(response => {
           if(response.status === 200){
                handleRejectClose();
                TodayLeaves();
                setStatusChangedAlert(true);
           }
        })
        .catch(e => {
            console.log(e);
        })
    }

    const paginationComponentOptions = {
        selectAllRowsItem: true,
        selectAllRowsItemText: "ALL"
      };

    const parseJwt = (id) => {
        dispatch(refreshToken({_id : id}))
    };
        

    useEffect(() => {
        TodayLeaves();
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
                                                        <div className="breadcrumb">
                                                            <h4 className="fw-bolder mt-1">Employee On Leave Today</h4>
                                                        </div>
                                                        
                                                        <div>
                                                            <button className="btn round  btn-icon rounded-circle m-1 mb-2" title="Back" onClick={() => navigate(-1)}>
                                                                <BiArrowBack  size={30} />
                                                            </button>
                                                        </div>
                                                    </div>
                                            <div className="separator-breadcrumb border-top"></div>
                                        </div>
                                        <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <div className="card mb-30">
                                                <div className="card-body">
                                                    
                                                        {StatusChangedAlert === true ?
                                                            <div className="mt-2" style={{fontSize : '16px'}}> 
                                                                <div className="alert alert-dismissible alert-success">
                                                                    <strong>Updated!!</strong> Successfully.
                                                                    <button type="button" className="close" data-dismiss="alert" onClick={() => setStatusChangedAlert(false)}>X</button>
                                                                </div>
                                                            </div> : null
                                                        }
                                                        <DataTable 
                                                            columns={columns}
                                                            data={convertedAllEmployeeLeaves}
                                                            pagination
                                                            paginationComponentOptions={paginationComponentOptions}
                                                        />
        
                                                    </div>
                                            </div>

                                            <Modal show={showApproveModal} onHide={handleApproveClose} animation={false}>
                                            <Modal.Header closeButton>
                                            <Modal.Title>Do you want to Approve ?</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                            <span className="font-weight-bold">Employee Id:</span><Link to={`/employee-info/${Editemployeeid}`}  style={{textDecoration: 'none'}} className="pointer-change">{Editemployeeid}</Link><div className="vr ml-2 mr-2"></div>
                                            <span className="font-weight-bold">Date:</span>{Editdate} <br/>
                                            <span className="font-weight-bold">Type:</span>{Editleavetype} <br />
                                            <span><p className="font-weight-bold">Duration: </p> {Editduration === 1 ? <div>Full Day</div> : <div>{Editduration === 0.51 ? <div>Second Half</div> : <div>First Half</div>}</div>}<br /></span> <div className="vr ml-2 mr-2"></div>
                                            <span className="font-weight-bold">Status:</span>{Editstatus}<br/>
                                            {Editfiles.length !== 0 ? 
                                                <>
                                                <span className="font-weight-bold">Attachment(s):</span>
                                                        {Editfiles && Editfiles.map((data,index) => (
                                                                <div key={index}>
                                                                    <i className="fas fa-arrow-circle-down mr-2"></i>
                                                                        <a href={`http://localhost:5000/public/images/${data.attachment}`} target="_blank" rel="noopener noreferrer">{data.attachment}</a>
                                                                </div>
                                                            ))}
                                                </> : null
                                            }
                                            <hr/>
                                                <div className="row d-flex justify-content-end">
                                                    <div className="col-sm-3">
                                                        <button className="btn btn-primary btn-sm" onClick={approveLeave}>
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

                                            <Modal show={showRejectModal} onHide={handleRejectClose} animation={false}>
                                            <Modal.Header closeButton>
                                            <Modal.Title>Do you want to Reject ?</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                            <span className="font-weight-bold">Employee Id:</span><Link to={`/employee-info/${Editemployeeid}`}  style={{textDecoration: 'none'}} className="pointer-change">{Editemployeeid}</Link> <div className="vr ml-2 mr-2"></div>
                                            <span className="font-weight-bold">Date:</span>{Editdate} <br/>
                                            <span className="font-weight-bold">Type:</span>{Editleavetype} <br/>
                                            <span><p className="font-weight-bold">Duration: </p> {Editduration === 1 ? <div>Full Day</div> : <div>{Editduration === 0.51 ? <div>Second Half</div> : <div>First Half</div>}</div>}<br /></span> <div className="vr ml-2 mr-2"></div>
                                            <span className="font-weight-bold">Status:</span>{Editstatus}
                                            <hr/>
                                                <div className="row d-flex justify-content-end">
                                                    <div className="col-sm-3">
                                                        <button className="btn btn-danger btn-sm" onClick={rejectLeave}>
                                                            Reject
                                                        </button>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <button className="btn btn-secondary btn-sm" onClick={handleRejectClose}>
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            </Modal.Body>
                                            </Modal>
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