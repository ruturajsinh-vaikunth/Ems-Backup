import Header from "./Header";
import Sidebar from "./Sidebar";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import {BiArrowBack} from 'react-icons/bi';
import LeavesService from "../services/LeavesService";

export default function ApprovalLeave(){
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();
    


    function approveLeave(){
        LeavesService.ApprovalLeave({_id : state._id, status : "Approve"})
        .then(response => {
            if(response.status === 200){
                alert("Leave Approved")
                navigate("/leaves-admin");
           }
        })
        .catch(e => {
            console.log(e);
        })
    }
     
    function rejectLeave(){
        LeavesService.ApprovalLeave({_id : state._id, status : "Reject"})
        .then(response => {
           if(response.status === 200){
            alert("Leave Rejected")
            navigate("/leaves-admin");
           }
        })
        .catch(e => {
            console.log(e);
        })
    }
    

    return(
        <div>
        <Header/>
        <Sidebar/>
        <div className="container">
            <div className="main-body">
    
                <div className="row gutters-sm">
                    <div className="col-md-12">
                    <NavLink to={{ pathname : "/leaves-admin"}} > 
                       <BiArrowBack  size={30} className="mt-2"/>
                    </NavLink>
                    <div className="card mt-3">
                        <div className="card-body">
                        
                        <p className="mt-2"> Leaves Status of 
                        <NavLink to={{ pathname: "/employee-info"}} state={{ employee_id: state.employee_id}} className="text-primary">
                            { state.employee_id}
                        </NavLink>
                          </p>
                            <div className="row">
                                <div className="card shadow m-2" style={{width: '20rem', backgroundColor: '#'}}>
                                    <div className="card-body m-2">
                                        Leave Date : {state.date}<br/>
                                        Leave Type : {state.type}<br/>
                                        Leave Duration : {state.duration === 1 ? <div>Full Day</div> : 
                                        <div>{state.duration === 0.51 ? <div>Second Half</div> : <div>First Half</div>}
                                        </div>}
                                        
                                        Leave Status: {state.status}<br />

                                        <div className="row mt-3">
                                            <div className="col-sm-3">
                                                <button className="btn btn-primary" onClick={approveLeave}>Approve</button>
                                            </div>
                                            <div className="col-sm-3 ml-5" >
                                                <button className="btn btn-danger" onClick={rejectLeave}>Reject</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}