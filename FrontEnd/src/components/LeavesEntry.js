import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";
import Unauthorized from "./Unauthorized";
import {BiArrowBack} from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import LeavesPerYearService from "../services/LeavesPerYearService";
import { useNavigate } from "react-router-dom";
import {useDispatch } from 'react-redux'
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
import '../styles/css/index.d9965542.css'
import '../styles/css/chunk-2014a769.9731fe9b.css'

export default function LeavesEntry(){

    const search = useLocation().search;
    const employee_id = new URLSearchParams(search).get("employee_id");
    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { handleSubmit } = useForm()

    const [earnedLeave , setearnedLeave] = useState("");
    const [casualLeave , setcasualLeave] = useState("");
    const [sickLeave , setsickLeave] = useState("");
    const [compoff , setcompoff] = useState("");
    const [floatingLeave , setfloatingLeave] = useState("");
    const [UpdateAlert, setUpdateAlert] = useState(false);
    const [AddAlert, setAddAlert] = useState(false);

    const [EarnedError, setEarnedError] = useState("")
    const [CasualError, setCasualError] = useState("")
    const [SickError, setSickError] = useState("")
    const [CompError, setCompError] = useState("")
    const [FloatingError, setFloatingError] = useState("")

    const [EntryError, setEntryError] = useState("")



    function LeavesPerYear(){
        LeavesPerYearService.findLeavesbyId(employee_id, new Date().getFullYear())
        .then(response => {
            if(response.data.msg === "No Data"){
                setearnedLeave(0);
                setcasualLeave(0);
                setsickLeave(0);
                setcompoff(0);
                setfloatingLeave(0);
            }else{
                setearnedLeave(response.data.EarnedLeave);
                setcasualLeave(response.data.CasualLeave);
                setsickLeave(response.data.SickLeave);
                setcompoff(response.data.CompOff);
                setfloatingLeave(response.data.FloatingLeave);
            }
        })
        .catch(e => {
            console.log(e);
        })
    }

    const parseJwt = (id) => {
        dispatch(refreshToken({_id : id}))
    };


    useEffect(() => {
        LeavesPerYear();

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


    const submitForm = () => {
        
        if(earnedLeave === 0){
            setEarnedError("Please Add Earned Leave");
            return;
        }
        else{
            setEarnedError("")
        }

        if(casualLeave === 0){
            setCasualError("Please Add Casual Leave");
            return;
        }
        else{
            setCasualError("")
        }

        if(sickLeave === 0){
            setSickError("Please Add Sick Leave");
            return;
        }
        else{
            setSickError("")
        }

        if(compoff === 0){
            setCompError("Please Add Comp off Leave");
            return;
        }
        else{
            setCompError("")
        }

        if(floatingLeave === 0){
            setFloatingError("Please Add Floating Leave");
            return;
        }
        else{
            setFloatingError("")
        }
        
        LeavesPerYearService.AddLeavesperyear(employee_id, earnedLeave, casualLeave, sickLeave, compoff, floatingLeave, new Date().getFullYear())
        .then(response => {
            if(response.data.msg === "Leaves Updated Successfully")
            {
                setUpdateAlert(true);
                setEntryError("");
            }
            if(response.data.msg === "leaves added successfully"){
                setAddAlert(true);
                setEntryError("");
            }
            LeavesPerYear();
        })
        .catch(e => {
              if(e.response.data.msg === "Leave can not be 0 Please Enter Leave value"){
                 setEntryError(e.response.data.msg)
              }
        })
    }

    function handleRedirect(){
        setUpdateAlert(false)
        setAddAlert(false)
        navigate('/users');
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
                                        <div className="d-flex justify-content-between">
                                                        <div className="mr-auto p-2">
                                                            <h4 className="fw-bolder breadcrumb">Leaves Entry of &nbsp;<Link to={`/employee-info/${employee_id}`}  style={{textDecoration: 'none'}} className="pointer-change">{employee_id}</Link>&nbsp; for {new Date().getFullYear()}</h4>
                                                        </div>
                                                        
                                                        <div className="p-2">
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
                                                    
                                                <p className="text-danger">{EntryError}</p>
                                                {UpdateAlert === true ?
                                                    <div  style={{fontSize : '16px'}}> 
                                                        <div className="alert alert-info alert-dismissible fade show">
                                                            <strong>Updated!!</strong> Successfully.
                                                            <button type="button" className="btn-close" data-dismiss="alert" onClick={handleRedirect}></button>
                                                        </div>
                                                    </div> : null
                                                }
                                                {AddAlert === true ?
                                                    <div style={{fontSize : '16px'}}> 
                                                        <div className="alert alert-info alert-dismissible fade show">
                                                            <strong>Added!!</strong> Successfully.
                                                            <button type="button" className="btn-close" data-dismiss="alert" onClick={handleRedirect}></button>
                                                        </div>
                                                    </div> : null
                                                }
                                                <form onSubmit={handleSubmit(submitForm)}  >
                                                <div className="form-group row">
                                                    
                                                    <label className="col-sm-2 col-form-label">Earned Leave</label>
                                                
                                                    <div className="col-sm-4">
                                                        <input type='number' className="form-control" placeholder="Enter no of Earned Leave" value={earnedLeave} onChange={(e) => setearnedLeave(e.target.value)} required />
                                                        <p className="text-danger">{EarnedError}</p>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label">Casual Leave</label>
                                                    
                                                    <div className="col-sm-4">
                                                        <input type='number' className="form-control"  placeholder="Enter no of Casual Leave" value={casualLeave} onChange={(e) => setcasualLeave(e.target.value)} required/>
                                                        <p className="text-danger">{CasualError}</p>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label">Sick Leave</label>
                                                    
                                                    <div className="col-sm-4">
                                                        <input type='number' className="form-control" placeholder="Enter no of Sick Leave" value={sickLeave} onChange={(e) => setsickLeave(e.target.value)} required />
                                                        <p className="text-danger">{SickError}</p>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label">
                                                        Comp off
                                                    </label>
                                                    <div className="col-sm-4">
                                                        <input type='number' className="form-control" placeholder="Enter no of Comp off" value={compoff} onChange={(e) => setcompoff(e.target.value)} required />
                                                        <p className="text-danger">{CompError}</p>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label">
                                                        Floating Leave
                                                    </label>
                                                    <div className="col-sm-4">
                                                        <input type='number' className="form-control" placeholder="Enter no of Floating Leave" value={floatingLeave} onChange={(e) => setfloatingLeave(e.target.value)} required/>
                                                        <p className="text-danger">{FloatingError}</p>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <div className="col-sm-3">
                                                        <button className="btn btn-primary" type="submit">Submit</button>
                                                    </div>
                                                </div>
                                                </form>
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