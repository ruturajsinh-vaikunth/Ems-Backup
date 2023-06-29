import Sidebar from "./Sidebar";
import Unauthorized from "./Unauthorized";
import { useEffect, useState } from "react";
import LeavesService from "../services/LeavesService";
import UserService from "../services/UserService";
import DataTable from 'react-data-table-component';
import {ImCancelCircle} from 'react-icons/im';
import {BsEyeFill} from 'react-icons/bs';
import {FcApproval} from 'react-icons/fc';
import {FcCancel} from 'react-icons/fc';
import { NavLink, Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import {useDispatch } from 'react-redux'
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";

export default function Leaves(){

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


    const d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth();

    function convertnew(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day ].join("-");
    }

    function getDaysInCurrentMonth() {
        const date = new Date();
      
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
      }
      
    const lastDay = getDaysInCurrentMonth();

    const firstdayofmonth = new Date(year, month, 1)
    const lastdayofmonth = new Date(year, month, lastDay)

    let newfirstdayofmonth = convertnew(firstdayofmonth);
    let newlastdayofmonth = convertnew(lastdayofmonth);

    const [SaerchfromDate, setSaerchfromDate] = useState(newfirstdayofmonth)
    const [SearchtoDate, setSearchtoDate] = useState(newlastdayofmonth)

    const [Editemployeeid , setEditemployeeid] = useState("");
    const [Editid , setEditid] = useState("");
    const [Editdate , setEditdate] = useState("");
    const [Editleavetype , setEditleavetype] = useState("");
    const [Editduration , setEditduration] = useState("");
    const [Editstatus , setEditstatus] = useState("");
    const [Editfiles, setEditfiles] = useState([]);

    const [StatusChangedAlert, setStatusChangedAlert] = useState(false);
    const [AllUsers, setAllUsers] = useState([]);
    const [employee_id, setEmployeeId] = useState("")
    const [showdiv, setshowdiv] = useState(false)


    function getAllusers(){
        UserService.allUsers()
        .then(response => {
            setAllUsers(response.data);
        })
        .catch(e => {
            console.log(e);
        })
    }

    const AllEmployeeId = []
    for(let i=1; i< AllUsers.length; i++){
        AllEmployeeId.push({employee_id : AllUsers[i].employee_id, Name: AllUsers[i].firstName})
    }




    function searchbydateuser(){
        LeavesService.searchleaves(employee_id, SaerchfromDate, SearchtoDate)
        .then((response) => {
            setAllEmployeeLeaves(response.data);
            setshowdiv(true)
        })
        .catch((e) => {
            console.log(e);
        })
    }

    function convertAAA(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("-");
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
                        <NavLink to={`/leaves-attachment/${row._id}`} >
                            <BsEyeFill size={26} title="Leave Attachment" />
                        </NavLink>
                        <FcCancel size={26} className={'ml-2'}/>
                        </>) 
                    : (<>
                        {row.status === 'Approve' ? 
                            <>
                                <NavLink to={`/leaves-attachment/${row._id}`}>
                                    <BsEyeFill size={26} title="Leave Attachment" />
                                </NavLink>
                                <ImCancelCircle size={26} title="Reject Leave" className="ml-2 pointer-change" onClick={() => {handleRejectShow(); handleApproveChange(row._id, row.employee_id, row.date, row.leave_type, row.duration, row.status, row.files, row.from_date)}} />
                            </> : 
                            <>
                            {row.status === 'Reject' ? 
                                <>
                                    <NavLink  to={`/leaves-attachment/${row._id}`}>
                                        <BsEyeFill size={26} title="Leave Attachment" />
                                    </NavLink>
                                </> :
                                <>
                                    <NavLink  to={`/leaves-attachment/${row._id}`} >
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
                searchbydateuser();
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
                searchbydateuser();
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
        getAllusers()
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



    function DataupdatebyCurrentDate(){
        LeavesService.UpdatebyCurrentdates(DisplayDataofAllLeaves)
        .then((response) => {
            if(response.status === 200){
                searchbydateuser();
           }
        })
        .catch((e) => {
            console.log(e , "Not Found");
        })
    }

    function resetValues(){
        setshowdiv(false)
        setEmployeeId("")
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
                                                <h1>All Leaves</h1>
                                            </div>
                                            <div className="separator-breadcrumb border-top"></div>
                                        </div>
                                        <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                        <div className="card mb-30">
                                            <div className="card-body">
                                            <div className="row mt-2">
                                        <div className="col-sm-3">
                                            <label>Employee</label>
                                            <select className="custom-select" value={employee_id} onChange={(e) => setEmployeeId(e.target.value)} required>
                                                            <option value="">Select</option>
                                                            {AllEmployeeId.map((data,index) => (
                                                                <option key={index} value={data.employee_id}>{data.Name}({data.employee_id})</option>
                                                            ))}
                                                        </select>
                                        </div>
                                        <div className="col-sm-3">
                                            <label>From</label>
                                            <input className="form-control" type={'date'} id="fromdate" defaultValue={newfirstdayofmonth}  onChange={(e) => setSaerchfromDate(e.target.value)} /> 
                                        </div>
                                        <div className="col-sm-3">
                                            <label>To</label>
                                            <input className="input form-control" type={'date'} id="todate" defaultValue={newlastdayofmonth}  onChange={(e) => setSearchtoDate(e.target.value)} />
                                        </div>
                                        
                                        <div className="col-sm-3 mt-4">
                                        <button className="btn btn-sm btn-primary searchbtn" onClick={searchbydateuser} title="Search">Search</button>
                                                        <button className="btn btn-sm btn-secondary ml-3 resetbtn" onClick={resetValues} title="Reset">Reset</button>
                                        </div>     
                                    </div>
                                   
                                            </div>
                                        </div>
                                        </div>
                                        </div>
                                        {showdiv === true ?
                                        <div className="col-md-12 mt-3">
                                                <div className="card">
                                                    <div className="card-body">
                                                    {convertedAllEmployeeLeaves.length === 0 ? null : <button className="btn btn-primary mt-2" onClick={DataupdatebyCurrentDate}>Daily Status Updates</button>}
                                                                    {StatusChangedAlert === true ?
                                                                        <div  className="mt-2" style={{fontSize : '16px'}}> 
                                                                            <div className="alert alert-info alert-dismissible fade show">
                                                                                <strong>Updated!!</strong> Successfully.
                                                                                <button type="button" className="btn-close" data-dismiss="alert" onClick={() => setStatusChangedAlert(false)}></button>
                                                                            </div>
                                                                        </div> : null
                                                                    }
                                                                    <DataTable 
                                                                        columns={columns}
                                                                        data={convertedAllEmployeeLeaves}
                                                                        pagination
                                                                        paginationComponentOptions={paginationComponentOptions}
                                                                    />

                                                        <Modal show={showApproveModal} onHide={handleApproveClose} animation={false}>
                                                        <Modal.Header closeButton>
                                                        <Modal.Title>Do you want to Approve ?</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                        <h5 className="font-weight-bold">Employee Id: <Link to={`/employee-info/${Editemployeeid}`}  style={{textDecoration: 'none'}} className="pointer-change">{Editemployeeid}</Link></h5>
                                                        <h5 className="font-weight-bold">Date: {Editdate}</h5>
                                                        <h5 className="font-weight-bold">Type: {Editleavetype} </h5>
                                                        <h5 className="font-weight-bold">Duration: {Editduration === 1 ? "FullDay" : <div>{Editduration === 0.51 ? "SecondHalf" : "FirstHalf"}</div>}<br /></h5> <div className="vr ml-2 mr-2"></div>
                                                        <h5 className="font-weight-bold">Status: {Editstatus}</h5><br/>
                                                        {Editfiles.length !== 0 ? 
                                                            <>
                                                            <h5 className="font-weight-bold">Attachment(s):</h5>
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
                                                        <h5 className="font-weight-bold">Employee Id: <Link to={`/employee-info/${Editemployeeid}`}  style={{textDecoration: 'none'}} className="pointer-change">{Editemployeeid}</Link> </h5>
                                                        <h5 className="font-weight-bold">Date: {Editdate}</h5>
                                                        <h5 className="font-weight-bold">Type: {Editleavetype}</h5> 
                                                        <h5 className="font-weight-bold">Duration: {Editduration === 1 ? "Full Day" : <div>{Editduration === 0.51 ? "Second Half" : "First Half"}</div>}</h5>
                                                        <h5 className="font-weight-bold">Status: {Editstatus}</h5>
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
                                        </div> : null }
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