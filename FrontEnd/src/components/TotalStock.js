import Sidebar from "./Sidebar";
import Unauthorized from "./Unauthorized";
import DataTable from 'react-data-table-component';
import React, { useState, useEffect } from 'react';
import AllStocksService from "../services/AllStocksService";
import {BsCartPlus} from 'react-icons/bs';
import {  Modal } from 'react-bootstrap'
import {useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form';
import { getUsers } from "../actions/usersActions";
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";

export default function TotalStock(){

    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);

    const [AllStocksData, setAllStocksData] = useState({});
    const [filterText, setFilterText] = React.useState('');
    const [NameCustomError, setNameCustomError] = useState("");
    const [type, setType] = useState("");
    const [quantity, setquantity] = useState("");

    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [AddUserAlert, setAddUserAlert] = useState(false);

    const dispatch = useDispatch()

    function convert(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear() ].join("-");
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

      const { handleSubmit } = useForm()
    
      const submitForm = () => {
        if(!type ||  /^\s*$/.test(type)){
            setNameCustomError('Please Enter Type')
            return
        }
        else{
            setNameCustomError('')
        }
        AllStocksService.AddStocks(type,quantity)
        .then((response)=>{
            if(response.status === 200){
                getAllStocks();
                handleClose();
                setAddUserAlert(true)
            }
        })

       
      }

      const parseJwt = (id) => {
        dispatch(refreshToken({_id : id}))
    };


    useEffect(() => {
        getAllStocks();
        getUsers();

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

    const columns = [
        {
            name: 'Date',
            selector: row => convert(row.createdAt),
            sortable: true            
        },
        {
            name: 'Type',
            selector: row => row.type,
            sortable: true,
        },
        {
            name: 'Total Quantity',
            selector: row => row.quantity,
            sortable: true,
        },
        {
            name: 'Assign Quantity',
            selector: row => row.assign_quantity,
            sortable: true,
        },
        {
            name: 'Working',
            selector: row => row.in_working_quantity,
            sortable: true,
        },
        {
            name: 'Not Working',
            selector: row => row.not_working_quantity,
            sortable: true,
        },
        {
            name: 'Available',
            selector: row => row.available_quantity,
            sortable: true,
        },
        // {
        //     name: 'Action',
        //     cell: row => (
        //         //eslint-disable-next-line
        //         <RiFileEditFill size={24} color="black" title="Edit" className="pointer-change" onClick={() => {{handleStockEditShow();}}} />
                
        //     )
        // }
    ]

    const paginationComponentOptions = {
        selectAllRowsItem: true,
        selectAllRowsItemText: "ALL"
      };



    function findInValues(arr, value) {
        value = String(value).toLowerCase();
        return arr.filter(o =>
        Object.entries(o).some(entry =>
            String(entry[1]).toLowerCase().includes(value)
        )
        );
  }
  
    const filteredItems = findInValues(data,  filterText);


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
                <div className="col-sm-11">
                    <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
                </div>
            </div>
        
        )
     },[filterText])

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
                                                            <h5 className="fw-bold breadcrumb">Stocks</h5>
                                                        </div>
                                                        <div className="ml-auto p-2">
                                                            <button className="btn btn-primary btn-sm btnadd" type="button" onClick={handleShow} style={{float: 'inline-start'}}>
                                                                <BsCartPlus size={24} className="mr-2 mb-1" color="white" />New Stock
                                                            </button>
                                                        </div>
                                                    
                                                    </div>
                                            <div className="separator-breadcrumb border-top"></div>
                                        </div>
                                        <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <div className="card mb-30">
                                                <div className="card-body">
                                                    
                                                    
                                                    {AddUserAlert === true ?
                                                                    <div style={{fontSize: '16px'}}> 
                                                                        <div className="alert alert-dismissible alert-success">
                                                                            <strong>Stock Added!!</strong> Successfully.
                                                                            <button type="button" className="close" data-dismiss="alert" onClick={() => setAddUserAlert(false)}>X</button>
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

                                                        <Modal show={showModal} onHide={handleClose} animation={false}>
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>Add new Stock</Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                                
                                                            <form onSubmit={handleSubmit(submitForm)} className="g-2 user-form ml-3">
                                                                <div className="row">
                                                                    <div className='col-sm-3'>
                                                                        <label>Type</label>
                                                                        
                                                                    </div>
                                                                    <div className="col-sm-5">
                                                                    <input
                                                                        type='text'
                                                                        className='form-control' value={type} onChange={(e) => setType(e.target.value)} required/>
                                                                        <span className="text-danger">{NameCustomError}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="row mt-3">
                                                                    <div className='col-sm-3'>
                                                                        <label>Quantity</label>
                                                                    </div>
                                                                    <div className='col-sm-5'>
                                                                        <input
                                                                        type='number'
                                                                        className='form-control'
                                                                        value={quantity}
                                                                        onChange={(e) => setquantity(e.target.value)}
                                                                        required
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <hr/>
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