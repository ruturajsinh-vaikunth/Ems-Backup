import Sidebar from "./Sidebar";
import React, { useState , useEffect} from "react";
import {useDispatch } from 'react-redux'
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
import {BiArrowBack} from 'react-icons/bi';
import { useNavigate, useParams } from "react-router-dom";
import ExpenseService from "../services/ExpenseService";

export default function ExpenseInfo(){

    const _id = useParams();

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [ExpenseInfo, setExpenseInfo] = useState([]);

    const parseJwt = (id) => {
        dispatch(refreshToken({_id : id}))
        
    };

    function ExpenseInfobyid(){
        ExpenseService.ExpensebyId(_id)
        .then((response) => {
            setExpenseInfo(response.data);
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

    

    useEffect(() => {
        ExpenseInfobyid()
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
                                                            <h4 className="fw-bolder breadcrumb">Expense info</h4>
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
                                                    {ExpenseInfo.map((data, index) => (
                                                        <div key={index}>
                                                            <div className="row">
                                                                <div className="col-sm-4">
                                                                    <div className="card shadow card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center">
                                                                        <div className="card-body">
                                                                            <i className="i-Calendar-4"></i>
                                                                            <div className="content">
                                                                                <p className="text-muted mt-2 mb-0">Date</p>
                                                                                <p className="text-primary text-18 line-height-1 mb-2"> 
                                                                                    {convert(data.date)}</p>
                                                                            </div>
                                                                            
                                                                        </div>
                                                                        </div>
                                                                    
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    <div className="card shadow card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center">
                                                                        <div className="card-body">
                                                                            <i className="i-Twitter-2"></i>
                                                                            <div className="content">
                                                                                <p className="text-muted mt-2 mb-0">Title</p>
                                                                                <p className="text-primary text-18 line-height-1 mb-2"> 
                                                                                    {data.title}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    <div className="card shadow card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center">
                                                                        <div className="card-body">
                                                                            <i className="i-Money-2"></i>
                                                                            <div className="content">
                                                                                <p className="text-muted mt-2 mb-0">Amount</p>
                                                                                <p className="text-primary text-18 line-height-1 mb-2"> 
                                                                                    {data.amount}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            
                                                            </div>
                                                            <div className="row mt-3">
                                                                <div className="col-sm-4">
                                                                    <div className="card shadow card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center">
                                                                        <div className="card-body">
                                                                            <i className="i-Information"></i>
                                                                            <div className="content">
                                                                                <p className="text-muted mt-2 mb-0">Description</p>
                                                                                <span className="text-primary text-13 line-height-1 mb-2"> 
                                                                                    {data.description}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    <div className="card shadow card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center">
                                                                        <div className="card-body">
                                                                            <i className="i-Add-User"></i>
                                                                            <div className="content">
                                                                                <p className="text-muted mt-2 mb-0">Added By</p>
                                                                                <p className="text-primary text-18 line-height-1 mb-2"> 
                                                                                    {data.addedby}</p>
                                                                            </div>
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
                        </main>
                    </div>
            </div>
            )
    }