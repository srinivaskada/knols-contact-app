import React from 'react'
import PropTypes from 'prop-types'
import LoginByGoogle from './LoginByGoogle'

const Login = ({ history }) => {
  const onLoginSuccess = (token, userDetails) => {
    window.localStorage.setItem('token', token)
    window.localStorage.setItem('userDetails', JSON.stringify(userDetails))
    history.push('/dashboard')
  }
  return (
    <>
      <div>This is Login</div>
      <LoginByGoogle onSuccess={onLoginSuccess} />
    </>
  )
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
}
export default Login
