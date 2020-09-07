import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './App.css'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'


const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => isAuthorized() ? <Component {...props} /> : <Redirect to={{
        pathname: '/',
        state: props.location
      }} />}
    />
  )
}
const isAuthorized = () => localStorage.getItem('token') !== null

const App = () => {
  return (
    <>
      <div className='App'>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Redirect to={isAuthorized() ? '/dashboard' : "/login"} />}
            />
            <Route exact path='/login' component={Login}></Route>
            <Route path='/dashboard' component={Dashboard} />
          </Switch>
        </Router>
      </div>
    </>
  )
}

export default App
