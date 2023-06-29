import Sidebar from "./Sidebar";
import React, { useEffect} from "react";
import '../styles/content.css';
import {useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
import {BiArrowBack} from 'react-icons/bi'

export default function PdfViewer(){

    const filename = useParams().file;
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const parseJwt = (id) => {
        dispatch(refreshToken({_id : id}))
        
    };


    useEffect(() => {
       
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
                                                    <div className="mr-auto p-2 breadcrumb">
                                                        <h4 className="fw-bolder">{filename}</h4>
                                                    </div>
                                                    <div >
                                                        <button className="btn round btn-icon rounded-circle m-1 mb-2" title="Back" onClick={() => navigate(-1)}>
                                                            <BiArrowBack  size={26} className="pointer-change" />    
                                                        </button>
                                                    </div>
                                            </div>
                                            <div className="separator-breadcrumb border-top"></div>
                                        </div>
                                        <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <div className="card mb-30">
                                                <div className="card-body">

                                                    

                                                    <object data={`http://localhost:5000/public/images/${filename}`} type="application/pdf" width="100%" style={{ maxWidth: '100%'}} height="460px" >
                                                        <p>Alternative text - include a link <a href={`http://localhost:5000/public/images/${filename}`}>to the PDF!</a></p>
                                                    </object>
                           
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
  
