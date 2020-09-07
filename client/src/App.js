import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import logo from './logo.svg'
import './App.css'
import LoginByGoogle from './Components/LoginByGoogle'

const Dashboard = () => <div>I am Dashboard</div>

function App() {
  return (
    <>
      <div className='App'>
        <Router>
          <div className='container'>
            <Switch>
              <Route exact path='/' component={LoginByGoogle}></Route>
              <Route path='/Dashboard' component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </div>
    </>
  )
}

export default App
