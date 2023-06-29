import Sidebar from "./Sidebar";
import React, { useEffect} from "react";
import http from '../http-common';
import { useState } from "react";
import '../styles/content.css';
import { Link } from 'react-router-dom';
import {useDispatch } from 'react-redux'
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
import {GoPlus} from 'react-icons/go';
import {  Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import PoliciesDocumentService from "../services/PoliciesDocumentService";
import DataTable from 'react-data-table-component';
import {RiDeleteBin2Fill} from 'react-icons/ri'
import Unauthorized from "./Unauthorized";

export default function AdminPoliciesDocuments(){


    const dispatch = useDispatch()
    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);

    const { handleSubmit } = useForm()

    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showDeleteModal, setDeleteShow] = useState(false);
    const handleDeleteClose = () => setDeleteShow(false);
    const handleDeleteShow = () => setDeleteShow(true);

    const [selectedImage, setSelectedImage] = useState();
    const [type, settype] = useState("");
    const [PoliciesDocumentAddAlert, setPoliciesDocumentAddAlert] = useState(false)
    const [PoliciesDocumentDeleteAlert, setPoliciesDocumentDeleteAlert] = useState(false)
    const [PoliciesDocumentsData, setPoliciesDocumentsData] = useState([])
    const [Deleteid, setDeleteid] = useState("")
    const [Deletetype, setDeletetype] = useState("")
    const [Deletefile, setDeletefile] = useState("")
    const [FileError, setFileError] = useState("")

    const parseJwt = (id) => {
        dispatch(refreshToken({_id : id}))
    };

    const imageChange = (e) => {
           
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        for(let i =0; i< chosenFiles.length; i++){
            if(chosenFiles[i].type === 'application/pdf'){
                setSelectedImage(chosenFiles);
                setFileError("")                                                                                   
            }
            else{
                setFileError("Only .pdf file allowed")
                return
            }
        }
        
    };

    const submitForm = () => {
            const userToken = localStorage.getItem('userToken')
    
            const formData = new FormData();

            formData.append('type', type)

            // eslint-disable-next-line
            files.map((file) => {
                formData.append('file', file)
            })
    
            // eslint-disable-next-line
            http.post(`/policies-documents/add-policies-documents`, formData, {
                headers: {
                  "content-type": "multipart/form-data",
                  'Authorization': `Bearer ${userToken}`,
                },
              })
              .then((response) => {
                handleClose()
                setPoliciesDocumentAddAlert(true)
                settype("")
                setSelectedImage()
                AllPoliciesDocuments()
              })
              .catch(e => {
                    console.log(e);
               
            })

       
    }

   const files = selectedImage ? [...selectedImage] : [];

    const submitDeleteForm = () => {
       PoliciesDocumentService.DeletePoliciesDocuments(Deleteid, Deletefile)
       .then((response) => {
           if(response.status === 200){
            handleDeleteClose()
            setPoliciesDocumentDeleteAlert(true)
            AllPoliciesDocuments()
           }
        })
        .catch((e) => {
            console.log(e);
        })
    }

    function AllPoliciesDocuments(){
        PoliciesDocumentService.findAllPoliciesDocuments()
        .then((response) => {
            setPoliciesDocumentsData(response.data);
        })
        .catch((e) => {
            console.log(e);
        })
    }



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


    const columns = [
        {
            name: 'Type',
            selector: row => row.type,
            sortable: true            
        },
        {
            name: 'File',
            selector: row => row.file,
            sortable: true,
            cell: row => (
                <Link to={`/pdf-viewer/${row.file}`}  style={{textDecoration: 'none'}} className="pointer-change">
                    <div>{row.file}</div>
                </Link>
            )
        },
        {
            name: 'Action',
            cell: row => (
                //eslint-disable-next-line
                    <RiDeleteBin2Fill size={24} color="red"  title="Delete" style={{textDecoration: 'none'}} className="pointer-change" onClick={() => {{handleDeleteShow(); handleDeleteEntry(row._id, row.type, row.file) }}}/>
                
            )
        }
    ]

    function handleDeleteEntry(delete_id, delete_type, delete_file){
        setDeleteid(delete_id)
        setDeletetype(delete_type)
        setDeletefile(delete_file)
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
                                                            <h4 className="fw-bold breadcrumb">Policies & Document</h4>
                                                        </div>
                                                        <div className="ml-auto p-2">
                                                            <button className="btn btn-primary btn-sm btnadd" type="button" onClick={handleShow} style={{float: 'inline-start'}}>
                                                                <GoPlus size={24} className="mr-2 mb-1" color="white" />Policy & Document
                                                            </button>
                                                        </div>
                                                    
                                            </div>
                                            <div className="separator-breadcrumb border-top"></div>
                                        </div>
                                        <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <div className="card mb-30">
                                                <div className="card-body">
                                                    
                                                    {PoliciesDocumentAddAlert === true ?
                                                                    <div style={{fontSize: '16px', marginTop: '10px'}}> 
                                                                        <div className="alert alert-dismissible alert-success">
                                                                            <strong className="text-secondary">Policies & Document Added!!</strong>
                                                                            <button type="button" className="close" data-dismiss="alert" onClick={() => setPoliciesDocumentAddAlert(false)}>X</button>
                                                                        </div>
                                                    </div> : null }
                                                    {PoliciesDocumentDeleteAlert === true ?
                                                                    <div style={{fontSize: '16px', marginTop: '10px'}}> 
                                                                        <div className="alert alert-dismissible alert-danger">
                                                                            <strong className="text-black">Policies & Document Deleted!!</strong>
                                                                            <button type="button" className="close" data-dismiss="alert" onClick={() => setPoliciesDocumentDeleteAlert(false)}>X</button>
                                                                        </div>
                                                    </div> : null }
                                                    <DataTable 
                                                            columns={columns}
                                                            data={PoliciesDocumentsData}
                                                            pagination
                                                            paginationComponentOptions={paginationComponentOptions}
                                                        />
                                                    <Modal show={showModal} onHide={handleClose} animation={false}>
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>Add Policies and Document</Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                                
                                                            <form onSubmit={handleSubmit(submitForm)} className="user-form ml-auto mr-auto">
                                                                <div className="row">
                                                                    <div className='col-sm-3'>
                                                                        <label>Type</label>
                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                    <select className="custom-select" value={type} onChange={(e) => settype(e.target.value)} required>
                                                                        <option value="">Select</option>
                                                                        <option value="HR Policies and Process">HR Policies and Process</option>
                                                                        <option value="HR Documents">HR Documents</option>
                                                                    </select>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="row mt-4">
                                                                    <div className="col-sm-3">
                                                                        <label>Document</label>
                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                        
                                                                        <input id="file" type="file" accept=".pdf"  className="form-control" onChange={imageChange} required/>
                                                                        <p className="text-danger mt-2">{FileError}</p>
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

                                                    <Modal show={showDeleteModal} onHide={handleDeleteClose} animation={false}>
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>Do you want to Delete ?</Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                                
                                                            <form onSubmit={handleSubmit(submitDeleteForm)} className="g-2 user-form ml-3">
                                                            <div className="row">
                                                                    <div className='col-sm-3'>
                                                                        <label>Type</label>
                                                                        
                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                        {Deletetype}
                                                                    </div>
                                                            </div>
                                                            
                                                            <div className="row mt-4">
                                                                    <div className='col-sm-3'>
                                                                        <label>File</label>
                                                                        
                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                        <Link to={`/pdf-viewer/${Deletefile}`}  style={{textDecoration: 'none'}} className="pointer-change">
                                                                            {Deletefile}
                                                                        </Link>
                                                                    </div>
                                                            </div>
                                                            <hr />
                                                            
                                                                    <div className="row d-flex justify-content-end">
                                                                        <div className="col-sm-3">
                                                                            <button type='submit' className='btn btn-danger'>
                                                                                Delete
                                                                            </button>
                                                                        </div>
                                                                        <div className="col-sm-3">
                                                                            <button className='btn btn-secondary' onClick={handleDeleteClose}>
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