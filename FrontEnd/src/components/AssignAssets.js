import Sidebar from "./Sidebar";
import '../styles/content.css';
import DataTable from 'react-data-table-component';
import React, { useState, useEffect } from 'react';
import AllStocksService from "../services/AllStocksService";
import Unauthorized from "./Unauthorized";
import UserService from "../services/UserService";
import AssetsService from "../services/AssetsService";
import {BsCartPlus} from 'react-icons/bs';
import {  Modal } from 'react-bootstrap'
import {useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { getUsers } from "../actions/usersActions";
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
import {RiFileEditFill} from "react-icons/ri";
import {BsFillCheckCircleFill} from "react-icons/bs";
import {ImCancelCircle} from "react-icons/im";
import {FaFilter} from "react-icons/fa"

export default function AssignAssets(){

    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);

    const [filter, setFilter] = useState("")
    const [view, setview] = useState("Assign Assets")
    const [AllUsers, setAllUsers] = useState([]);
    const [AllStocksData, setAllStocksData] = useState({});
    const [AssetRequestData, setAssetRequestData] = useState([]);
    const [AssetsData, setAssetsData] = useState([]);
    const [filterText, setFilterText] = React.useState('');

    const [employee_id, setEmployeeId] = useState("")
    const [asset_type, setAsset_type] = useState("")
    const [asset_name, setAsset_name] = useState("")

    const [Edit_id, setEditid] = useState("")
    const [Edit_EmployeeId, setEditEmployeeId]  = useState("")
    const [Edit_asset_type, setEditasset_type] = useState("")
    const [Edit_asset_name, setEditasset_name] = useState("")

    const [RequestEmployeeId, setRequestEmployeeId]  = useState("")
    const [RequestAssetType, setRequestAssetType]  = useState("")
    const [RequestAssetName, setRequestAssetName]  = useState("")

    const [EmployeeIdError, setEmployeeIdError] = useState("")
    const [AssetNameError, setAssetNameError] = useState("")
    const [AssetTypeError, setAssetTypeError] = useState("")

    const [EditEmployeeIdError, setEditEmployeeIdError] = useState("")
    const [EditAssetNameError, setEditAssetNameError] = useState("")
    const [EditAssetTypeError, setEditAssetTypeError] = useState("")

    const [RequestId, setRequestId] = useState("")
    const [RequestEmployeeIdError, setRequestEmployeeIdError] = useState("")
    const [RequestAssetNameError, setRequestAssetNameError] = useState("")
    const [RequestAssetTypeError, setRequestAssetTypeError] = useState("")

    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showEditModal, setEditShow] = useState(false)
    const handleEditClose = () => setEditShow(false);
    const handleEditShow = () => setEditShow(true)

    
    const [showRequestModal, setRequestShow] = useState(false)
    const handleRequestClose = () => setRequestShow(false);
    const handleRequestShow = () => setRequestShow(true)

    const [AssignAssetAlert, setAssignAssetAlert] = useState(false);
    const [EditAssignAssetAlert, setEditAssignAssetAlert] = useState(false);
    const [RejectRequestAlert, setRejectRequestAlert] = useState(false);

    const dispatch = useDispatch()

    function getAllusers(){
        UserService.allUsers()
        .then(response => {
            setAllUsers(response.data);
        })
        .catch(e => {
            console.log(e);
        })
    }


    const AllEmployeeId = []
    for(let i=1; i< AllUsers.length; i++){
        AllEmployeeId.push({employee_id : AllUsers[i].employee_id, Name: AllUsers[i].firstName})
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

    function AssetsDetails(){
        AssetsService.AssignDetails()
        .then((response) => {
            setAssetsData(response.data);
            
        })
        .catch((e) => {
            console.log(e);
        })
    }

    function AssetRequestDetails(){
        AssetsService.AllAssetRequestData()
        .then((response) => {
            const Data = response.data
            const request = Data.filter(
                item => item.status.includes("Pending")
            )
            setAssetRequestData(request);
        })
        .catch((e) => {
            console.log(e);
        })
    }

      const { handleSubmit } = useForm()
    
      const submitForm = () => {
        if(!employee_id || employee_id === "" ){
            setEmployeeIdError('Please select employeeid')
            return
        }
        else{
            setEmployeeIdError('')
        }
        if(!asset_type || asset_type === "" ){
            setAssetTypeError('Please select type')
            return
        }
        else{
            setAssetTypeError('')
        }
        if(!asset_name || /^\s*$/.test(asset_name) ){
            setAssetNameError('Please Enter Asset name')
            return
        }
        else{
            setAssetNameError('')
        }

        AssetsService.AssignNewAsset(employee_id,asset_type,asset_name)
        .then((response) => {
            if(response.status === 200){
                AssetsDetails()
                handleClose()
                setAssignAssetAlert(true)
            }
        })
        .catch((e) => {
            console.log(e);
        })
       
      }

      const submitEditForm = () => {
        if(!Edit_EmployeeId || Edit_EmployeeId === "" ){
            setEditEmployeeIdError('Please select employeeid')
            return
        }
        else{
            setEditEmployeeIdError('')
        }
        if(!Edit_asset_type || Edit_asset_type === "" ){
            setEditAssetTypeError('Please select type')
            return
        }
        else{
            setEditAssetTypeError('')
        }
        if(!Edit_asset_name || /^\s*$/.test(Edit_asset_name) ){
            setEditAssetNameError('Please Enter Asset name')
            return
        }
        else{
            setEditAssetNameError('')
        }

        AssetsService.AssetsEditbyId(Edit_id, Edit_EmployeeId, Edit_asset_type, Edit_asset_name)
        .then((response) => {
            if(response.status === 200){
                AssetsDetails()
                handleEditClose()
                setEditAssignAssetAlert(true)
            }
        })
        .catch((e) => {
            console.log(e);
        })
      }

      const submitRequestForm = () => {

        if(!RequestEmployeeId || RequestEmployeeId === "" ){
            setRequestEmployeeIdError('Please select employeeid')
            return
        }
        else{
            setRequestEmployeeIdError('')
        }
        if(!RequestAssetType || RequestAssetType === "" ){
            setRequestAssetTypeError('Please select type')
            return
        }
        else{
            setRequestAssetTypeError('')
        }
        if(!RequestAssetName || /^\s*$/.test(RequestAssetName) ){
            setRequestAssetNameError('Please Enter Asset name')
            return
        }
        else{
            setRequestAssetNameError('')
        }

        AssetsService.AssignRequestedAsset(RequestId, RequestEmployeeId, RequestAssetType, RequestAssetName)
        .then((response) => {
            if(response.status === 200){
                AssetRequestDetails()
                AssetsDetails()
                handleRequestClose()
                setAssignAssetAlert(true)
            }
        })
        .catch((e) => {
            console.log(e);
        })
       
      
      }

      const RejectAssetRequest = (_id) => {
        AssetsService.RejectAssetRequest(_id)
        .then((response) => {
            if(response.status === 200){
                AssetRequestDetails()
                setRejectRequestAlert(true)

            }
        })
        .catch((e) => {
            console.log(e);
        })
      }

      const parseJwt = (id) => {
        dispatch(refreshToken({_id : id}))
    };

    

    useEffect(() => {
        getAllStocks();
        getUsers();
        getAllusers();
        AssetsDetails();
        AssetRequestDetails();

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

    const data = [];
    let length = AllStocksData.length;
    for(let i = 0; i < length; i++){
        data.push(AllStocksData[i]);
    }

    const AssetsType = []
    for(let i=0; i< AllStocksData.length; i++){
        AssetsType.push({type: AllStocksData[i].type, available: AllStocksData[i].available_quantity})
    }

    const columns = [
        {
            name: 'Asset Number',
            selector: row => row.asset_number,
            sortable: true,
            // width: "fit-content",
            // minWidth: "8%",
            // maxWidth: "11%",
            cell: row => (
                <Link to={`/asset-info/${row.asset_number}`}  style={{textDecoration: 'none'}} className="pointer-change">
                    {row.asset_number}
                </Link>
            )
        },
        {
            name: 'Employee Id',
            selector: row => row.employee_id,
            sortable: true,
            // width: "fit-content",
            // minWidth: "8%",
            // maxWidth: "11%",
            // width: "11%",
            cell: row => (
                <Link to={`/employee-info/${row.employee_id}`}  style={{textDecoration: 'none'}} className="pointer-change">
                    {row.employee_id}
                </Link>
            )
            
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
            name: 'Assigned',
            selector: row => row.assigned,
            sortable: true,
            // minWidth: "10%",
            // maxWidth: "15%",
            // width: "15%",
        },
        {
            name: 'Condition',
            selector: row => row.condition,
        },
        {
            name: 'Action',
            cell: row => (
                <>
                {row.assigned === "Yes" ?
                //eslint-disable-next-line
                <RiFileEditFill size={24} color="black" title="Edit" className="pointer-change" onClick={() => {{handleEditShow(); handleEditEntry(row._id, row.employee_id, row.asset_type, row.asset_name);}}} />
                : null }
                </>
            )
        }
    ]

    const Requestcolumns = [
        {
            name: 'Employee Id',
            selector: row => row.employee_id,
            sortable: true,
            cell: row => (
                <Link to={`/employee-info/${row.employee_id}`}  style={{textDecoration: 'none'}} className="pointer-change">
                    {row.employee_id}
                </Link>
            )
            
        },
        {
            name: 'Asset Type',
            selector: row => row.asset_type,
            sortable: true,
        },
        {
            name: 'Reason',
            selector: row => row.reason,
        },
        {
            name: 'Status',
            selector: row => row.status,
        },
        {
            name: 'Action',
            cell: row => (
                <>
                <BsFillCheckCircleFill size={24} color="black" title="Approve" className="pointer-change" onClick={() => {{
                    handleRequestShow(); 
                    handleRequestEntry(row._id, row.employee_id, row.asset_type)
                }}} />
                <ImCancelCircle size={26} color="black" title="Reject"  className="pointer-change ml-3" onClick={() => RejectAssetRequest(row._id)} />
                </>
                )
        }
    ]

    const paginationComponentOptions = {
        selectAllRowsItem: true,
        selectAllRowsItemText: "ALL"
      };

    function handleEditEntry(EditId, EditEmployeeId, EditAssetType, EditAssetName){
       setEditid(EditId)
       setEditEmployeeId(EditEmployeeId) 
       setEditasset_type(EditAssetType)
       setEditasset_name(EditAssetName)
    }

    function handleRequestEntry(req_id, req_employee_id, req_asset_type){
        setRequestId(req_id)
        setRequestEmployeeId(req_employee_id)
        setRequestAssetType(req_asset_type)
    }


    function findInValues(arr, value) {
        value = String(value).toLowerCase();
        return arr.filter(o =>
        Object.entries(o).some(entry =>
            String(entry[1]).toLowerCase().includes(value)
        )
        );
  }
  
    const filteredItems = findInValues(AssetsData,  filterText);


     const FilterComponent = ({ filterText, onFilter, onClear }) => (
            <div className="buttonIn">
                <input
                    id="search"
                    type="text"
                    placeholder="Search.."
                    aria-label="Search Input"
                    value={filterText}
                    onChange={onFilter}
                    autoFocus="autoFocus"
                    className="form-control"
                    style={{height: '38px'}}
                />

            </div>
        );

     const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if(filterText){
                setFilterText('');
            }
        };
        return (
            <div className="row">
                <div className="col-sm-12">
                    <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
                </div>
            </div>
        
        )
     },[filterText])

     function handleFilter(){
        setview(filter)
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
                                           
                                            <div className="d-flex">
                                                        <div className="p-2">
                                                            <h4 className="fw-bold breadcrumb">Assets</h4>
                                                        </div>
                                                        <div className="ml-auto p-2">
                                                                    <button className="btn btn-primary btn-sm btnadd" type="button" onClick={handleShow} >
                                                                        <BsCartPlus size={24} className="mr-2 mb-1" color="white" />Assign Asset
                                                                    </button>
                                                        </div>
                                            </div>
                                            <div className="separator-breadcrumb border-top"></div>
                                        </div>
                                        
                                           
                                            <div className="row gutters-sm mt-2">
                                                <div className="col-md-12">
                                                <div className="card">
                                                    <div className="card-body">
                                                
                                                    <div className="row mb-5">
                                                        <div className="col-sm-1">
                                                            <label className="mt-2">Filter</label>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <select className="custom-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
                                                                <option value="Assign Assets">Assign Assets</option>
                                                                <option value="Asset Request">Asset Request</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <button className="btn btn-sm btn-primary" onClick={() => handleFilter()}><FaFilter color={'white'} /></button>
                                                        </div>
                                                        
                                                    </div>

                                                    <Modal show={showModal} onHide={handleClose} animation={false}>
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>Assign New Asset</Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                            <form onSubmit={handleSubmit(submitForm)} className=" g-2 user-form ml-3">
                                                            <div className="row">
                                                                        <div className="col-sm-3">
                                                                        <h6 className="mb-0">Employee</h6>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                        <select className="custom-select" value={employee_id} onChange={(e) => setEmployeeId(e.target.value)} required>
                                                                            <option value="">Select</option>
                                                                            {AllEmployeeId.map((data,index) => (
                                                                                <option key={index} value={data.employee_id}>{data.Name}({data.employee_id})</option>
                                                                            ))}
                                                                        </select>
                                                                        <p className="text-danger">{EmployeeIdError}</p>
                                                                        </div>
                                                                </div>
                                                                
                                                                <div className="row mt-3">
                                                                        <div className="col-sm-3">
                                                                            <h6 className="mb-0">Asset Type</h6>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                            <select className="custom-select" value={asset_type} onChange={(e) => setAsset_type(e.target.value)} required>
                                                                            <option value="">Select</option>
                                                                            {AssetsType.map((data,index) => (
                                                                                <option key={index} value={data.type}>{data.type}({data.available})</option>
                                                                            ))}
                                                                                
                                                                            </select>
                                                                        <p className="text-danger">{AssetTypeError}</p>
                                                                        </div>
                                                                </div>
                                                                
                                                                <div className="row mt-3">
                                                                        <div className="col-sm-3">
                                                                            <h6 className="mb-0">Asset Name</h6>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                        <input type="text" className="form-control" value={asset_name} onChange={(e) => setAsset_name(e.target.value)} />
                                                                        <p className="text-danger">{AssetNameError}</p>
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

                                                    {view === "Assign Assets" ?  

                                                    <>
                                                    {AssignAssetAlert === true ?
                                                    <div style={{fontSize: '16px'}}> 
                                                                        <div className="alert alert-dismissible alert-success">
                                                                            <strong>Assign Asset</strong> Successfully.
                                                                            <button type="button" className="close" data-dismiss="alert" onClick={() => setAssignAssetAlert(false)}>X</button>
                                                                        </div>
                                                    </div> : null }
                                                    {EditAssignAssetAlert === true ?
                                                        <div style={{fontSize: '16px'}}> 
                                                                            <div className="alert alert-dismissible alert-success">
                                                                                <strong>Edit Assign Asset Entry</strong> Successfully.
                                                                                <button type="button" className="close" data-dismiss="alert" onClick={() => setEditAssignAssetAlert(false)}>X</button>
                                                                            </div>
                                                        </div> : null }
                                                
                                                        <DataTable 
                                                            columns={columns}
                                                            data={filteredItems}
                                                            subHeader
                                                            subHeaderComponent={subHeaderComponentMemo}
                                                            pagination
                                                            paginationComponentOptions={paginationComponentOptions}
                                                        />

                                                        

                                                        <Modal show={showEditModal} onHide={handleEditClose} animation={false}>
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>Edit Assign Asset</Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                            <form onSubmit={handleSubmit(submitEditForm)} className=" g-2 user-form ml-3">
                                                            <div className="row">
                                                                        <div className="col-sm-3">
                                                                        <h6 className="mb-0">Employee</h6>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                        <select className="custom-select" value={Edit_EmployeeId} onChange={(e) => setEditEmployeeId(e.target.value)} required>
                                                                            <option value="">Select</option>
                                                                            {AllEmployeeId.map((data,index) => (
                                                                                <option key={index} value={data.employee_id}>{data.Name}({data.employee_id})</option>
                                                                            ))}
                                                                        </select>
                                                                        <p className="text-danger">{EditEmployeeIdError}</p>
                                                                        </div>
                                                                </div>
                                                                
                                                                <div className="row mt-3">
                                                                        <div className="col-sm-3">
                                                                            <h6 className="mb-0">Asset Type</h6>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                            <select className="custom-select" value={Edit_asset_type} onChange={(e) => setEditasset_type(e.target.value)} required>
                                                                            <option value="">Select</option>
                                                                            {AssetsType.map((data,index) => (
                                                                                <option key={index} value={data.type}>{data.type}</option>
                                                                            ))}
                                                                                
                                                                            </select>
                                                                        <p className="text-danger">{EditAssetTypeError}</p>
                                                                        </div>
                                                                </div>
                                                                
                                                                <div className="row mt-3">
                                                                        <div className="col-sm-3">
                                                                            <h6 className="mb-0">Asset Name</h6>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                        <input type="text" className="form-control" value={Edit_asset_name} onChange={(e) => setEditasset_name(e.target.value)} />
                                                                        <p className="text-danger">{EditAssetNameError}</p>
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
                                                                            <button className='btn btn-secondary' onClick={handleEditClose}>
                                                                                Close
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </Modal.Body>
                                                        </Modal>
                                                    </>  :
                                                    <>
                                                        {AssignAssetAlert === true ?
                                                                            <div style={{fontSize: '16px'}}> 
                                                                                <div className="alert alert-dismissible alert-success">
                                                                                    <strong>Assign Asset</strong> Successfully.
                                                                                    <button type="button" className="close" data-dismiss="alert" onClick={() => setAssignAssetAlert(false)}>X</button>
                                                                                </div>
                                                            </div> : null }
                                                            {RejectRequestAlert === true ?
                                                                            <div style={{fontSize: '16px'}}> 
                                                                                <div className="alert alert-dismissible alert-success">
                                                                                    <strong>Asset Request Rejected</strong>
                                                                                    <button type="button" className="close" data-dismiss="alert" onClick={() => setRejectRequestAlert(false)}>X</button>
                                                                                </div>
                                                            </div> : null }
                                                        <DataTable 
                                                            columns={Requestcolumns}
                                                            data={AssetRequestData}
                                                            pagination
                                                            paginationComponentOptions={paginationComponentOptions}
                                                        />

                                                        <Modal show={showRequestModal} onHide={handleRequestClose} animation={false}>
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>Assign New Asset</Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                            <form onSubmit={handleSubmit(submitRequestForm)} className="user-form ml-auto mr-auto">
                                                            <div className="row">
                                                                        <div className="col-sm-3">
                                                                        <h6 className="mb-0">Employee</h6>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                        <select className="custom-select" value={RequestEmployeeId} onChange={(e) => setRequestEmployeeId(e.target.value)} required>
                                                                            <option value="">Select</option>
                                                                            {AllEmployeeId.map((data,index) => (
                                                                                <option key={index} value={data.employee_id}>{data.Name}({data.employee_id})</option>
                                                                            ))}
                                                                        </select>
                                                                        <p className="text-danger">{RequestEmployeeIdError}</p>
                                                                        </div>
                                                                </div>
                                                                
                                                                <div className="row mt-3">
                                                                        <div className="col-sm-3">
                                                                            <h6 className="mb-0">Asset Type</h6>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                            <select className="custom-select" value={RequestAssetType} onChange={(e) => setRequestAssetType(e.target.value)} required>
                                                                            <option value="">Select</option>
                                                                            {AssetsType.map((data,index) => (
                                                                                <option key={index} value={data.type}>{data.type}({data.available})</option>
                                                                            ))}
                                                                                
                                                                            </select>
                                                                        <p className="text-danger">{RequestAssetTypeError}</p>
                                                                        </div>
                                                                </div>
                                                                
                                                                <div className="row mt-3">
                                                                        <div className="col-sm-3">
                                                                            <h6 className="mb-0">Asset Name</h6>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                        <input type="text" className="form-control" value={RequestAssetName} onChange={(e) => setRequestAssetName(e.target.value)} />
                                                                        <p className="text-danger">{RequestAssetNameError}</p>
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
                                                                            <button className='btn btn-secondary' onClick={handleRequestClose}>
                                                                                Close
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </Modal.Body>
                                                        </Modal>
                                                    </> }
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