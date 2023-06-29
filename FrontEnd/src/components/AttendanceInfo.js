import Sidebar from "./Sidebar";
import React, { useState , useEffect} from "react";
import '../styles/content.css';
import AttendanceService from "../services/AttendanceService";
import Unauthorized from "./Unauthorized";
import { useNavigate, Link, useParams } from "react-router-dom";
import {useDispatch } from 'react-redux'
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
import {BiArrowBack} from 'react-icons/bi';

export default function AttendanceInfo(){

    const _id = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch()
    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);

    const [AttendanceInfo, setAttendanceInfo] = useState([]);

    const parseJwt = (id) => {
        dispatch(refreshToken({_id : id}))
        
    };

    function AttendanceInfobyid(){
        AttendanceService.findAttendanceById(_id)
        .then((response) => {
            setAttendanceInfo(response.data);
        })
        .catch((e) => {
            console.log(e);
        })
    }

    function convert(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear() ].join("-");
    }

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

    useEffect(() => {
        AttendanceInfobyid();
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
                                                        <div className="mr-auto p-2">
                                                            <h4 className="fw-bolder breadcrumb">Attendance info</h4>
                                                        </div>
                                                        <div className="p-2">
                                                            <button className="btn round btn-icon rounded-circle m-1" title="Back" onClick={() => navigate(-1)}>
                                                                <BiArrowBack  size={24} className="pointer-change" />    
                                                            </button>
                                                        </div>
                                                    </div>
                                            <div className="separator-breadcrumb border-top"></div>
                                        </div>
                                        <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <div className="card mb-30">
                                                <div className="card-body">
                                                    
                                                    {AttendanceInfo.map((data, index) => (
                                                        <div key={index}>
                                                            <div className="row">
                                                                <div className="col-sm-4">
                                                                    <div className="card shadow">
                                                                        <div className="card-body">
                                                                            <div className="font-weight-bold">
                                                                                Employee id
                                                                            </div>
                                                                            <span className="text-card"> 
                                                                            <Link to={`/employee-info/${data.employee_id}`}  style={{textDecoration: 'none'}} className="pointer-change">
                                                                                {data.employee_id}</Link></span>
                                                                        </div>
                                                                        </div>
                                                                    
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    <div className="card shadow">
                                                                        <div className="card-body">
                                                                            <div className="font-weight-bold">
                                                                                Name
                                                                            </div>
                                                                            <span className="text-card">{data.firstname}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    <div className="card shadow">
                                                                        <div className="card-body">
                                                                            <div className="font-weight-bold">
                                                                                Date
                                                                            </div>
                                                                            <span className="text-card"> {convert(data.date)}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            
                                                            </div>
                                                            <div className="row mt-3">
                                                                <div className="col-sm-4">
                                                                    <div className="card shadow">
                                                                        <div className="card-body">
                                                                            <div className="font-weight-bold"> 
                                                                                Type
                                                                            </div>
                                                                            <span className="text-card"> {data.type}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    <div className="card shadow">
                                                                        <div className="card-body">
                                                                            <div className="font-weight-bold">
                                                                                In Time
                                                                            </div>
                                                                            <span className="text-card">{timeConvert(data.in_time)}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    <div className="card shadow">
                                                                        <div className="card-body">
                                                                            <div className="font-weight-bold">
                                                                                Break Start Time
                                                                            </div>
                                                                            <span className="text-card">{timeConvert(data.breakStartTime) === '12:00 AM' ? '-' : timeConvert(data.breakStartTime)}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            
                                                            </div>
                                                            <div className="row mt-3">
                                                                <div className="col-sm-4">
                                                                    <div className="card shadow">
                                                                        <div className="card-body">
                                                                            <div className="font-weight-bold">
                                                                                Break End Time
                                                                            </div>
                                                                            <span className="text-card">{timeConvert(data.breakEndTime) === '12:00 AM' ? '-' : timeConvert(data.breakEndTime)}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    <div className="card shadow">
                                                                        <div className="card-body">
                                                                            <div className="font-weight-bold">
                                                                                Out Time
                                                                            </div>
                                                                            <span className="text-card">{timeConvert(data.out_time)}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    <div className="card shadow">
                                                                        <div className="card-body">
                                                                            <div className="font-weight-bold">
                                                                                Status
                                                                            </div>
                                                                            <span className="text-card">{data.status}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            <div className="row mt-3">
                                                                <div className="col-sm-4">
                                                                    <div className="card shadow">
                                                                        <div className="card-body">
                                                                            <div className="font-weight-bold">
                                                                                Comments
                                                                            </div>
                                                                            <span className="text-card">{data.comment}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div> 
                                                        </div>
                                                    ))}
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