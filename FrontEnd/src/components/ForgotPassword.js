import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom'
import UserService from "../services/UserService"
import { useState } from "react"
import '../styles/css/index.d9965542.css'
import '../styles/css/chunk-2014a769.9731fe9b.css'

export default function ForgotPassword(){

  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")
  const [Success, setSuccess] = useState("")
  const [EmailError, setEmailError] = useState("")

  function submitForm(data){    
    // eslint-disable-next-line
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!data.email || !re.test(data.email)){
        setEmailError("Enter valid Email");
        return;
    }else{
        setEmailError("")
    }
    UserService.ResetPassword(data.email)
    .then(response => {
       if(response.status === 200){
        setSuccess("Reset Password Link sent to your Email Address")
        setError("")
       }
    })
    .catch(e => {
        setError(e.response.data);
        setSuccess("")
    })
  }

    return(
        <div className='auth-layout-wrap'>
        <div className='auth-content'>
            <div className='card o-hidden'>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='p-4'>
                  <div class="auth-logo text-center mb-30"><img src={require('../public/emslogo.png')} alt="logo" /></div>
                    <h2 className='mb-3 text-18'>Forgot Password</h2>
                    <form onSubmit={handleSubmit(submitForm)}>
                    <p className="text-danger text-center">{error}</p>
                    <p className="text-success text-center">{Success}</p>
                    <div className='form-group'>
                        <label htmlFor='email' className='bv-no-focus-ring col-form-label pt-0'>Email</label>
                        <input
                        type='email'
                        className='form-control-rounded form-control'
                        {...register('email')}
                        required    
                        />
                        <p className="text-danger">{EmailError}</p>
                    </div>
                        <button type='submit' className='btn btn-rounded btn-block mt-2 btn-primary mt-2' >Submit
                            {/* {loading ? <Spinner /> : 'Login'} */}
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
        </div>
    )
}