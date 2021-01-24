import React, { Component } from 'react'
import './App.css';
import {Router, Route, Switch} from 'react-router-dom'
import history from './history'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Calendar from './pages/Calendar'
import Leave from './pages/LeaveApplication'
import Loan from './pages/LoanApplication'
import Bonus from './pages/BonusApplication'
import BonusStatus from './pages/BonusStatus'
import LoanStatus from './pages/LoanStatus'
import LeaveStatus from './pages/LeaveStatus'
import Account from './pages/Account'
import Search from './pages/Search'
import axios from 'axios'
import PasswordReset from './pages/PasswordReset';

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      firstName : null,
      userId : null,
      auth : null
    }
  }

  logoutClearer = () =>{
    this.setState({firstname : null, userId : null, auth : null})
}

componentDidMount(){
    axios.get('https://arcane-woodland-66880.herokuapp.com/',{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
    .then(response => {
        if(response.data.ok){
          if(response.data.userId===null){
            localStorage.clear()
          }
          this.setState({firstName : response.data.firstName, userId : response.data.userId, auth : response.data.auth})
        }
        else{
          localStorage.clear()
        }
    }).catch( error => {
        console.log(error)
    })
}

  render() {
    return (
      <div className="App">
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={() =><Home logoutClearer={this.logoutClearer} key={this.state.userId} 
            firstName={this.state.firstName} userId={this.state.userId} auth={this.state.auth}/>}></Route>
          <Route path="/login" exact component={() =><Login/>}></Route>
          <Route path="/create" exact component={() =><Register logoutClearer={this.logoutClearer} key={this.state.userId} 
            firstName={this.state.firstName} userId={this.state.userId} auth={this.state.auth}/>}></Route>
          <Route path="/calendar" exact component={() =><Calendar logoutClearer={this.logoutClearer} key={this.state.userId} 
            firstName={this.state.firstName} userId={this.state.userId} auth={this.state.auth}/>}></Route>
            <Route path="/leave" exact component={() =><Leave logoutClearer={this.logoutClearer} key={this.state.userId} 
            firstName={this.state.firstName} userId={this.state.userId} auth={this.state.auth}/>}></Route>
            <Route path="/loan" exact component={() =><Loan logoutClearer={this.logoutClearer} key={this.state.userId} 
            firstName={this.state.firstName} userId={this.state.userId} auth={this.state.auth}/>}></Route>
            <Route path="/bonus" exact component={() =><Bonus logoutClearer={this.logoutClearer} key={this.state.userId} 
            firstName={this.state.firstName} userId={this.state.userId} auth={this.state.auth}/>}></Route>
            <Route path="/bonus/status" exact component={() =><BonusStatus logoutClearer={this.logoutClearer} key={this.state.userId} 
            firstName={this.state.firstName} userId={this.state.userId} auth={this.state.auth}/>}></Route>
            <Route path="/loan/status" exact component={() =><LoanStatus logoutClearer={this.logoutClearer} key={this.state.userId} 
            firstName={this.state.firstName} userId={this.state.userId} auth={this.state.auth}/>}></Route>
            <Route path="/leave/status" exact component={() =><LeaveStatus logoutClearer={this.logoutClearer} key={this.state.userId} 
            firstName={this.state.firstName} userId={this.state.userId} auth={this.state.auth}/>}></Route>
            <Route path="/account/:id" exact component={(props) =><Account {...props} logoutClearer={this.logoutClearer} key={this.state.userId} 
            firstName={this.state.firstName} userId={this.state.userId} auth={this.state.auth}/>}></Route>
            <Route path="/search" exact component={(props) =><Search logoutClearer={this.logoutClearer} key={this.state.userId} 
            firstName={this.state.firstName} userId={this.state.userId} auth={this.state.auth}/>}></Route>
            <Route path="/reset" exact component={() =><PasswordReset logoutClearer={this.logoutClearer} key={this.state.userId} 
            firstName={this.state.firstName} userId={this.state.userId} auth={this.state.auth}/>}></Route>
        </Switch>
      </Router>
    </div>
    )
  }
}

export default App
