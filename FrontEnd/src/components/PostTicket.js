import Sidebar from "./Sidebar";
import React, { useEffect, useState} from "react";
import Unauthorized from "./Unauthorized";
import { useForm } from "react-hook-form";
import {useDispatch } from 'react-redux'
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
import TicketService from "../services/TicketService";

export default function PostTicket(){

    const { handleSubmit } = useForm()
    const dispatch = useDispatch()
    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);

    const [PostTicketAlert, setPostTicketAlert] = useState(false)
    const [TicketCategoriesData, setTicketCategoriesData] = useState([])
    const [ticket_category, setticket_category] = useState("")
    const [comment, setcomment] = useState("")

    const [commentError, setcommentError]  = useState("")


    const parseJwt = (id) => {
        dispatch(refreshToken({_id : id}))
        
    };

    function AllTicketCategory(){
        TicketService.allAddTicketCategory()
        .then((response) => {
            setTicketCategoriesData(response.data);
        })
        .catch((e) => {
            console.log(e);
        })
    }


    const submitForm = () => {
        if(!comment ||  /^\s*$/.test(comment)){
            setcommentError('Please Enter comment')
            return
        }
        else{
            setcommentError('')
        }
        TicketService.CreateNewTicket(userInfo.employee_id,ticket_category, comment, userInfo.account_type, userInfo.firstName)
        .then((response)=>{
            if(response.status === 200){
               setticket_category("")
               setcomment("")
               setPostTicketAlert(true)
            }
        })
        .catch((e) => {
            console.log(e);
        })
       
      }


    useEffect(() => {
        AllTicketCategory()
        
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
                                                <h1>Post Ticket</h1>
                                            </div>
                                            <div className="separator-breadcrumb border-top"></div>
                                        </div>
                                        <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <div className="card mb-30">
                                                <div className="card-body">
                                                    {PostTicketAlert === true ?
                                                                        <div style={{fontSize: '16px'}}> 
                                                                            <div className="alert alert-success alert-dismissible">
                                                                                <strong>Ticket Posted!!</strong> Successfully.
                                                                                <button type="button" className="close" data-dismiss="alert" onClick={() => setPostTicketAlert(false)}>X</button>
                                                                            </div>
                                                        </div> : null }
                                                        <form onSubmit={handleSubmit(submitForm)} className="g-2 user-form ml-3">
                                                                        <div className="row">
                                                                            <div className='col-sm-3'>
                                                                                <label>Category</label>
                                                                                
                                                                            </div>
                                                                            <div className="col-sm-5">
                                                                            <select className="custom-select" value={ticket_category} onChange={(e) => setticket_category(e.target.value)} required>
                                                                                <option value="">Select</option>
                                                                                {TicketCategoriesData.map((data, index) => (
                                                                                            <option value={data.category} key={index}>{data.category}</option>
                                                                                ))}
                                                                            </select>
                                                                            </div>
                                                                        </div>

                                                                        <div className="row mt-4">
                                                                            <div className='col-sm-3'>
                                                                                <label>Comment</label>
                                                                            </div>
                                                                            <div className='col-sm-5'>
                                                                            
                                                                                <textarea className='form-control'
                                                                                value={comment}
                                                                                onChange={(e) => setcomment(e.target.value)}
                                                                                required />
                                                                                <p className="text-danger">{commentError}</p>
                                                                            </div>
                                                                        </div>
                                                                            <div className="row d-flex justify-content-end mt-4">
                                                                                <div className="col-sm-2">
                                                                                    <button type='submit' className='btn btn-primary'>
                                                                                        Submit
                                                                                    </button>
                                                                                </div>
                                                                                <div className="col-sm-3">
                                                                                    <button className='btn btn-secondary' type="reset">
                                                                                        Reset
                                                                                    </button>
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