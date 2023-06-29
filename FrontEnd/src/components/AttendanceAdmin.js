import Sidebar from "./Sidebar";
import React , { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import Unauthorized from "./Unauthorized";
import AttendanceService from "../services/AttendanceService";
import UserService from "../services/UserService";
import { Modal } from 'react-bootstrap'
import { Link  } from 'react-router-dom';
import { GrFormView } from 'react-icons/gr';
import {BsFillCheckCircleFill} from 'react-icons/bs';
import {ImCancelCircle} from 'react-icons/im';
import {useDispatch } from 'react-redux'
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";

export default function Attendance(){

    const dispatch = useDispatch()
    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);
    
    const [AllAttendance, setAllAttendance] = useState([]);
    const [filterText, setFilterText] = React.useState('');
    const [employee_id, setEmployeeId] = useState("");

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
    const [AllUsers, setAllUsers] = useState([]);
    const [StatusChangedAlert, setStatusChangedAlert] = useState(false);
    const [showdiv, setshowdiv] = useState(false)

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


    function convert(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear() ].join("-");
    }

    function searchbydateuser(){
        AttendanceService.searchattendance(employee_id, SaerchfromDate, SearchtoDate)
        .then((response) => {
            setAllAttendance(response.data);
            setshowdiv(true)
        })
        .catch((e) => {
            console.log(e);
        })
    }

    function totaltime(in_time, out_time, breakStartTime, breakEndTime){
            function toSeconds(time_str) {

                var parts = time_str.split(':');
                return parts[0] * 3600 + 
                parts[1] * 60;
                
            }

            
            var a = in_time
            var b = out_time
            
            var difference = Math.abs(toSeconds(a) - toSeconds(b));
            
        
            var result = [
                Math.floor(difference / 3600), 
                Math.floor((difference % 3600) / 60), 
                
            ];

            // 0 padding and concatation
            result = result.map(function(v) {
                return v < 10 ? '0' + v : v;
            }).join(':');

            


            function toBreakSeconds(time_str) {

                var parts = time_str.split(':');
                return parts[0] * 3600 + 
                parts[1] * 60;
                
            }

            
            var c = breakStartTime
            var d = breakEndTime
            
            var differences = Math.abs(toBreakSeconds(c) - toBreakSeconds(d));
            
        
            var Breakresult = [
                Math.floor(differences / 3600), 
                Math.floor((differences % 3600) / 60), 
                
            ];

            // 0 padding and concatation
            Breakresult = Breakresult.map(function(v) {
                return v < 10 ? '0' + v : v;
            }).join(':');


            function strToMins(t) {
                var s = t.split(":");
                return Number(s[0]) * 60 + Number(s[1]);
            }
              
            function minsToStr(t) {
                return Math.trunc(t / 60)+':'+('00' + t % 60).slice(-2);
            }
              
            var DayTotalHours = minsToStr( strToMins(result) - strToMins(Breakresult) );
              
            return DayTotalHours;

            
    }


    const parseJwt = (id) => {
        dispatch(refreshToken({_id : id}))
        
    };

    useEffect(() => {
        getAllusers();
        
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
            selector: row => convert(row.date),
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
            name: 'Total Time',
            selector: row => totaltime(row.in_time, row.out_time, row.breakStartTime, row.breakEndTime),
            cell: row => (
                <div>
                    {totaltime(row.in_time, row.out_time, row.breakStartTime, row.breakEndTime) + "h"}
                </div>
            )
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
                searchbydateuser();
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

    
    function findInValues(arr, value) {
        value = String(value).toLowerCase();
        return arr.filter(o =>
        Object.entries(o).some(entry =>
            String(entry[1]).toLowerCase().includes(value)
        )
        );
    }
  
    const filteredItems = findInValues(AllAttendance,  filterText);

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

    function resetValues(){
        setEmployeeId("");
        setshowdiv(false);
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
                                                <h1>Attendance</h1>
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
                                                
                                                <Modal show={showApproveModal} onHide={handleApproveClose} animation={false}>
                                                    <Modal.Header closeButton>
                                                    <Modal.Title>Do you want to Approve ?</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                    <h5 className="font-weight-bold">Employee Id: <Link to={`/employee-info/${Editemployeeid}`}  style={{textDecoration: 'none'}} className="pointer-change">{Editemployeeid}</Link> </h5><br/>
                                                    <h5 className="font-weight-bold">Date: {convert(Editdate)}</h5><br/>
                                                    <h5 className="font-weight-bold">In Time: {Editintime}</h5><br />
                                                    <h5 className="font-weight-bold">Out Time: {Editouttime}</h5><br />
                                                    <h5 className="font-weight-bold">Status: {Editstatus}</h5><br />
                                                    <h5 className="font-weight-bold">Type: {Edittype}</h5><br/>
                                                    <h5 className="font-weight-bold">Comment: {Editcomment}</h5>
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
h5                                              <h5 className="font-weight-bold">Date: {convert(Editdate)}</h5><br/>
                                                <h5 className="font-weight-bold">In Time: {Editintime}</h5><br />
                                                <h5 className="font-weight-bold">Out Time: {Editouttime}</h5><br />
                                                <h5 className="font-weight-bold">Status: {Editstatus}</h5><br />
                                                <h5 className="font-weight-bold">Type: {Edittype}</h5>
                                                <div className="row mt-3 ">
                                                        <div className="col-sm-10">
                                                           <h5>Reason</h5>
                                                        
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