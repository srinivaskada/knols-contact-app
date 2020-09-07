import React, { Component, useContext, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './App.css'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import { AppStateContext } from './Contexts/AppStateContext'


const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => isAuthenticated ? <Component {...props} /> : <Redirect to={{
        pathname: '/login',
        state: props.location
      }} />}
    />
  )
}
const isAuthorized = () => localStorage.getItem('token') !== null

const App = () => {
  const { state:  { isAuthenticated } } = useContext(AppStateContext)
  return (
    <>
      <div className='App'>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => isAuthenticated ? <Redirect to='/dashboard' /> : <Redirect to='/login' />}
            />
            <Route exact path='/login' component={Login}></Route>
            <ProtectedRoute path='/dashboard' isAuthenticated={isAuthenticated} component={Dashboard} />
          </Switch>
        </Router>
      </div>
    </>
  )
}

export default App
