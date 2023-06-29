import Sidebar from "./Sidebar";
import Unauthorized from "./Unauthorized";
import { useEffect, useState } from "react";
import LeavesService from "../services/LeavesService";
import DataTable from 'react-data-table-component';
import { Chart } from "react-google-charts";
import {useDispatch } from 'react-redux'
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
import { Modal } from 'react-bootstrap'

export default function LeavesList(){

    const dispatch = useDispatch()
    const AccountInfo = localStorage.getItem('store')
    const userInfo1 = JSON.parse(AccountInfo);
    let employee_id = userInfo1.employee_id;

    const [AllApplyLeavesbyEmpId, setAllApplyLeavesbyEmpId] = useState([])
    const [CancelRequestValue, setCancelRequestValue] = useState("")
    const [CancelRequestDate, setCancelRequestDate] = useState("")
    const [CancelRequestLeave_type, setCancelRequestLeave_type] = useState("")
    const [CancelRequestStatus, setCancelRequestStatus] = useState("")
    // const [showOption, setshowOption] = useState(false)

    const [FilterDatas, setFilterDatas] = useState([]);
    const [DefaultFilterDatas, setDefaultFilterDatas] = useState([]);
    const [SaerchfromDate, setSaerchfromDate] = useState("2023-01-01");
    const [SearchtoDate, setSearchtoDate] = useState("2023-12-31");
    const [dateType, setdateType] = useState("Applied Date");

    const [filterLeavetype, setfilterLeavetype] = useState("All");
    const [filterstatus, setStatusLeavetype] = useState("All");

    const [CancelRequestAlert, setCancelRequestAlert] = useState(false);
    const [showModal, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [disableButton, setdisableButton] = useState(false);

    const handleOptionChange = (value,date,leave_type,status) => {
        if(value !== ""){
            handleShow();
            setCancelRequestDate(date)
            setCancelRequestLeave_type(leave_type)
            setCancelRequestStatus(status)
            setCancelRequestValue(value)
        }
        
     }


      function convert(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear() ].join("-");
    }


    const d = new Date();
    let year = d.getFullYear();

    function convertnew(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day ].join("-");
    }

    const firstdayofyear = new Date(year, 0, 1)
    const lastdayofyear = new Date(year, 11, 31)
    let newfirstdayofyear = convertnew(firstdayofyear);
    let newlastdayofyear = convertnew(lastdayofyear);



    function AllApplyLeaves(){
        LeavesService.LeavesbyEmp(userInfo1.employee_id)
        .then((response) => {
            setAllApplyLeavesbyEmpId(response.data.leaves);
        })
        .catch((e) => {
            console.log(e , "Not Found");
        })
    }


    function AllleavescurrentMonth(){
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        function convertnew(str) {
            var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
            return [date.getFullYear(), mnth, day ].join("-");
        }
    
        let startDate = new Date(convertnew(firstDay)).toISOString();
        let endDate = new Date(convertnew(lastDay)).toISOString();

        LeavesService.leavescurrentyearbyEmpId(userInfo1.employee_id, startDate, endDate)
        .then((response) => {
            setDefaultFilterDatas(response.data);
        })
        .catch((e) => {
            console.log(e , "Not Found");
        })
    }

    function AllLeavesofCurrentYear(){

        LeavesService.leavesofcurrentyearbyapplieddate(dateType, SaerchfromDate, SearchtoDate, filterLeavetype, filterstatus, employee_id)
        .then((response) => {
                setFilterDatas(response.data);
        })
        .catch((e) => {
            console.log(e);
        })
    }

    const convertedFilterDatas = []
    for(let i=0; i<FilterDatas.length;i++){
        convertedFilterDatas.push({
            _id : FilterDatas[i]._id,
            employee_id: FilterDatas[i].employee_id,
            date: (FilterDatas[i].date),
            leave_type : FilterDatas[i].leave_type,
            duration : FilterDatas[i].duration,
            status : FilterDatas[i].status,
            createdAt: (FilterDatas[i].createdAt),   
            from_date: FilterDatas[i].from_date,
        })
    }

    const parseJwt = (id) => {
            dispatch(refreshToken({_id : id}))
    };
        

    useEffect(() => {
        AllApplyLeaves();
        AllleavescurrentMonth();

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


    const finalFilterDatas = []
    if(convertedFilterDatas.length === 0){
        for(let i=0; i<DefaultFilterDatas.length; i++){
            finalFilterDatas.push({
                _id: DefaultFilterDatas[i]._id,
                employee_id: DefaultFilterDatas[i].employee_id,
                date: convert(DefaultFilterDatas[i].date),
                leave_type: DefaultFilterDatas[i].leave_type,
                status : DefaultFilterDatas[i].status,
                duration: DefaultFilterDatas[i].duration,
                createdAt: convert(DefaultFilterDatas[i].createdAt),
                updatedAt: DefaultFilterDatas[i].updatedAt
            })
        }
    }
    else{
        for(let i=0; i<convertedFilterDatas.length; i++){
            finalFilterDatas.push({
                _id: convertedFilterDatas[i]._id,
                employee_id: convertedFilterDatas[i].employee_id,
                date: convert(convertedFilterDatas[i].date),
                leave_type: convertedFilterDatas[i].leave_type,
                status : convertedFilterDatas[i].status,
                duration: convertedFilterDatas[i].duration,
                createdAt: convert(convertedFilterDatas[i].createdAt),
                updatedAt: convertedFilterDatas[i].updatedAt,
                from_date: convert(FilterDatas[i].from_date),
            })
        }
    }

      const DisplayDataofApplyLeavesbyEmpId = []
    for(let i=0; i<AllApplyLeavesbyEmpId.length;i++){
        DisplayDataofApplyLeavesbyEmpId.push({
            _id : AllApplyLeavesbyEmpId[i]._id,
            date: AllApplyLeavesbyEmpId[i].date,
            leave_type : AllApplyLeavesbyEmpId[i].leave_type,
            duration : AllApplyLeavesbyEmpId[i].duration,
            status : AllApplyLeavesbyEmpId[i].status,
            createdAt: convert(AllApplyLeavesbyEmpId[i].createdAt),
        })
    }


    const ApproveLeave = AllApplyLeavesbyEmpId.filter(
        item => item.status && item.status.includes("Approve")
    )

    const RejectLeave = AllApplyLeavesbyEmpId.filter(
        item => item.status && item.status.includes("Reject")
    )

    const CanceledLeave = AllApplyLeavesbyEmpId.filter(
        item => item.status && item.status.includes("Canceled")
    )

    const PendingLeave = AllApplyLeavesbyEmpId.filter(
        item => item.status && item.status.includes("Pending")
    )

    const TakenLeave = AllApplyLeavesbyEmpId.filter(
        item => item.status && item.status.includes("Taken")
    )

    const CancelRequest = AllApplyLeavesbyEmpId.filter(
        item => item.status && item.status.includes("Cancel Request")
    )


    const Chartdata = [
        ["Task", "Leaves"],
        ["Approve", ApproveLeave.length],
        ["Reject", RejectLeave.length],
        ["Cancel Request", CancelRequest.length],
        ["Canceled",CanceledLeave.length],
        ["Pending",PendingLeave.length],
        ["Taken",TakenLeave.length]
      ]

      const chartoptions = {
        // eslint-disable-next-line
        title : 'Leaves',
        pieSliceText : 'value',
        tooltip: {
            text: 'value'
        },
        colors: ['green', 'red', 'yellow' ,'grey','orange','blue']
      }


    const columns = [
        {
            name: 'Applied Date',
            selector: row => row.createdAt,
            sortable: true,
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
            cell: row => (
                <>
                {row.status === "Approve" || row.status === "Taken" ? 
                    (<span className="text-success">{row.status}</span>) 
                    : (<span className="text-danger">{row.status}</span>)

                }
                </>
            )
        },
        {
            name: 'Action',
            cell: row => (
                <>
                {row.status === 'Cancel Request' || row.status === 'Canceled' || row.status === 'Reject'
                ? <>{disableButton === true ? <select id="action" disabled className="custom-select">
                <option>Select</option>
                <option>Cancel request</option>
                </select> : <select id="action" disabled className="custom-select">
                <option>Select</option>
                <option>Cancel request</option>
                </select> } </>
                    : (
                    <select id="action" onChange={(e) => handleOptionChange(e.target.value,row.date,row.leave_type,row.status)} className="custom-select">
                        <option value="">Select</option>
                        <option value={row._id}>Cancel request</option>
                    </select>
                )
                }
                    
                </>
            )
        }
    ]

    const paginationComponentOptions = {
        selectAllRowsItem: true,
        selectAllRowsItemText: "ALL"
      };

    function canelRequest(){
        LeavesService.CancelLeaveRequest({_id : CancelRequestValue, status : 'Cancel Request'})
        .then((response) => {
            if(response.status === 200){
                setCancelRequestAlert(true);
                AllLeavesofCurrentYear()
                AllleavescurrentMonth();
                setdisableButton(false);
                handleClose();
            }
        })
        .catch((e) => {
            console.log(e , "Not Found");
        })
    }

    function resetvalues(){
        setfilterLeavetype("All")
        setStatusLeavetype("All")
    }


    if(userInfo1.account_type === "Employee"){
        return(
            <div>
                    <Sidebar/>
                    <div className="app-admin-wrap layout-sidebar-large clearfix">
                        <main>
                            <div className="main-content-wrap d-flex flex-column flex-grow-1 sidenav-open">
                                    <div className="main-content">
                                        <div>
                                            <div className="breadcrumb">
                                                <h1>My Leave List</h1>
                                            </div>
                                            <div className="separator-breadcrumb border-top"></div>
                                        </div>
                                        <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                        <div className="card mb-30">
                                            <div className="card-body">
                                            
                                            
                                            <div className="row mt-2">
                                                <div className="col-sm-4">
                                                    <label>Search on Date Type</label><span className="text-danger">*</span><br/>
                                                        <div className="form-check form-check-inline mt-3 ">
                                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value={"Applied Date"} onChange={(e) => setdateType(e.target.value)} defaultChecked  />
                                                            <label className="form-check-label">Applied Date</label>
                                                        </div>
                                                        <div className="form-check form-check-inline ">
                                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value={"Leave Date"} onChange={(e) => setdateType(e.target.value)}   />
                                                            <label className="form-check-label">Leave Date</label>
                                                        </div>
                                                </div>

                                                <div className="col-sm-3">
                                                    <label>From</label><span className="text-danger">*</span>
                                                        <input className="input form-control" type={'date'} id="fromdate" defaultValue={newfirstdayofyear} onChange={(e) => setSaerchfromDate(e.target.value)} />
                                                </div>
                                                <div className="col-sm-3">
                                                    <label>to</label><span className="text-danger">*</span>
                                                        <input className="input form-control" type={'date'} id="todate" defaultValue={newlastdayofyear} onChange={(e) => setSearchtoDate(e.target.value)} />
                                                </div>
                                                
                                            </div>

                                            <div className="row mt-4 mb-3">
                                                <div className="col-sm-3">
                                                    <label>Leave Type</label><span className="text-danger">*</span>
                                                    <select id="leavetype" className="custom-select empselect" value={filterLeavetype} onChange={(e) => setfilterLeavetype(e.target.value)}>
                                                        <option>All</option>
                                                        <option>EarnedLeave</option>
                                                        <option>CasualLeave</option>
                                                        <option>SickLeave</option>
                                                        <option>CompOff</option>
                                                        <option>FloatingLeave</option>
                                                    </select>
                                                </div>
                                                <div className="col-sm-3">
                                                <label>Status</label><span className="text-danger">*</span>
                                                    <select id="status" className="custom-select empselect" value={filterstatus} onChange={(e) => setStatusLeavetype(e.target.value)}>
                                                        <option>All</option>
                                                        <option>Pending</option>
                                                        <option>Approve</option>
                                                        <option>Reject</option>
                                                        <option>Cancel Request</option>
                                                        <option>Canceled</option>
                                                        <option>Taken</option>
                                                    </select>
                                                </div>
                                                <div className="col-sm-5 mt-4">
                                                    <button className="btn btn-sm btn-primary searchbtn" onClick={AllLeavesofCurrentYear} title="Search">Search</button>
                                                    <button className="btn btn-sm btn-secondary ml-3 resetbtn" title="Reset" onClick={resetvalues}>Reset</button>
                                                </div>
                                            </div>

                                            
                                            {CancelRequestAlert === true ?
                                                        <div className="alert alert-info alert-dismissible" style={{fontSize : '16px'}}>
                                                            <strong>Applied Cancel Request!!</strong> Successfully.
                                                            <button type="button" className="close" data-dismiss="alert" onClick={() => setCancelRequestAlert(false)}>X</button>
                                                        </div>
                                                     : null
                                            }
                                            <DataTable 
                                                columns={columns}
                                                data={finalFilterDatas}
                                                pagination
                                                paginationComponentOptions={paginationComponentOptions}
                                                className="mt-4"
                                            />

                                            <Modal show={showModal} onHide={handleClose} animation={false}>
                                            <Modal.Header closeButton>
                                            <Modal.Title>Do You want to Apply Leave Cancel Request ?</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <p>Leave Date : {CancelRequestDate}</p>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <p>Leave Type : {CancelRequestLeave_type}</p>
                                                    </div>
                                                    <div className="col-sm-5">
                                                        <p>Leave Status : {CancelRequestStatus}</p>
                                                    </div>
                                                </div>
                                                    <div className="row justify-content-end mt-3">
                                                        <div className="col-sm-3">
                                                            <button className="btn btn-primary btn-sm" onClick={canelRequest}>Cancel request</button>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <button className="btn btn-secondary btn-sm" onClick={handleClose}>Close</button>
                                                        </div>
                                                    </div>
                                            </Modal.Body>
                                            </Modal>
                                            
                                            </div>
                                        </div>
                                        </div>
                                        </div>
                                        
                                        <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12 mt-3">
                                        <div className="card">
                                            <div className="card-body">
                                                <p className="mt-3">My Leave Summary</p>
                                                
                                                        <Chart
                                                            chartType="PieChart"
                                                            data={Chartdata}
                                                            options={chartoptions}
                                                            width={"90%"}
                                                            height={"500px"}
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