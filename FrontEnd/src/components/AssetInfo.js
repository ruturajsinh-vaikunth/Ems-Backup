import Sidebar from "./Sidebar";
import React, { useState , useEffect} from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import {useDispatch } from 'react-redux'
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
import {BiArrowBack} from 'react-icons/bi';
import AssetsService from "../services/AssetsService";
import Unauthorized from "./Unauthorized";

export default function AssetInfo(){

    const asset_number = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch()
    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);

    const [AssetInfo, setAssetInfo] = useState([]);

    const parseJwt = (id) => {
        dispatch(refreshToken({_id : id}))
        
    };

    function AssetInfobyNumber(){
        AssetsService.findAssetInfoByNumber(asset_number.asset_number)
        .then((response) => {
            setAssetInfo(response.data);
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
        AssetInfobyNumber();
        
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
                                                        <h4 className="fw-bolder breadcrumb">Asset info</h4>
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
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                        <div className="card mb-30">
                                            <div className="card-body">
                                                
                                                {AssetInfo.map((data, index) => (
                                                    <div className="d-flex justify-content-start container " key={index}>
                                                    <div className="p-1 bg-white" style={{width: '410px'}}>
                                                        
                                                        <div className="text-center mt-1"><img src="https://cdn-icons-png.flaticon.com/512/3577/3577005.png" alt="img-product" width="150"></img>
                                                            <div>
                                                                <h4>{data.asset_type}</h4>
                                                                <h6 className="mt-0 text-black-50">{data.asset_name}</h6>
                                                            </div>
                                                        </div>
                                                        <div className="stats mt-1">
                                                        <div className="d-flex justify-content-between"><span className="fw-bold">Asset Number</span><span>{data.asset_number}</span></div>
                                                            {data.assigned === "Yes" ?
                                                                <div className="d-flex justify-content-between">
                                                                    <span className="fw-bold">Assign to</span>
                                                                    <span><Link to={`/employee-info/${data.employee_id}`}  style={{textDecoration: 'none'}} className="pointer-change">
                                                                                {data.employee_id}</Link>
                                                                    </span>
                                                                </div> : null
                                                            }
                                                            
                                                            <div className="d-flex justify-content-between"><span className="fw-bold">Assign Date</span><span>{convert(data.createdAt)}</span></div>
                                                            <div className="d-flex justify-content-between"><span className="fw-bold">Return Date</span>
                                                                    {convert(data.return_date) === "aN-aN-NaN" ? <span>-</span> : <span>{convert(data.return_date)}</span>}
                                                            </div>
                                                            <div className="d-flex justify-content-between"><span className="fw-bold">Condition</span><span>{data.condition}</span></div>
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