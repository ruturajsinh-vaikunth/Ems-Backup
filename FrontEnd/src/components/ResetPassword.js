import { useForm } from "react-hook-form"
import UserService from "../services/UserService"
import { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import '../styles/404.css';

export default function ResetPassword(){

  const { register, handleSubmit } = useForm()
//   const [error, setError] = useState("")
//   const [Success, setSuccess] = useState("")
//   const [EmailError, setEmailError] = useState("")
  const [Unauthorized, setUnauthorized] = useState(false)
  const [LinkExpire, setLinkExpire]  = useState(false)
  const [Email, setEmail] = useState("")
  const [PasswordCustomError, setPasswordCustomError] = useState("")
  const [loading , setloading] = useState(false)
  const [EditAlert, setEditAlert] = useState(false)

  const navigate = useNavigate()
  
  function FindString(strng){
    let result = strng.substr(37,42);
    UserService.findString(result)
    .then(response => {
        if(response.data === null){
            setUnauthorized(true)
        }else{

        let storeTime  =  response.data.time
        let email = response.data.email
        setEmail(email)
        let in20 = new Date(storeTime)

        let now = new Date();
        // console.log(now.toLocaleDateString() + " " + now.toLocaleTimeString());
        
        // console.log(in20.toLocaleDateString() + " " + in20.toLocaleTimeString());

        // at any instant suppose now is cuurent time then you can compare like

        if(now.getTime() > in20.getTime()) {
            setLinkExpire(true)
        }
    }
    })
    .catch(e => {
        console.log(e);
    })
  }

    useEffect(() => {
        let strng = window.location.href
        FindString(strng);
        
     // eslint-disable-next-line
    }, [])

  function submitForm(data){    
    setloading(true)
    if (data.password !== data.confirmpassword) {
        setPasswordCustomError('Password mismatch')
      return
    }
    else{
        setPasswordCustomError('')
    }

    UserService.editpasswordbyEmail(Email, data.password)
    .then(response => {
        console.log(response);
        setloading(false)
        setEditAlert(true)
        setTimeout(function(){
            navigate('/')
        }, 2500); 
        
    })
    .catch(e => {
        console.log(e);
    })
  }

    return(
        <>
        {Unauthorized === true ?
             <div>
                
                <svg width="380px" className="svg-style" height="500px" viewBox="0 0 837 1045" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlnsSketch="http://www.bohemiancoding.com/sketch/ns">
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketchType="MSPage">
                        <path d="M353,9 L626.664028,170 L626.664028,487 L353,642 L79.3359724,487 L79.3359724,170 L353,9 Z" id="Polygon-1" stroke="#FF0000" stroke-width="8" sketchType="MSShapeGroup"></path>
                        <path d="M78.5,529 L147,569.186414 L147,648.311216 L78.5,687 L10,648.311216 L10,569.186414 L78.5,529 Z" id="Polygon-2" stroke="#007FB2" stroke-width="7" sketchType="MSShapeGroup"></path>
                        <path d="M773,186 L827,217.538705 L827,279.636651 L773,310 L719,279.636651 L719,217.538705 L773,186 Z" id="Polygon-3" stroke="#795D9C" stroke-width="7" sketchType="MSShapeGroup"></path>
                        <path d="M639,529 L773,607.846761 L773,763.091627 L639,839 L505,763.091627 L505,607.846761 L639,529 Z" id="Polygon-4" stroke="#dc143c" stroke-width="8" sketchType="MSShapeGroup"></path>
                        <path d="M281,801 L383,861.025276 L383,979.21169 L281,1037 L179,979.21169 L179,861.025276 L281,801 Z" id="Polygon-5" stroke="#36B455" stroke-width="7" sketchType="MSShapeGroup"></path>
                    </g>
                </svg>
                <div className="message-box">
                    <div className="row">
                        <h1>4<h1 className="error-color">0</h1>4</h1>
                    </div>
                <p className="error-color">Page not found</p>
                {/* <div class="buttons-con">
                    <div class="action-link-wrap">
                    <a onclick="history.back(-1)" class="link-button link-back-button">Go Back</a>
                    <a href="" class="link-button">Go to Home Page</a>
                    </div>
                </div> */}
                </div>
            </div>
            :
            <>
            {LinkExpire === true ? 
                <>
                    <h4 className='text-center mt-5 text-danger'>This Link was Expired</h4>
                    <Link to={'/forgot-password'} style={{textDecoration: 'none'}} className="pointer-change">
                        <p className='text-center'>Forgot password?</p>
                    </Link>
                </> : 
                
                    <div className='auth-layout-wrap'>
                        <div className='auth-content'>
                            <div className='card o-hidden'>
                                    <div className='row'>
                                    <div className='col-md-6'>
                                            <div className='p-4'>
                                            <div class="auth-logo text-center mb-30"><img src={require('../public/emslogo.png')} alt="logo" /></div>
                                                <h1 className='mb-3 text-18'>Reset Password</h1>
                                                {EditAlert === true ?
                                                            <div className="d-flex justify-content-center mt-3"> 
                                                                <div className="alert alert-info alert-dismissible fade show">
                                                                    <strong>Password Changed!!</strong> Successfully.
                                                                    <button type="button" className="btn-close" data-dismiss="alert" onClick={() => setEditAlert(false)}></button>
                                                                </div>
                                                            </div> : null
                                                    }
                                                    <form onSubmit={handleSubmit(submitForm)}>
                                                    {/* <p className="text-danger text-center">{error}</p>
                                                    <p className="text-success text-center">{Success}</p> */}
                                                    <div className='form-group'>
                                                        <label htmlFor='password' className='bv-no-focus-ring col-form-label pt-0'>New Password</label>
                                                        <input
                                                        type='password'
                                                        className='form-control-rounded form-control'
                                                        {...register('password')}
                                                        required    
                                                        />
                                                        {/* <p className="text-danger">{EmailError}</p> */}
                                                    </div>
                                                    <div className='form-group'>
                                                        <label htmlFor='confirmpassword' className='bv-no-focus-ring col-form-label pt-0'>Confirm Password</label>
                                                        <input
                                                        type='password'
                                                        className='form-control-rounded form-control'
                                                        {...register('confirmpassword')}
                                                        required    
                                                        />
                                                        <p className="text-danger">{PasswordCustomError}</p>
                                                    </div>
                                                        <button type='submit' className='btn btn-rounded btn-block mt-2 btn-primary mt-2'>
                                                            {loading === true ? <Spinner /> : 'Submit'}
                                                        </button>
                                            
                                                    </form>
                                            </div>
                                    </div>
                                    <div className="text-center col-md-6 backgound-div">
                                        <div className="pr-3 auth-right">
                                        <Link to={'/'} style={{textDecoration: 'none'}} className="btn btn-rounded btn-outline-primary btn-outline-email btn-block btn-icon-text">
                                        Sign In
                                        </Link>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>}
            </>
            }
        </>
    )
}