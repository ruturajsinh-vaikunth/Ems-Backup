import Sidebar from "./Sidebar";
import React, { useEffect} from "react";
import { useState } from "react";
import Unauthorized from "./Unauthorized";
import { Link } from 'react-router-dom';
import {useDispatch } from 'react-redux'
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import PoliciesDocumentService from "../services/PoliciesDocumentService";
import {FiFileText} from 'react-icons/fi'


export default function EmployeePoliciesDocuments(){

    const dispatch = useDispatch()
    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);

    const [FirstType, setFirstType] = useState([])
    const [SecondType, setSecondType] = useState([])
    const [LoadmoreShow, setLoadmoreShow] = useState(false)
    const [SecondLoadmoreShow, setSecondLoadmoreShow]  = useState(false)

    const parseJwt = (id) => {
        dispatch(refreshToken({_id : id}))
        
    };

    function AllPoliciesDocuments(){
        PoliciesDocumentService.findAllPoliciesDocuments()
        .then((response) => {
            const Data = response.data

            const First = Data.filter(
                item => item.type.includes("HR Policies and Process")       
            )

            const FirstEight = First.slice(0, 8);

            setFirstType(FirstEight)

            const Second = Data.filter(
                item => item.type.includes("HR Documents")       
            )

            const SecondEight = Second.slice(0, 8);

            setSecondType(SecondEight)

            if(First.length > 8){
                setLoadmoreShow(true)
            }
            else{
                setLoadmoreShow(false)
            }

            if(Second.length > 8){
                setSecondLoadmoreShow(true)
            }
            else{
                setSecondLoadmoreShow(false)
            }
        })
        .catch((e) => {
            console.log(e);
        })
    }       

    function LoadFirstTypeAll(){

       

        PoliciesDocumentService.findAllPoliciesDocuments()
        .then((response) => {
            const Data = response.data

            const First = Data.filter(
                item => item.type.includes("HR Policies and Process")       
            )

            setFirstType(First)
        })
        .catch((e) => {
            console.log(e);
        })


    }

    function LoadSecondTypeAll(){
        PoliciesDocumentService.findAllPoliciesDocuments()
        .then((response) => {
            const Data = response.data

            const Second = Data.filter(
                item => item.type.includes("HR Documents")       
            )

            setSecondType(Second)
        })
        .catch((e) => {
            console.log(e);
        })
    }

    const downloadFile = (fileName) => {
        fetch(`http://localhost:5000/public/images/${fileName}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/pdf',
          },
        })
          .then(response => response.blob())
          .then(blob => {
            const url = window.URL.createObjectURL(new Blob([blob]));
    
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
    
            document.body.appendChild(link);
    
            link.click();
    
            link.parentNode.removeChild(link);
          });
      };
    

    useEffect(() => {
        AllPoliciesDocuments()
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

    if(userInfo.account_type === "Employee"){
        return(
            <div>
                    <Sidebar/>
                    <div className="app-admin-wrap layout-sidebar-large clearfix">
                        <main>
                            <div className="main-content-wrap d-flex flex-column flex-grow-1 sidenav-open">
                                    <div className="main-content">
                                        <div>
                                            <div className="breadcrumb">
                                                <h1>Policies & Document</h1>
                                            </div>
                                            <div className="separator-breadcrumb border-top"></div>
                                        </div>
                                        <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <div className="card">
                                                <div className="card-body">
                        
                                                <Tabs
                                                    defaultActiveKey="ShowHRPoliciesAndProcess"
                                                            id="uncontrolled-tab-example"
                                                            className="mb-3"
                                                            >
                                                            <Tab eventKey="ShowHRPoliciesAndProcess" title="HR Policies and Process">
                                                            <div className="row">
                                                                {FirstType && FirstType.map((data,index) => {
                                                                    return (
                                                                        
                                                                        <div className="col-sm-12 col-md-6 col-lg-3 card-group mb-4"  id="element">
                                                                        <div className="card Documentcard" key={index}>
                                                                        <button className="btn btn-outline btn-lg shadow rounded-circle btn-circle mt-3" style={{borderColor: '#E0E0E0', marginLeft: 'auto', marginRight: 'auto' , height: '80px', width: '37%'}}>
                                                                            <FiFileText size={38} color="blue" className="card-img-top" style={{display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                                                                        </button>
                                                                            <div className="card-body"> 
                                                                                <p className="card-text text-center" style={{fontSize: '13px'}}>{data.file}</p>
                                                                                <div className="row mt-4">
                                                                                    <div className="col-sm-5">
                                                                                        <Link to={`/pdf-viewer/${data.file}`}  style={{textDecoration: 'none'}} className="pointer-change">
                                                                                            <button className="btn btn-outline-primary text-black btn-rounded">View</button>
                                                                                        </Link>
                                                                                    </div>
                                                                                    <div className="col-sm-4">
                                                                                        <button className="btn btn-primary text-black btn-rounded"  onClick={() => downloadFile(data.file)} title={data.file}>Download</button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        </div>
                                                                        
                                                                    )
                                                                    })}

                                                            </div>
                                                            
                                                            {LoadmoreShow === true ? 
                                                                <div className="divider pointer-change">
                                                                    <span></span>
                                                                    <p className="text-center mx-3 mb-0" style={{color: '#a2aab7'}} onClick={() => {setLoadmoreShow(false); LoadFirstTypeAll();}}>Load More</p>
                                                                    <span></span>
                                                                </div> : null
                                                            }
                                                            </Tab>
                                                            
                                                            <Tab eventKey="ShowHRDocuments" title="HR Documents">
                                                            <div className="row">
                                                                {SecondType && SecondType.map((data,index) => {
                                                                    return (
                                                                        <div  className="col-sm-12 col-md-6 col-lg-3 card-group mb-4" key={index}>
                                                                        <div className="card Documentcard" >
                                                                        <button className="btn btn-outline btn-lg  shadow rounded-circle btn-circle mt-3" style={{ borderColor: '#E0E0E0' , marginLeft: 'auto', marginRight: 'auto' , height: '80px', width: '37%'}}>
                                                                            <FiFileText size={38} color="blue" className="card-img-top" style={{display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                                                                        </button>
                                                                            <div className="card-body"> 
                                                                                <p className="card-text text-center" style={{fontSize: '13px'}}>{data.file}</p>
                                                                                <div className="row mt-4">
                                                                                    <div className="col-sm-5">
                                                                                        <Link to={`/pdf-viewer/${data.file}`}  style={{textDecoration: 'none'}} className="pointer-change">
                                                                                            <button className="btn btn-outline-primary text-black btn-rounded">View</button>
                                                                                        </Link>
                                                                                    </div>
                                                                                    <div className="col-sm-4">
                                                                                        <button className="btn btn-primary text-black btn-rounded"  onClick={() => downloadFile(data.file)} title={data.file}>Download</button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                            {SecondLoadmoreShow === true ? 
                                                                <div className="divider pointer-change">
                                                                    <span></span>
                                                                    <p className="text-center mx-3 mb-0" style={{color: '#a2aab7'}} onClick={() => {setSecondLoadmoreShow(false); LoadSecondTypeAll();}}>Load More</p>
                                                                    <span></span>
                                                                </div> : null
                                                            }
                                                            </Tab>
                                                </Tabs>
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