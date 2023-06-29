import Sidebar from "./Sidebar";
import Unauthorized from "./Unauthorized";
import DataTable from 'react-data-table-component';
import {  Modal } from 'react-bootstrap'
import React, { useState, useEffect } from 'react';
import AssetsService from "../services/AssetsService";
import AllStocksService from "../services/AllStocksService";
import {useDispatch } from 'react-redux'
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
import {MdAssignmentReturn} from "react-icons/md";
import {BsCartPlus} from "react-icons/bs"
import { useForm } from "react-hook-form";
import {FaFilter} from "react-icons/fa"

export default function MyAssets(){

    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);

    const [AssetsData, setAssetsData] = useState([]);

    const dispatch = useDispatch()
    const { handleSubmit } = useForm()

    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showNewModal, setNewShow] = useState(false);
    const handleNewClose = () => setNewShow(false);
    const handleNewShow = () => setNewShow(true);

    const [filter, setFilter] = useState("")
    const [view, setview] = useState("My Assets")
    const [ReturnId, setReturnId] = useState("")
    const [ReturnEmployeeId, setReturnEmployeeId] = useState("")
    const [ReturnAssetType, setReturnAssetType] = useState("")
    const [ReturnAssetName, setReturnAssetName] = useState("")
    const [ReturnAssetNumber, setReturnAssetNumber] = useState("")
    const [condition, setcondition] = useState("")
    const [reason, setreason] = useState("")
    const [AllStocksData, setAllStocksData] = useState({});
    const [asset_type, setAsset_type] = useState("")
    const [requestreason, setrequestreason] = useState("")
    const [AssetRequestData, setAssetRequestData] = useState([])

    const [ReturnAssetAlert, setReturnAssetAlert] = useState(false)

    function convert(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear() ].join("-");
    }

    function AssetsDetail(){
          AssetsService.AssetsByEmployeeId(userInfo.employee_id)
            .then((response)=>{
                const Data = response.data
                const AssignedData = Data.filter(
                    // eslint-disable-next-line
                    item => item.assigned.includes("Yes"))
               
                    setAssetsData(AssignedData);
            })
            .catch((e) => {
                console.log(e);
            })
    }

    function getAllStocks(){
        AllStocksService.allstocks()
          .then((response)=>{
              setAllStocksData(response.data);
          })
          .catch((e) => {
              console.log(e);
          })
    }
    
    function AllAssetRequest(){
        AssetsService.GetAssetRequestbyEmployeeId(userInfo.employee_id)
        .then((response) => {
            const Data = response.data
            const request = Data.filter(
                item => item.status.includes("Rejected") || item.status.includes("Pending")
            )
            setAssetRequestData(request)
        })
        .catch((e) => {
            console.log(e);
        })
    }

    const parseJwt = (id) => {
        dispatch(refreshToken({_id : id}))
    };

    

    useEffect(() => {
        AssetsDetail();
        getAllStocks();
        AllAssetRequest();

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

    const AssetsType = []
    for(let i=0; i< AllStocksData.length; i++){
        AssetsType.push({type: AllStocksData[i].type, available: AllStocksData[i].available_quantity})
    }


    const columns = [
        {
            name: 'Asset Number',
            selector: row => row.asset_number,
            sortable: true
        },
        {
            name: 'Assign Date',
            selector: row => convert(row.createdAt),
            sortable: true
        },
        {
            name: 'Asset Type',
            selector: row => row.asset_type,
            sortable: true,
            // width: "fit-content",
            // minWidth: "8%",
            // maxWidth: "11%",
            // width: "11%",
            
        },
        {
            name: 'Asset Name',
            selector: row => row.asset_name,
            sortable: true,
            // width: "fit-content",
            // minWidth: "8%",
            // maxWidth: "11%",
            // width: "11%",
            
        },
        {
            name: 'Quantity',
            selector: row => row.quantity,
            sortable: true,
            // minWidth: "10%",
            // maxWidth: "15%",
            // width: "15%",
        },
        {
            name: 'Action',
            cell: row => (
                //eslint-disable-next-line
                <MdAssignmentReturn size={24} color="black" title="return" className="pointer-change" onClick={() => {{handleShow(); handleReturn(row._id, userInfo.employee_id, row.asset_type, row.asset_name, row.asset_number)};}} />
            )
        }
    ]

    const Requestcolumns = [
        {
            name: 'Request Date',
            selector: row => convert(row.createdAt),
            sortable: true
        },
        {
            name: 'Asset Type',
            selector: row => row.asset_type,
            sortable: true,
        },
        {
            name: 'Reason',
            selector: row => row.reason,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
        }
    ]

    function handleReturn(return_id, return_employee_id, return_asset_type, return_asset_name, return_asset_number){
      setReturnId(return_id)
      setReturnEmployeeId(return_employee_id)
      setReturnAssetType(return_asset_type) 
      setReturnAssetName(return_asset_name) 
      setReturnAssetNumber(return_asset_number)
    }

    function submitForm(){
        AssetsService.AssetsReturnbyId(ReturnId, reason, condition, ReturnAssetType)
        .then((response) => {
            if(response.status === 200){
                handleClose()
                setReturnAssetAlert(true)
                AssetsDetail()
            }
        })
        .catch((e) => {
            console.log(e);
        })
    }

    function submitRequestForm(){
        AssetsService.AssetRequestByEmployeeId(userInfo.employee_id, asset_type, requestreason)
        .then((response) => {
            AllAssetRequest();
            handleNewClose();
            setview("Asset Request")
        })
        .then((e) => {
            console.log(e);
        })
    }

    const paginationComponentOptions = {
        selectAllRowsItem: true,
        selectAllRowsItemText: "ALL"
      };

    function handleFilter(){
        setview(filter)
    }

     if(userInfo.account_type === "Employee"){
        return(
                <div>
                    <Sidebar/>
                    <div className="app-admin-wrap layout-sidebar-large clearfix">
                        <main>
                            <div className="main-content-wrap d-flex flex-column flex-grow-1 sidenav-open">
                                    <div className="main-content">
                                        <div>
                                            <div className="d-flex">
                                                        <div className="p-2">
                                                            <h4 className="fw-bold breadcrumb">My Assets</h4>
                                                        </div>
                                                        <div className="ml-auto p-2">
                                                                    <button className="btn btn-primary btn-sm btnadd" type="button" onClick={handleNewShow}>
                                                                        <BsCartPlus size={24} className="mr-2 mb-1" color="white"  />Request
                                                                    </button>
                                                        </div>
                                                    
                                            </div>
                                            <div className="separator-breadcrumb border-top"></div>
                                        </div>
                                        
                                            
                                            <div className="row gutters-sm mt-2">
                                                <div className="col-md-12">
                                                <div className="card">
                                                    <div className="card-body">

                                                    <div className="row mb-3">
                                                    <div className="col-sm-1">
                                                        <label className="mt-2">Filter</label>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <select className="custom-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
                                                            <option value="My Assets">My Assets</option>
                                                            <option value="Asset Request">Asset Request</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <button className="btn btn-sm btn-primary " onClick={() => handleFilter()}><FaFilter color={'white'} /></button>
                                                    </div>
                                                    
                                                    <Modal show={showNewModal} onHide={handleNewClose} animation={false}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>New Asset Requst</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                        <form onSubmit={handleSubmit(submitRequestForm)} className=" g-2 user-form ml-3">
                                                        
                                                        <div className="row">
                                                                    <div className="col-sm-3">
                                                                        <h6 className="mb-0">Asset Type</h6>
                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                        <select className="custom-select" value={asset_type} onChange={(e) => setAsset_type(e.target.value)} required>
                                                                        <option value="">Select</option>
                                                                        {AssetsType.map((data,index) => (
                                                                            <option key={index} value={data.type}>{data.type}</option>
                                                                        ))}
                                                                            
                                                                        </select>
                                                                    </div>
                                                            </div>
                                                            
                                                            <div className="row mt-3">
                                                                    <div className="col-sm-3">
                                                                        <h6 className="mb-0">Reason</h6>
                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                    <input type="text" className="form-control" value={requestreason} onChange={(e) => setrequestreason(e.target.value)} />
                                                                    </div>
                                                            </div>
                                                            <hr />
                                                                <div className="row d-flex justify-content-end">
                                                                    <div className="col-sm-3">
                                                                        <button type='submit' className='btn btn-primary'>
                                                                            Submit
                                                                        </button>
                                                                    </div>
                                                                    <div className="col-sm-3">
                                                                        <button className='btn btn-secondary' onClick={handleNewClose}>
                                                                            Close
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </Modal.Body>
                                                        </Modal>
                                                   
                                                    </div>
                                                        
                                                    {view === "My Assets" ? 
                                            
                                                    <>
                                                        {ReturnAssetAlert === true ?
                                                        <div style={{fontSize: '16px'}}> 
                                                                        <div className="alert alert-info alert-dismissible">
                                                                            <strong>Asset Return</strong> Successfully.
                                                                            <button type="button" className="close" data-dismiss="alert" onClick={() => setReturnAssetAlert(false)}>X</button>
                                                                        </div>
                                                        </div> : null }
                                                        <DataTable 
                                                            columns={columns}
                                                            data={AssetsData}
                                                            pagination
                                                            paginationComponentOptions={paginationComponentOptions}
                                                        />

                                                        <Modal show={showModal} onHide={handleClose} animation={false}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Asset Return Requst</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                        <form onSubmit={handleSubmit(submitForm)} className="user-form ml-auto mr-auto">
                                                            <div className="row">
                                                                    <div className="col-sm-4">
                                                                    <h6 className="mb-0">Employee Id</h6>
                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                        {ReturnEmployeeId}
                                                                    </div>
                                                            </div>
                                                            
                                                            <div className="row mt-3">
                                                                    <div className="col-sm-4">
                                                                        <h6 className="mb-0">Asset Type</h6>
                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                    {ReturnAssetType}
                                                                    </div>
                                                            </div>
                                                            
                                                            <div className="row mt-3">
                                                                    <div className="col-sm-4">
                                                                        <h6 className="mb-0">Asset Name</h6>
                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                    {ReturnAssetName}
                                                                    </div>
                                                            </div>
                                                            
                                                            <div className="row mt-3">
                                                                    <div className="col-sm-4">
                                                                        <h6 className="mb-0">Asset Number</h6>
                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                    {ReturnAssetNumber}
                                                                    </div>
                                                            </div>
                                                            
                                                            <div className="row mt-3">
                                                                    <div className="col-sm-4">
                                                                        <h6 className="mb-0">Reason</h6>
                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                    <input type="text" className="form-control" value={reason} onChange={(e) => setreason(e.target.value)} />
                                                                    </div>
                                                            </div>
                                                            
                                                            <div className="row mt-3">
                                                                    <div className="col-sm-4">
                                                                        <h6 className="mb-0">Condition</h6>
                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                    <select className="custom-select" value={condition} onChange={(e) => setcondition(e.target.value)} required>
                                                                            <option value="">Select</option>
                                                                            <option value="Working">Working</option>
                                                                            <option value="Not Working">Not Working</option>
                                                                    </select>
                                                                    </div>
                                                            </div>
                                                            <hr />
                                                                <div className="row d-flex justify-content-end">
                                                                    <div className="col-sm-3">
                                                                        <button type='submit' className='btn btn-primary'>
                                                                            Submit
                                                                        </button>
                                                                    </div>
                                                                    <div className="col-sm-3">
                                                                        <button className='btn btn-secondary' onClick={handleClose}>
                                                                            Close
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </Modal.Body>
                                                        </Modal>

                                                       
                                                    </> : 
                                                    <>
                                                     <DataTable 
                                                        columns={Requestcolumns}
                                                        data={AssetRequestData}
                                                        pagination
                                                        paginationComponentOptions={paginationComponentOptions}
                                                    />
                                                    </>
                                                    }
                                                        
                                                        

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