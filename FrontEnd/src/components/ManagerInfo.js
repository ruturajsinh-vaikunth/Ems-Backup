import Sidebar from "./Sidebar";
import Unauthorized from "./Unauthorized";
import  { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {useDispatch } from 'react-redux'
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
import UserService from "../services/UserService";
import {BiArrowBack} from 'react-icons/bi'

export default function ManagerInfo(){

    
    const dispatch = useDispatch()
    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);
    const navigate = useNavigate()

    const employee_id = useParams().employee_id;

    const [Name, setName] = useState("");
    const [UserEmail, setUserEmail] = useState("");
    const [AccountType, setAccountType] = useState("");
    const [ProfileImg, setProfileImg] = useState("");



    const parseJwt = (id) => {
        dispatch(refreshToken({_id : id}))
    };



    function getAdminDetail(){
        UserService.getManagerbyEmpId(employee_id)
        .then((res) => {
            setName(res.data.firstName)
            setUserEmail(res.data.email)
            setAccountType(res.data.account_type)
            setProfileImg(res.data.profileimg)
        })
        .catch((e) => {
            console.log(e);
        })
     }

    useEffect(() => {
        getAdminDetail()
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


    if(userInfo.account_type === "Admin"){
        return(
                <div>
                <Sidebar/>
                    <div className="app-admin-wrap layout-sidebar-large clearfix">
                        <main>
                            <div className="main-content-wrap d-flex flex-column flex-grow-1 sidenav-open">
                                    <div className="main-content">
                                        <div>
                                            <div className="d-flex justify-content-between">
                                                    <div className="breadcrumb p-2">
                                                        <h1>Manager Profile</h1>
                                                    </div>
                                                    <div className="p-2">
                                                        <button className="btn round  btn-icon rounded-circle m-1 mb-2" title="Back" onClick={() => navigate(-1)}>
                                                            <BiArrowBack  size={24} className="pointer-change" />    
                                                        </button>
                                                    </div>
                                            </div> 
                                            <div className="separator-breadcrumb border-top"></div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-12 col-md-12 col-lg-6">
                                                <div className="card card-profile-1 mb-30">
                                                    <div className="card-body">
                                                    <div className="d-flex flex-column align-items-center text-center">
                            
                                                        <div className="profile-pic">
                                                            <label className="-label">
                                                                <span className="glyphicon glyphicon-camera"></span>
                                                            </label>
                                                            
                                                            {ProfileImg === undefined ? 
                                                                <img  src='https://cdn-icons-png.flaticon.com/512/1946/1946429.png' alt="Admin"  className="rounded-circle profile-img" width="150"></img>
                                                                    :
                                                                   <img  src={`http://localhost:5000/public/images/${ProfileImg}`} alt="Admin"  className="rounded-circle profile-img" width="150"></img>
                                                                }
                                                            
                                                        </div>
                                                        

                                                        <div className="mt-3">
                                                        <h4>{Name}</h4>
                                                        <p className="text-secondary mb-1">{UserEmail}</p>
                                                        <p className="text-muted font-size-sm">{AccountType}</p>
                                                        </div>
                                                        
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-12 col-lg-6">
                                                <div className="card mb-30">
                                                    <div className="card-body">
                                                    <div className="row">
                                                    <div className="col-sm-4">
                                                        <h5 className="mb-0">Name</h5>
                                                    </div>
                                                    <div className="col-sm-8 text-muted">
                                                    <h5 className="mb-0">{Name}</h5>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-4">
                                                        <h5 className="mb-0">Email</h5>
                                                    </div>
                                                    <div className="col-sm-8 text-muted">
                                                    <h5 className="mb-0">{UserEmail}</h5>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-4">
                                                        <h5 className="mb-0">Designation</h5>
                                                    </div>
                                                    <div className="col-sm-8 text-muted">
                                                    <h5 className="mb-0">{AccountType}</h5>
                                                    </div>
                                                </div>
                                                <hr />
                                                
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