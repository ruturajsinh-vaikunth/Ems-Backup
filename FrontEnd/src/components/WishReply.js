import Sidebar from "./Sidebar";
import  { useEffect,useState } from "react";
import {useDispatch } from 'react-redux'
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
import GreetingService from "../services/GreetingService";
import {BiArrowBack} from 'react-icons/bi';
import { useNavigate } from "react-router-dom";

export default function WishReply(){

    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);

    const navigate = useNavigate()
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const receiver = urlParams.get('receiver')
    const type = urlParams.get('type')
    const date = urlParams.get('date')
    const years = urlParams.get('years')

    const dispatch = useDispatch()
    const [greetings, setGreetings] = useState('');
    const [GreetingAddAlert, setGreetingAddAlert] = useState(false)
    const [GreetingsError, setGreetingsError] = useState('');
    const [GreetingsErrorAlert, setGreetingsErrorAlert] = useState(false)



    const parseJwt = (id) => {
        dispatch(refreshToken({_id : id}))
    };


    useEffect(() => {

        const AccountInfo = localStorage.getItem('store')
        const userInfo1 = JSON.parse(AccountInfo);
        const minutes = 1 * 60 * 1000;

        if(type === 'Anniversary'){
            if(years === "0"){
                setGreetings(`Congratulations and welcome aboard ${receiver}.`)
            }else{
                setGreetings(`${years} years of excellence! Congratulations on your work anniversary ${receiver}.`)
            }
        }
        else{
            setGreetings(`Wishing you a very very Happy Birthday ${receiver}.`)
        }
       
          
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

    function SubmitGreetings(){
        GreetingService.SendGreetings(date, userInfo.firstName, receiver, type, greetings)
        .then((response) => {
            if(response.status === 200){
                setGreetingAddAlert(true)
                setGreetingsError("")
            }
        })
        .catch((e) => {
                setGreetingsError(e.response.data);
               setGreetingsErrorAlert(true)
        })
    }



        return(
            <div>
            <Sidebar/>
                    <div className="app-admin-wrap layout-sidebar-large clearfix">
                        <main>
                            <div className="main-content-wrap d-flex flex-column flex-grow-1 sidenav-open">
                                    <div className="main-content">
                                        <div>
                                            <div className="breadcrumb">
                                                <h1>Greetings</h1>
                                            </div>
                                            <div className="separator-breadcrumb border-top"></div>
                                        </div>
                                        <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <div className="card mb-30">
                                                <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                        <div>
                                                            <h5>{type} Date : {date}</h5>
                                                        </div>
                                                        
                                                        <div>
                                                            <button className="btn round btn-facebook btn-icon rounded-circle m-1 mb-2" title="Back" onClick={() => navigate(-1)}>
                                                                <BiArrowBack  size={28} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                {GreetingAddAlert === true ?
                                                        <div  className="mt-2" style={{fontSize : '16px'}}> 
                                                            <div className="alert alert-info alert-dismissible">
                                                                <strong>Greeting send successfully</strong>
                                                                <button type="button" className="close" data-dismiss="alert" onClick={() => setGreetingAddAlert(false)}>X</button>
                                                            </div>
                                                    </div> : null
                                                    }
                                                    {GreetingsErrorAlert === true ?
                                                        <div  className="mt-2" style={{fontSize : '16px'}}> 
                                                            <div className="alert alert-danger alert-dismissible">
                                                                <strong>{GreetingsError}</strong>
                                                                <button type="button" className="close" data-dismiss="alert" onClick={() => setGreetingsErrorAlert(false)}>X</button>
                                                            </div>
                                                    </div> : null
                                                    }
                                                <div className="container mt-2 p-2">
                                                    <h5>Send to : <strong>{receiver}</strong></h5>
                                                    <textarea  className="form-control" value={greetings} onChange={(e) => setGreetings(e.target.value)}/>
                                                    <button className="btn btn-primary mt-3" onClick={SubmitGreetings}>Submit</button>          
                                                </div>
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

