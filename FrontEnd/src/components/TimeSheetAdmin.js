import Sidebar from "./Sidebar";
import React , { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import Unauthorized from "./Unauthorized";
import UserService from "../services/UserService";
import AttendanceService from "../services/AttendanceService";
import {useDispatch } from 'react-redux'
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
import { PDFExport } from "@progress/kendo-react-pdf";

export default function TimeSheetAdmin(){

    const container = React.useRef(null);
    const pdfExportComponent = React.useRef(null);
    const dispatch = useDispatch()
    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);
    
    const [AllUsers, setAllUsers] = useState([])
    const [AllAttendance, setAllAttendance] = useState([]);
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
    
    const [employee_id, setEmployeeId] = useState("")
    const [SaerchfromDate, setSaerchfromDate] = useState(newfirstdayofmonth)
    const [SearchtoDate, setSearchtoDate] = useState(newlastdayofmonth)
    const [TotalHours,  setTotalHours] = useState("")
    const [EmployeeError, setEmployeeError] = useState("")
    const [showExportButton, setshowExportButton] = useState()

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
    
    function formatDate (input) {
        var datePart = input.match(/\d+/g),
        year = datePart[0], // get only two digits
        month = datePart[1], day = datePart[2];
      
        return day+'-'+month+'-'+year;
      }

    function convert(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear() ].join("-");
    }

    function searchbydateuser(){

        if(employee_id === ""){
            setEmployeeError("Please select Employee")
            return
        }else{
            setEmployeeError("")
        }

        AttendanceService.searchattendance(employee_id, SaerchfromDate, SearchtoDate)
        .then((response) => {
            setAllAttendance(response.data);
            setshowdiv(true)
            const Data = response.data

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
                
                var differencebreak = Math.abs(toBreakSeconds(c) - toBreakSeconds(d));
                
            
                var Breakresult = [
                    Math.floor(differencebreak / 3600), 
                    Math.floor((differencebreak % 3600) / 60), 
                    
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

            if(Data.length === 0){
                setshowExportButton(false)
            }else{
                setshowExportButton(true)
            }

            const TotalHours = []
            for(let i=0; i<Data.length; i++){
                TotalHours.push(totaltime(Data[i].in_time, Data[i].out_time, Data[i].breakStartTime, Data[i].breakEndTime))
            }


            function addTimes(timeArray) {
                let mins = timeArray.reduce((acc, time) => {
                  let [h, m] = time.split(':');
                  acc += h*60 + m*1;
                  return acc;
                }, 0);
                return (mins/60|0) + ':' + ('0'+(mins%60)).slice(-2);
              }
              
              
            setTotalHours(addTimes(TotalHours));
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
            
            var differencebreak = Math.abs(toBreakSeconds(c) - toBreakSeconds(d));
            
        
            var Breakresult = [
                Math.floor(differencebreak / 3600), 
                Math.floor((differencebreak % 3600) / 60), 
                
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

    

    const columns = [
        {
            name: <div className="t-font-boldest">{'Date'}</div>,
            selector: row => convert(row.date),
            sortable: true,
        },
        {
            name: <div className="t-font-boldest">{'Total Time'}</div>,
            selector: row => totaltime(row.in_time, row.out_time, row.breakStartTime, row.breakEndTime),
            cell: row => (
                <div>
                    {totaltime(row.in_time, row.out_time, row.breakStartTime, row.breakEndTime) + "h"}
                </div>
            )
        }

    ]
    
    const exportPDFWithComponent = () => {
        if (pdfExportComponent.current) {
          pdfExportComponent.current.save();
        }
      };

    function resetvalues(){
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
                                                <h1>TimeSheet</h1>
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
                                                <p className="text-danger">{EmployeeError}</p>
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
                                                    <button className="btn btn-sm btn-primary" onClick={searchbydateuser} title="Search">Search</button>
                                                    <button className="btn btn-sm btn-secondary ml-2" onClick={resetvalues} title="Reset">Reset</button>
                                                </div>     
                                            </div>
                                   
                                            </div>
                                        </div>
                                        </div>
                                        </div>
                                        
                                        {showdiv === true ? 
                                        <>
                                        {showExportButton === true ? 
                                            <div className="row justify-content-end mr-auto">
                                                <button className="btn btn-sm btn-primary text-15" onClick={exportPDFWithComponent}><i className=" i-File-Download mr-2"></i>Export to PDF</button>
                                            </div> : null }
                                        <PDFExport
                                            ref={pdfExportComponent}
                                            paperSize="auto"
                                            margin={40}
                                            fileName={`Report of ${employee_id}(${formatDate(SaerchfromDate)} - ${formatDate(SearchtoDate)})`}
                                            author={`${userInfo.firstName}`}
                                        >
                                        <div className="col-md-12 mt-3">
                                            <div className="card" ref={container}>
                                                <div className="card-body">
                                                <div className="row">
                                                    <div className="col-sm-2">
                                                        <h5 className="t-font-boldest">Employee:</h5>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <h5>{employee_id}</h5>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-2">
                                                        <h5 className="t-font-boldest">Start Date:</h5>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <h5>{formatDate(SaerchfromDate)}</h5>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col-sm-2">
                                                        <h5 className="t-font-boldest">End Date:</h5>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <h5>{formatDate(SearchtoDate)}</h5>
                                                    </div>
                                                </div>


                                                <DataTable 
                                                    columns={columns}
                                                    data={AllAttendance}
                                                />
                                                
                                                {showExportButton === true ? 
                                                <>
                                                <div className="row ml-auto mr-auto" style={{borderTopStyle: 'solid', borderTopWidth: '1px', borderTopColor: 'rgba(0, 0, 0, .12)'}}>
                                                    <div className="col-sm-3 col-xs-3 col-md-6 col-lg-6 col-xl-6">
                                                        <p className="mt-3 t-font-boldest">Total :</p>
                                                    </div>
                                                    <div className="col-md-3 col-lg-3 col-xl-3 col-sm-3">
                                                        <p className="mt-3 t-font-boldest">{TotalHours} h</p>
                                                    </div>
                                                </div>

                                                <div className="row justify-content-end mt-4">
                                                    <h5>{`${new Date().toISOString().slice(0, 10).split('-').reverse().join('-')} , ${new Date().toLocaleTimeString()} ` }</h5>
                                                </div>
                                                </> : null }
                                            
                                                </div>
                                            </div>
                                        </div></PDFExport> </> : null }
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