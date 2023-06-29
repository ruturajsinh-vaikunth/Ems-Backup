import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../features/auth/authActions'
import { useEffect } from 'react'
import Error from '../components/Error'
import '../styles/css/index.d9965542.css'
import '../styles/css/chunk-2014a769.9731fe9b.css'


export default function Login(props) {
    const { loading, userInfo, error } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()

  const navigate = useNavigate()

  useEffect(() => {
    if(userInfo !== null){
      const AccountInfo = localStorage.getItem('store')
        const userInfo1 = JSON.parse(AccountInfo);
        if (userInfo1.account_type === "Employee") {
          navigate('/dashboard-profile-page')
        }
        if(userInfo1.account_type === "Admin" || userInfo.account_type === "Manager"){
          navigate('/Dashboard')
        }
    }
    if(userInfo){
      if (userInfo.account_type === "Employee") {
        navigate('/dashboard-profile-page')
      }
      if(userInfo.account_type === "Admin" || userInfo.account_type === "Manager"){
        navigate('/Dashboard')
      }
    }
  }, [navigate, userInfo])

  const submitForm = (data) => {
      dispatch(userLogin(data))
  }

  return (
    <>
    
    <div className='auth-layout-wrap '>
      <div className='auth-content'>
          <div className='card o-hidden'>
            <div className='row'>
              <div className='col-md-6'>
                <div className='p-4'>
                <div class="auth-logo text-center mb-30"><img src={require('../public/emslogo.png')} alt='ems-logo' /></div>
                <h1 className='mb-3 text-18'>Sign In</h1>
                  <form onSubmit={handleSubmit(submitForm)}>
                  {error && <Error>{error}</Error>}
                  <div className='form-group'>
                      <label htmlFor='email' className='bv-no-focus-ring col-form-label pt-0'>Email</label>
                      <input
                      type='email'
                      className='form-control-rounded form-control'
                      {...register('email')}
                      required
                      />
                  </div>
                  <div className='form-group'>
                      <label htmlFor='password' className='bv-no-focus-ring col-form-label pt-0'>Password</label>
                      <input
                      type='password'
                      className='form-control-rounded form-control'
                      {...register('password')}
                      required
                      />
                  </div>
                  
                  <button type='submit' className='btn btn-rounded btn-block mt-2 btn-primary mt-2' disabled={loading}>
                      {loading ? <div className='spinner spinner-secondary' id='nprogress'></div> : 'Login'}
                  </button>
                  </form>
                </div>
              </div>
              <div className="text-center col-md-6 backgound-div">
                    <div className="pr-3 auth-right">
                      <Link to={'/forgot-password'} style={{textDecoration: 'none'}} className="btn btn-rounded btn-outline-primary btn-outline-google btn-block btn-icon-text">
                      Forgot password?
                      </Link>
                    </div>
                </div>
          </div>
          </div>
      </div>
    </div>
    </>
    )
}