import React from 'react'
import GoogleLogin from 'react-google-login'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
const LoginByGoogle = ({ history }) => {
  const signup = (res) => {
    const socialLoginPayload = {
      providedBy: 'google',
      token: res.tokenObj.id_token,
    }
    axios.post('http://localhost:8000/api/auth/social-login', socialLoginPayload).then((result) => {
      let responseJson = result

      sessionStorage.setItem("userData", JSON.stringify(result));
      this.props.history.push('/Dashboard');
    });
  }
  const responseGoogle = (response) => {
    console.log(response)
    if (Object.getOwnPropertyDescriptor(response, 'error')) {
      return
    }
    var res = response.profileObj
    console.log(res)
    signup(response)
  }
  return (
    <div className='App'>
      <div className='row'>
        <div className='col-sm-12 btn btn-info'>Login With Google Using ReactJS</div>
      </div>
      <div className='row'>
        <div className='col-sm-12'>
          <div className='col-sm-4' />
          <div className='col-sm-4'>
            <GoogleLogin
              clientId='1091835832800-0dodt6oob19lk2tso8lgk5ccv9j8su4g.apps.googleusercontent.com'
              buttonText='Login with Google'
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            />
          </div>
          <div className='col-sm-4'></div>
        </div>
      </div>
    </div>
  )
}
export default LoginByGoogle
