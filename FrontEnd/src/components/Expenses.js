import Sidebar from "./Sidebar";
import React , { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import {useDispatch } from 'react-redux'
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
import {IoMdAdd} from 'react-icons/io'
import { Modal } from 'react-bootstrap'
import '../styles/css/index.d9965542.css'
import '../styles/css/chunk-2014a769.9731fe9b.css'
import ExpenseService from "../services/ExpenseService";
import DataTable from 'react-data-table-component';
import {BsEyeFill} from 'react-icons/bs';
import { PDFExport } from "@progress/kendo-react-pdf";

export default function Expenses(){

    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);
    const pdfExportComponent = React.useRef(null);

    const dispatch = useDispatch()
    const { handleSubmit } = useForm()
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth();

    function convertnew(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day ].join("-");
    }

    function formatDate (input) {
        var datePart = input.match(/\d+/g),
        year = datePart[0], // get only two digits
        month = datePart[1], day = datePart[2];
      
        return day+'-'+month+'-'+year;
      }
    
    function getDaysInCurrentMonth() {
        const date = new Date();
      
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
      }
      
    const lastDay = getDaysInCurrentMonth();

    const firstdayofmonth = new Date(year, month, 1)
    const lastdayofmonth = new Date(year, month, lastDay)

    let newfirstdayofmonth = convertnew(firstdayofmonth);
    let newlastdayofmonth = convertnew(lastdayofmonth);

    const [SaerchfromDate, setSaerchfromDate] = useState(newfirstdayofmonth)
    const [SearchtoDate, setSearchtoDate] = useState(newlastdayofmonth)
    
    const [title, settitle] = useState("")
    const [amount, setamount] = useState("")
    const [description, setdescription] = useState("")
    const [date, setdate] = useState("")
    const [titleError, settitleError] = useState("")
    const [descError, setdescError] = useState("")
    const [amountError, setamountError] = useState("")
    const [Error, setError] = useState("")

    const [AddExpAlert, setAddExpAlert] = useState(false)
    const [ExpensesData, setExpensesData] = useState([])
    const [showdiv, setshowdiv] = useState(false)
    const [showExportButton, setshowExportButton] = useState(false)

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


    function submitForm(){
        if(!title || /^\s*$/.test(title) ){
            settitleError('Please Enter Title')
            return
        }else{
            settitleError("")
        }

        if(!description || /^\s*$/.test(description)){
            setdescError("Please Enter description")
            return
        }else{
            setdescError("")
        }

        if(amount === '0'){
            setamountError("Please Enter Amount")
            return
        }else{
            setamountError("");
        }

        ExpenseService.AddExpense(title, description, amount, date, userInfo.firstName)
        .then((response) => {
            if(response.status === 200){
                handleClose();
                setAddExpAlert(true)
                settitle("")
                setdescription("")
                setdate("")
                setamount("")
            }
        })
        .catch((e) => {
            setError(e)
        })
    }

    function searchbydateexpenses(){
        ExpenseService.searchExpense(SaerchfromDate, SearchtoDate)
        .then((response) => {
            setExpensesData(response.data);
            setshowdiv(true)
            const Data = response.data

            if(Data.length === 0){
                setshowExportButton(false)
            }else{
                setshowExportButton(true)
            }

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

    const exportPDFWithComponent = () => {
        if (pdfExportComponent.current) {
          pdfExportComponent.current.save();
        }
      };


    const columns = [
        {
            name: 'Date',
            selector: row => convert(row.date)
        },
        {
            name: 'Title',
            selector: row => row.title,
            
        },
        {
            name: 'Amount',
            selector: row => row.amount,
            sortable: true,
        },
        {
            name: 'Added By',
            selector: row => row.addedby,
            sortable: true,
        },
        {
            name: 'Action',
            cell: row => (
                <>
                <NavLink to={`/expense-info/${row._id}`}>
                    <BsEyeFill size={26} title="View Expenses" />
                </NavLink>
                </>)
        }
    ]

    const columnshide = [
        {
            name: 'Date',
            selector: row => convert(row.date)
        },
        {
            name: 'Title',
            selector: row => row.title,
            
        },
        {
            name: 'Amount',
            selector: row => row.amount,
            sortable: true,
        },
        {
            name: 'Added By',
            selector: row => row.addedby,
            sortable: true,
        }
    ]

    function resetvalues(){
        setshowdiv(false)
    }


        return(
            <div>
                    <Sidebar/>
                    <div className="app-admin-wrap layout-sidebar-large clearfix">
                        <main>
                            <div className="main-content-wrap d-flex flex-column flex-grow-1 sidenav-open">
                                    <div className="main-content">
                                        <div>
                                            <div className="d-flex justify-content-between">
                                                    <div className="breadcrumb p-2">
                                                        <h1>Expenses</h1>
                                                    </div>
                                                    <div className="p-1 mb-2">
                                                        <button className="btn btn-primary m-1" title="Add Expenses" onClick={handleShow}>
                                                            <IoMdAdd  size={30} className="mr-2" />Expense
                                                        </button>
                                                    </div>
                                            </div> 
                                            <div className="separator-breadcrumb border-top"></div>
                                        </div>

                                        <Modal show={showModal} onHide={handleClose} animation={false}>
                                            <Modal.Header closeButton>
                                                <Modal.Title> Add new expense</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <p className="text-danger">{Error}</p>
                                                <form onSubmit={handleSubmit(submitForm)}>
                                                                                        
                                                                                        <div className="row ml-auto mr-auto">
                                                                                                <div className="col-sm-4">
                                                                                                    <h6 className="mb-0">Title</h6>
                                                                                                </div>
                                                                                                <div className="col-sm-6">
                                                                                                    <input type='text' className='form-control' value={title} onChange={(e) => settitle(e.target.value)} required/>
                                                                                                    <span className="text-danger">{titleError}</span>
                                                                                                </div>
                                                                                        </div>

                                                                                        <div className="row mt-3 ml-auto mr-auto">
                                                                                                <div className="col-sm-4">
                                                                                                    <h6 className="mb-0">Description</h6>
                                                                                                </div>
                                                                                                <div className="col-sm-6">
                                                                                                    <textarea className='form-control' value={description} onChange={(e) => setdescription(e.target.value)} required/>
                                                                                                    <span className="text-danger">{descError}</span>
                                                                                                </div>
                                                                                        </div>

                                                                                        <div className="row mt-3 ml-auto mr-auto">
                                                                                                <div className="col-sm-4">
                                                                                                    <h6 className="mb-0">Date</h6>
                                                                                                </div>
                                                                                                <div className="col-sm-6">
                                                                                                    <input type="date" className='form-control' value={date} onChange={(e) => setdate(e.target.value)} required/>
                                                                                                </div>
                                                                                        </div>
                                                                                        
                                                                                            <div className="row mt-3 ml-auto mr-auto">
                                                                                                <div className="col-sm-4">
                                                                                                    <h6 className="mb-0">Amount</h6>
                                                                                                </div>
                                                                                                <div className="col-sm-6">
                                                                                                    <input type='number' className='form-control' value={amount} onChange={(e) => setamount(e.target.value)} required />
                                                                                                    <span className="text-danger">{amountError}</span>
                                                                                                </div>
                                                                                            </div>
                                                                                            <hr/>
                                                                                            <div className="row d-flex justify-content-end">
                                                                                                <div className="col-sm-3">
                                                                                                    <button className="btn btn-primary btn-sm" type="submit">
                                                                                                        Submit
                                                                                                    </button>
                                                                                                </div>
                                                                                            <div className="col-sm-3">
                                                                                                <button className="btn btn-secondary ml-2" onClick={handleClose}>Cancel</button>
                                                                                            </div>
                                                                                            </div>
                                                                        
                                                                    </form>
                                                                </Modal.Body>
                                        </Modal>


                                        {AddExpAlert === true ?
                                            <div className="mt-2 mb-1"> 
                                                <div className="alert alert-success alert-dismissible">
                                                    <strong>Expense Added!!</strong> Successfully.
                                                    <button type="button" className="close" data-dismiss="alert" onClick={() => setAddExpAlert(false)}>X</button>
                                                </div>
                                            </div> : null }

                                        <div className="row">
                                            <div className="col-sm-12 col-md-12 col-lg-12">
                                            <div className="card mb-30">
                                                <div className="card-body">
                                                <div className="row mt-2">
                                                
                                                    <div className="col-sm-3">
                                                        <label>From</label>
                                                        <input className="form-control" type={'date'} id="fromdate" defaultValue={newfirstdayofmonth}  onChange={(e) => setSaerchfromDate(e.target.value)} /> 
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label>To</label>
                                                        <input className="input form-control" type={'date'} id="todate" defaultValue={newlastdayofmonth}  onChange={(e) => setSearchtoDate(e.target.value)} />
                                                    </div>
                                                    
                                                    <div className="col-sm-3 mt-4">
                                                        <button className="btn btn-sm btn-primary" onClick={searchbydateexpenses} title="Search">Search</button>
                                                        <button className="btn btn-sm btn-secondary ml-2" onClick={resetvalues} title="Reset">Reset</button>
                                                    </div>     
                                                </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>

                                        
                                        
                                        {showdiv === true ? 
                                        <>
                                        {showExportButton === true ? 
                                            <div className="row justify-content-end mr-auto">
                                                <button className="btn btn-sm btn-primary text-15" onClick={exportPDFWithComponent}><i className=" i-File-Download mr-2"></i>Export to PDF</button>
                                            </div> : null}
                                        
                                        <div className="row mt-3">
                                            <div className="col-sm-12 col-md-12 col-lg-12">
                                            <div className="card mb-30">
                                                <div className="card-body">
                                                                    <DataTable 
                                                                        columns={columns}
                                                                        data={ExpensesData}
                                                                    />

                                                   
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        
                                        </> : null }

                                        <div style={{position: "absolute", left: "-1000px", top: 0}}>
                                        <PDFExport
                                            ref={pdfExportComponent}
                                            paperSize="A4" margin="1cm"
                                            fileName={`Expenses Report (${formatDate(SaerchfromDate)} - ${formatDate(SearchtoDate)})`}
                                            author={`${userInfo.firstName}`}
                                        >
                                        <h5 className="text-center">Expenses Report({formatDate(SaerchfromDate)}-{formatDate(SearchtoDate)})</h5>
                                        <DataTable 
                                            columns={columnshide}
                                            data={ExpensesData}
                                        />

                                                    <div className="row justify-content-end mt-4">
                                                        <h5>{`${new Date().toISOString().slice(0, 10).split('-').reverse().join('-')} , ${new Date().toLocaleTimeString()} ` }</h5>
                                                    </div>

                                        </PDFExport>
                                        </div>
                                    </div>
                            </div>
                        </main>
                    </div>
                    
                </div>
            )
}