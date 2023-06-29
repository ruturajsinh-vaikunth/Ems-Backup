import Sidebar from "./Sidebar";
import React from "react";
import Unauthorized from "./Unauthorized";
import DataTable from 'react-data-table-component';
import  { useEffect, useState } from "react";
import AttendanceService from "../services/AttendanceService";
import { Modal } from 'react-bootstrap'
import { Link  } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { GrFormView } from 'react-icons/gr';
import {BsFillCheckCircleFill} from 'react-icons/bs';
import {ImCancelCircle} from 'react-icons/im';
import {useDispatch } from 'react-redux'
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
import {BiArrowBack} from 'react-icons/bi'

export default function UserPresent(){

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);
    
    const [AllAttendance, setAllAttendance] = useState([]);
    const [filterText, setFilterText] = React.useState('');
    

    const [showApproveModal, setApproveShow] = useState(false);
    const handleApproveShow = () => setApproveShow(true);
    const handleApproveClose = () => setApproveShow(false);

    const [showRejectModal, setRejectShow] = useState(false);
    const handleRejectShow = () => setRejectShow(true);
    const handleRejectClose = () => setRejectShow(false);

    const [Editemployeeid , setEditemployeeid] = useState("");
    const [Editid , setEditid] = useState("");
    const [Editdate , setEditdate] = useState("");
    const [Editintime , setEditintime] = useState("");
    const [Editouttime , setEditouttime] = useState("");
    const [Editstatus , setEditstatus] = useState("");
    const [Edittype , setEdittype] = useState("");
    const [Editcomment, setEditcomment] = useState("")
    const [reason, setreason] = useState("");


    const [StatusChangedAlert, setStatusChangedAlert] = useState(false);

    function attendanceOfToday(){

        function convertAAA(str) {
            var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
            return [date.getFullYear() , mnth, day ].join("-");
        }

        const Dateoftoday = new Date(new Date().setDate(new Date().getDate()));
        const today = convertAAA(Dateoftoday)

        AttendanceService.TodayAttendance(today)
        .then(response => {
            setAllAttendance(response.data);
        })
        .catch(e => {
            console.log(e);
        })
    }

    function convert(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear() ].join("-");
    }


    const newdata = [];
    let length = AllAttendance.length;
    for(let i = 0; i < length; i++){
        newdata.push({
            breakEndTime : AllAttendance[i].breakEndTime,
            breakStartTime : AllAttendance[i].breakStartTime,
            comment : AllAttendance[i].comment,
            date : convert(AllAttendance[i].date),
            duration :AllAttendance[i].duration,
            employee_id : AllAttendance[i].employee_id,
            firstname : AllAttendance[i].firstname,
            in_time: AllAttendance[i].in_time,
            out_time: AllAttendance[i].out_time,
            status: AllAttendance[i].status,
            type: AllAttendance[i].type,
            _id: AllAttendance[i]._id });
    }

    const parseJwt = (id) => {
        dispatch(refreshToken({_id : id}))
        
    };

    useEffect(() => {
        attendanceOfToday();
        
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

    function timeConvert (time) {
        // Check correct time format and split into components
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
      
        if (time.length > 1) { // If time format correct
          time = time.slice (1);  // Remove full string match value
          time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
          time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join (''); // return adjusted time or original string
      }


    const columns = [
        {
            name: 'Employee Id',
            selector: row => row.employee_id,
            sortable: true,
            cell: row => (
                <Link to={`/employee-info/${row.employee_id}`}  style={{textDecoration: 'none'}} className="pointer-change">
                    {row.employee_id}
                </Link>
            )
        },
        {
            name: 'Name',
            selector: row => row.firstname,
            sortable: true,
        },
        {
            name: 'Date',
            selector: row => row.date,
            sortable: true,
        },
        {
            name: 'In Time',
            selector: row => timeConvert(row.in_time),
        },
        {
            name: 'Out Time',
            selector: row => timeConvert(row.out_time),
        },
        {
            name: 'Status',
            selector: row => row.status,
        },
        {
            name: 'Type',
            selector: row => row.type,
        },
        {
            name: 'Action',
            cell: row => (
                <>
                <Link to={`/attendance-info/${row._id}`} className="pointer-change" title="View Attendance Info">
                    <GrFormView size={26} />
                </Link>
                {row.status === "Pending" ?
                        <>
                        <BsFillCheckCircleFill size={26} className="ml-2 pointer-change" onClick={() => {handleApproveShow(); handleApproveChange(row.employee_id, row._id, row.date, timeConvert(row.in_time), timeConvert(row.out_time), row.status, row.type, row.comment)}} title="Approve"/>
                        
                        <ImCancelCircle className="ml-2 pointer-change" size={26} onClick={() => {handleRejectShow(); handleApproveChange(row.employee_id, row._id, row.date, timeConvert(row.in_time), timeConvert(row.out_time), row.status, row.type, row.comment)}} title="Reject" /> 
                        
                        </>
                :
                null
                }
                
                
                </>
            ),
        },

    ]
   

    function handleApproveChange(employee_id, _id,date, in_time, out_time, status, type, comment){
        setEditemployeeid(employee_id);
        setEditid(_id);
        setEditdate(date);
        setEditintime(in_time);
        setEditouttime(out_time);
        setEditstatus(status);
        setEdittype(type);
        setEditcomment(comment);
    }

    function ApproveAttendance(){
        AttendanceService.approveAttendance({_id : Editid, status : "Approve", statusChangeby: userInfo.firstName})
        .then(response => {
            if(response.status === 200){
                handleApproveClose();
                attendanceOfToday();
                setStatusChangedAlert(true);
           }
        })
        .catch(e => {
            console.log(e);
        })
    }

    function RejectAttendance(){
        AttendanceService.rejectAttendance({_id : Editid, status : "Reject", reason: reason, statusChangeby: userInfo.firstName})
        .then(response => {
            if(response.status === 200){
                handleRejectClose();
                attendanceOfToday();
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

    function findInValues(arr, value) {
        value = String(value).toLowerCase();
        return arr.filter(o =>
        Object.entries(o).some(entry =>
            String(entry[1]).toLowerCase().includes(value)
        )
        );
    }
  
    const filteredItems = findInValues(newdata,  filterText);

    const FilterComponent = ({ filterText, onFilter, onClear }) => (
        <>
            <input
                id="search"
                type="text"
                placeholder="Search..."
                aria-label="Search Input"
                value={filterText}
                onChange={onFilter}
                autoFocus="autoFocus"
                className="form-control"
            />
        </>
    );

    const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
        if(filterText){
            setFilterText('');
        }
    };
    return (
        <div className="row">
            <div className="col-sm-12">
                <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
            </div>
        </div>
    )
    },[filterText])


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
                                                            <h4 className="fw-bolder mt-1">Present Employee Today</h4>
                                                        </div>
                                                        
                                                        <div>
                                                            <button className="btn round btn-icon rounded-circle m-1 mb-2" title="Back" onClick={() => navigate(-1)}>
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
                                                            <div style={{fontSize : '16px'}}> 
                                                                <div className="alert alert-dismissible alert-success">
                                                                    <strong>Updated!!</strong> Successfully.
                                                                    <button type="button" className="close" data-dismiss="alert" onClick={() => setStatusChangedAlert(false)}>X</button>
                                                                </div>
                                                            </div> : null
                                                        }
                                                            <DataTable 
                                                                columns={columns}
                                                                data={filteredItems}
                                                                subHeader
                                                                subHeaderComponent={subHeaderComponentMemo}
                                                                pagination
                                                                paginationComponentOptions={paginationComponentOptions}
                                                            />

                                            </div>
                                        </div>
                                        </div>
                                        </div>
                                            <Modal show={showApproveModal} onHide={handleApproveClose} animation={false}>
                                            <Modal.Header closeButton>
                                            <Modal.Title>Do you want to Approve ?</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                            <span className="font-weight-bold">Employee Id:</span><Link to={`/employee-info/${Editemployeeid}`}  style={{textDecoration: 'none'}} className="pointer-change">{Editemployeeid}</Link> <div className="vr ml-2 mr-2"></div>
                                            <span className="font-weight-bold">Date:</span>{Editdate} <br/>
                                            <span className="font-weight-bold">In Time:</span>{Editintime}<div className="vr ml-2 mr-2"></div>
                                            <span className="font-weight-bold">Out Time:</span>{Editouttime}<br />
                                            <span className="font-weight-bold">Status:</span>{Editstatus}<div className="vr ml-2 mr-2"></div>
                                            <span className="font-weight-bold">Type:</span>{Edittype}<br/>
                                            <span className="font-weight-bold">Comment:</span>{Editcomment}
                                            <hr/>
                                                <div className="row d-flex justify-content-end">
                                                    <div className="col-sm-3">
                                                        <button className="btn btn-primary btn-sm" onClick={ApproveAttendance}>
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
                                            <span className="font-weight-bold">Employee Id:</span><Link to={`/employee-info/${Editemployeeid}`}  style={{textDecoration: 'none'}} className="pointer-change">{Editemployeeid}</Link><div className="vr ml-2 mr-2"></div>
                                            <span className="font-weight-bold">Date:</span>{Editdate} <br/>
                                            <span className="font-weight-bold">In Time:</span>{Editintime} <div className="vr ml-2 mr-2"></div>
                                            <span className="font-weight-bold">Out Time:</span>{Editouttime}<br />
                                            <span className="font-weight-bold">Status:</span>{Editstatus} <div className="vr ml-2 mr-2"></div>
                                            <span className="font-weight-bold">Type:</span>{Edittype}
                                            <div className="row mt-3">
                                                    <div className="col-sm-2">
                                                        Reason
                                                    </div>
                                                    <div className="col-sm-5">
                                                        <input type="text" className="form-control" value={reason} onChange={(e) => setreason(e.target.value)}/>
                                                    </div>
                                            </div>
                                            <hr/>
                                                <div className="row d-flex justify-content-end">
                                                    <div className="col-sm-3">
                                                        <button className="btn btn-danger btn-sm" onClick={RejectAttendance}>
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