import Sidebar from "./Sidebar";
import React, { useEffect} from "react";
import { useState } from "react";
import Unauthorized from "./Unauthorized";
import {useDispatch } from 'react-redux'
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
import {BsCartPlus} from 'react-icons/bs';
import {  Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import TicketService from "../services/TicketService";
import DataTable from 'react-data-table-component';
import {TbEdit} from 'react-icons/tb'

export default function TicketCategories(){


    const dispatch = useDispatch()
    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);

    const { handleSubmit } = useForm()

    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showEditModal, setEditShow] = useState(false);
    const handleEditClose = () => setEditShow(false);
    const handleEditShow = () => setEditShow(true);

    const [category, setcategory] = useState("")
    const [categoryError, setcategoryError] = useState("")
    const [EditcategoryError, setEditcategoryError] = useState("")
    const [AlreadyError, setAlreadyError]  = useState("")
    const [EditAlreadyError, setEditAlreadyError]  = useState("")
    const [CategoryAddAlert, setCategoryAddAlert] = useState(false)
    const [CategoryEditAlert, setCategoryEditAlert] = useState(false)
    const [TicketCategoriesData, setTicketCategoriesData] = useState([])
    const [Editcategory, setEditcategory]  = useState("")
    const [Editid, setEditid] = useState("")

    const parseJwt = (id) => {
        dispatch(refreshToken({_id : id}))
        
    };


    const submitForm = () => {
        if(!category ||  /^\s*$/.test(category)){
            setcategoryError('Please Enter Category')
            return
        }
        else{
            setcategoryError('')
        }

        TicketService.AddTicketCategory(category)
        .then((response)=>{
            if(response.status === 200){
                handleClose();
                setcategory("")
                setAlreadyError("");
                setCategoryAddAlert(true)
                AllTicketCategory();
            }
        })
        .catch((e) => {
            setAlreadyError(e.response.data.msg);
        })

       
    }

    const submitEditForm = () => {
        if(!Editcategory ||  /^\s*$/.test(Editcategory)){
            setEditcategoryError('Please Enter Category')
            return
        }
        else{
            setEditcategoryError('')
        }


        TicketService.EditTicketCategory(Editcategory, Editid)
        .then((response)=>{
            if(response.status === 200){
                setEditAlreadyError("")
                handleEditClose();
                setCategoryEditAlert(true)
                AllTicketCategory();
            }
        })
        .catch((e) => {
            setEditAlreadyError(e.response.data.msg);
        })

       
    }

    function AllTicketCategory(){
        TicketService.allAddTicketCategory()
        .then((response) => {
            setTicketCategoriesData(response.data);
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


    const columns = [
        {
            name: 'Category',
            selector: row => row.category,
            sortable: true            
        },
        {
            name: 'Action',
            cell: row => (
                //eslint-disable-next-line
                    <TbEdit size={24} color="black"  title="Edit" style={{textDecoration: 'none'}} className="pointer-change" onClick={() => {{handleEditShow(); handleEditcategory(row.category, row._id) }}}/>
                
            )
        }
    ]

    function handleEditcategory(edit_category, edit_id){
        setEditcategory(edit_category)
        setEditid(edit_id)
    }

    const paginationComponentOptions = {
        selectAllRowsItem: true,
        selectAllRowsItemText: "ALL"
      };

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
                                                        <div className="p-1">
                                                            <h4 className="fw-bold breadcrumb">Ticket Categories</h4>
                                                        </div>
                                                        <div className="ml-auto p-2">
                                                            <button className="btn btn-primary btn-sm btnadd" type="button" onClick={handleShow} style={{float: 'inline-start'}}>
                                                                <BsCartPlus size={24} className="mr-2 mb-1" color="white" />Category
                                                            </button>
                                                        </div>
                                                    
                                            </div>
                                            <div className="separator-breadcrumb border-top"></div>
                                        </div>
                                        <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <div className="card mb-30">
                                                <div className="card-body">
                                                    
                                                    {CategoryAddAlert === true ?
                                                                    <div style={{fontSize: '16px', marginTop: '10px'}}> 
                                                                        <div className="alert alert-dismissible alert-success">
                                                                            <strong className="text-secondary">Ticket Category Added!!</strong>
                                                                            <button type="button" className="close" data-dismiss="alert" onClick={() => setCategoryAddAlert(false)}>X</button>
                                                                        </div>
                                                    </div> : null }
                                                    {CategoryEditAlert === true ?
                                                                    <div style={{fontSize: '16px', marginTop: '10px'}}> 
                                                                        <div className="alert alert-dismissible alert-success">
                                                                            <strong className="text-secondary">Ticket Category Updated!!</strong>
                                                                            <button type="button" className="close" data-dismiss="alert" onClick={() => setCategoryEditAlert(false)}>X</button>
                                                                        </div>
                                                    </div> : null }
                                                    <DataTable 
                                                            columns={columns}
                                                            data={TicketCategoriesData}
                                                            pagination
                                                            paginationComponentOptions={paginationComponentOptions}
                                                        />
                                                    <Modal show={showModal} onHide={handleClose} animation={false}>
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>Add Category</Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                                
                                                            <form onSubmit={handleSubmit(submitForm)} className="user-form ml-auto mr-auto">
                                                            <div className="row">
                                                                    <div className='col-sm-3'>
                                                                        <label>Category</label>
                                                                        
                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                    <input
                                                                        type='text'
                                                                        className='form-control' value={category} onChange={(e) => setcategory(e.target.value)} required/>
                                                                        <span className="text-danger">{categoryError}</span>
                                                                        <span className="text-danger">{AlreadyError}</span>
                                                                    </div>
                                                                </div>
                                                                <hr/>
                                                                    <div className="row d-flex justify-content-end mt-4">
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

                                                    <Modal show={showEditModal} onHide={handleEditClose} animation={false}>
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>Edit Category</Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                                
                                                            <form onSubmit={handleSubmit(submitEditForm)} className="user-form ml-auto mr-auto">
                                                            <div className="row">
                                                                    <div className='col-sm-3'>
                                                                        <label>Category</label>
                                                                        
                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                    <input
                                                                        type='text'
                                                                        className='form-control' value={Editcategory} onChange={(e) => setEditcategory(e.target.value)} required/>
                                                                        <span className="text-danger">{EditcategoryError}</span>
                                                                        <span className="text-danger">{EditAlreadyError}</span>
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
                                                                            <button className='btn btn-secondary' onClick={handleEditClose}>
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