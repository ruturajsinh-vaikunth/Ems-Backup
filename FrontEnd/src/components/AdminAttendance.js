
import Sidebar from "./Sidebar";
import Unauthorized from "./Unauthorized";
import { useLocation, useNavigate , Link} from "react-router-dom";
import AttendanceService from "../services/AttendanceService";
import HolidayService from "../services/HolidayService";
import { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import { GoInfo } from 'react-icons/go';
import  { Tooltip as ReactTooltip }  from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import {BiArrowBack} from 'react-icons/bi';
import {useDispatch } from 'react-redux'
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";

export default function AdminAttendance(){

    const search = useLocation().search;
    const employee_id = new URLSearchParams(search).get("employee_id");

    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [filterfromdate, setfilterfromdate] = useState("");
    const [filtertodate, setfiltertodate] = useState("");
    const [arr4, setarr4] = useState([]);
    const [Datas, setDatas] = useState([]);


    function weekoffdata(){
        HolidayService.WeekoffData()
        .then(response => {
            const AllDatas = response.data;
            const TotalWeekOffs = AllDatas.filter(
                item => item.value && item.value.includes("1")
            )
            setDatas(TotalWeekOffs)
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



    const EMPcolumns = [
        {
            name: 'Date',
            selector: row => convert(row.date),
            sortable: true,
        },
        {
            name: 'In Time',
            selector: row => row.in_time,
        },
        {
            name: 'Out Time',
            selector: row => row.out_time,
        },
        {
            name: 'BreakStartTime',
            selector: row => row.breakStartTime,
        },
        {
            name: 'BreakEndTime',
            selector: row => row.breakEndTime,
        },
        {
            name: 'Type',
            selector: row => row.type,
            cell: row => (
                            <>
                            {row.type}
                            <GoInfo  size={22} className="ml-1" color="#C5BFBF" id={row.date}  />
                            <ReactTooltip
                                    className="bg-white"
                                    style={{ zIndex: 3 }}
                                    anchorId={row.date}
                                    place="bottom"
                                    content={
                                        <>
                                        <table className="table table-bordered responsive" style={{color: 'black'}}>
                                        <thead>
                                            <tr>
                                            <th>Category</th>
                                            <th>Date</th>
                                            <th>Status Changed date</th>
                                            <th>Status Changed by</th>
                                            <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{row.type}</td>
                                                <td>{convert(row.date)}</td>
                                                <td>{!row.updatedAt  ? <span>-</span> : convert(row.updatedAt)}</td>
                                                <td>{!row.statusChangeby  ? <span>-</span> : row.statusChangeby}</td>
                                                <td>{!row.status ? <span>-</span> : row.status}</td>
                                            </tr>
                                        </tbody>
                                        </table>
                                        </>
                                    }
                                />
                            </>
                    	),
        },
        {
            name: 'Status',
            selector: row => row.status,
        },
        {
            name:'Reason',
            selector: row => row.reason,
        },
        
    ]



    function filterDateFromRange(){

    var getDateArray = function(start, end) {
        const arr = []
        var dt = new Date(start);
        while (dt <= end) {
            arr.push((new Date(dt))); //save only the Day MMM DD YYYY part
            dt.setDate(dt.getDate() + 1);
        }
        return arr;
    }

    var startDate = new Date(filterfromdate);
    var endDate = new Date(filtertodate);


    AttendanceService.filterdatefromrange(employee_id,filterfromdate,filtertodate)
    .then(response => {

        const DatesAraay = getDateArray(startDate, endDate);


        const ConvertedFetchDate = response.data;
        

        const ConvertedDate = []
        for(let i=0; i< DatesAraay.length; i++){
          ConvertedDate.push({
            employee_id: employee_id,
            date: DatesAraay[i].toISOString(),
            in_time: '00:00',
            out_time: '00:00',
            breakStartTime: '00:00',
            breakEndTime: '00:00',
            duration: '',
            status: '',
            type: 'Absent',
            reason: '', 
            })
            
        }


        const merge = (arr1,arr2) => {

            return arr1.map( (x) => {
              const y = arr2.find( item => x.date === item.date);
              if (y) {
                return Object.assign({},x,y);
              } else
                return x
            }).concat(arr2.filter(item => arr1.every( x => x.date !== item.date)));
        }
            
        
        let arr3 = merge(ConvertedDate, ConvertedFetchDate)
        

        const Weekoffs = []
        for(let i =0;i<Datas.length; i++){
            Weekoffs.push({
                Day: Datas[i].Day,
                type : "WO",
                employee_id : employee_id, 
                in_time : '-', 
                out_time: '-', 
                breakStartTime : '-', 
                breakEndTime : '-' , 
                duration : '-' , 
                status : '', 
            })
        }
        const testWeekatas = []
        for(let i=0; i<arr3.length; i++){
            if(new Date(arr3[i].date).getDay() === 0){
                testWeekatas.push({
                    date: arr3[i].date,
                    Day : "Sunday",
                    breakEndTime : arr3[i].breakEndTime,
                    breakStartTime : arr3[i].breakStartTime,
                    comment : arr3[i].comment,
                    duration : arr3[i].duration,
                    employee_id : arr3[i].employee_id,
                    firstname : arr3[i].firstname,
                    in_time : arr3[i].in_time,
                    out_time :  arr3[i].out_time,
                    reason :  arr3[i].reason,
                    status :   arr3[i].status,
                    type : arr3[i].type,
                    _id : arr3[i]._id,
                    updatedAt: arr3[i].updatedAt,
                })
            }
            if(new Date(arr3[i].date).getDay() === 1){
                testWeekatas.push({
                    date: arr3[i].date,Day : "Monday",
                    breakEndTime : arr3[i].breakEndTime,
                    breakStartTime : arr3[i].breakStartTime,
                    comment : arr3[i].comment,
                    duration : arr3[i].duration,
                    employee_id : arr3[i].employee_id,
                    firstname : arr3[i].firstname,
                    in_time : arr3[i].in_time,
                    out_time :  arr3[i].out_time,
                    reason :  arr3[i].reason,
                    status :   arr3[i].status,
                    type : arr3[i].type,
                    _id : arr3[i]._id,
                    updatedAt: arr3[i].updatedAt,
                })
            }
            if(new Date(arr3[i].date).getDay() === 2){
                testWeekatas.push({
                    date: arr3[i].date,Day : "Tuesday",
                    breakEndTime : arr3[i].breakEndTime,
                    breakStartTime : arr3[i].breakStartTime,
                    comment : arr3[i].comment,
                    duration : arr3[i].duration,
                    employee_id : arr3[i].employee_id,
                    firstname : arr3[i].firstname,
                    in_time : arr3[i].in_time,
                    out_time :  arr3[i].out_time,
                    reason :  arr3[i].reason,
                    status :   arr3[i].status,
                    type : arr3[i].type,
                    _id : arr3[i]._id,
                    updatedAt: arr3[i].updatedAt,
                })
            }
            if(new Date(arr3[i].date).getDay() === 3){
                testWeekatas.push({
                    date: arr3[i].date,Day : "Wednesday",
                    breakEndTime : arr3[i].breakEndTime,
                    breakStartTime : arr3[i].breakStartTime,
                    comment : arr3[i].comment,
                    duration : arr3[i].duration,
                    employee_id : arr3[i].employee_id,
                    firstname : arr3[i].firstname,
                    in_time : arr3[i].in_time,
                    out_time :  arr3[i].out_time,
                    reason :  arr3[i].reason,
                    status :   arr3[i].status,
                    type : arr3[i].type,
                    _id : arr3[i]._id,
                    updatedAt: arr3[i].updatedAt,
                })
            }
            if(new Date(arr3[i].date).getDay() === 4){
                testWeekatas.push({
                    date: arr3[i].date,
                    Day : "Thursday",
                    breakEndTime : arr3[i].breakEndTime,
                    breakStartTime : arr3[i].breakStartTime,
                    comment : arr3[i].comment,
                    duration : arr3[i].duration,
                    employee_id : arr3[i].employee_id,
                    firstname : arr3[i].firstname,
                    in_time : arr3[i].in_time,
                    out_time :  arr3[i].out_time,
                    reason :  arr3[i].reason,
                    status :   arr3[i].status,
                    type : arr3[i].type,
                    _id : arr3[i]._id,
                    updatedAt: arr3[i].updatedAt,
                })
            }
            if(new Date(arr3[i].date).getDay() === 5){
                testWeekatas.push({
                    date: arr3[i].date,
                    Day : "Friday",
                    breakEndTime : arr3[i].breakEndTime,
                    breakStartTime : arr3[i].breakStartTime,
                    comment : arr3[i].comment,
                    duration : arr3[i].duration,
                    employee_id : arr3[i].employee_id,
                    firstname : arr3[i].firstname,
                    in_time : arr3[i].in_time,
                    out_time :  arr3[i].out_time,
                    reason :  arr3[i].reason,
                    status :   arr3[i].status,
                    type : arr3[i].type,
                    _id : arr3[i]._id,
                    updatedAt: arr3[i].updatedAt,
                })
            }
            if(new Date(arr3[i].date).getDay() === 6){
                testWeekatas.push({
                    date: arr3[i].date,
                    Day : "Saturday",
                    breakEndTime : arr3[i].breakEndTime,
                    breakStartTime : arr3[i].breakStartTime,
                    comment : arr3[i].comment,
                    duration : arr3[i].duration,
                    employee_id : arr3[i].employee_id,
                    firstname : arr3[i].firstname,
                    in_time : arr3[i].in_time,
                    out_time :  arr3[i].out_time,
                    reason :  arr3[i].reason,
                    status :   arr3[i].status,
                    type : arr3[i].type,
                    _id : arr3[i]._id,
                    updatedAt: arr3[i].updatedAt,
                })
            }
        }
        

        const mergeTest = (arr1,arr2) => {

            return arr1.map( (x) => {
              const y = arr2.find( item => x.Day === item.Day);
              if (y) {
                return Object.assign({},x,y);
              } else
                return x
            }).concat(arr2.filter(item => arr1.every( x => x.Day !== item.Day)));
        }

        const testResult = mergeTest(testWeekatas,Weekoffs)

        
        const finalResult = merge(testResult,ConvertedFetchDate)

        setarr4(finalResult); 
        
    })
    .catch(e => {
        console.log(e);
    })

 }

 const parseJwt = (id) => {
            dispatch(refreshToken({_id : id}))
};

function convertYYMMDD(str) {
    var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear() , mnth, day ].join("-");
    }

 useEffect(() => {
    weekoffdata();

        const Last30Days = new Date(new Date().setDate(new Date().getDate() - 30));
        const Yesterday = new Date(new Date().setDate(new Date().getDate() - 1));


        setfilterfromdate(convertYYMMDD(Last30Days))
        setfiltertodate(convertYYMMDD(Yesterday))

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
                                                        <div className=" p-2">
                                                            <h4><h4 className="fw-bolder breadcrumb">Attendance of user &nbsp; <Link to={`/employee-info/${employee_id}`}  style={{textDecoration: 'none'}} className="pointer-change">{employee_id}</Link></h4> </h4>
                                                        </div>
                                                        <div className="p-1 mb-2">
                                                            <button className="btn round btn-icon rounded-circle m-1" title="Back" onClick={() => navigate(-1)}>
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
                                                    
                                                    <div className="row mt-2">
                                                    <div className="col-sm-3">
                                                        <label>From</label>
                                                        <input type='date' className="form-control" value={filterfromdate} onChange={(e) => setfilterfromdate(e.target.value)} />
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label>To</label>
                                                        <input type='date' className="form-control" value={filtertodate} onChange={(e) => setfiltertodate(e.target.value)} />
                                                    </div>
                                                    
                                                    <div className="col-sm-3 mt-4">
                                                        <button className="btn btn-primary border border-black btn-sm mr-3" onClick={filterDateFromRange}>Show Attendance</button>
                                                    </div>     
                                                </div>
                                                    
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12 col-md-12 col-lg-12">
                                            <div className="card mb-30">
                                                <div className="card-body">
                                        <DataTable 
                                            columns={EMPcolumns}
                                            data={arr4}
                                            selectableRowsHighlight
                                        />
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