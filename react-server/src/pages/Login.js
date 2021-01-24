import React, { Component } from 'react'
import '../css/login.css'
import axios from 'axios'
import setAuthorizationToken from '../setAuthorizationToken'
import history from '../history'

class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            username : null,
            password : null,
            redirect : '/'
        }
    }
    
    formHandler = e =>{
        e.preventDefault()
        axios.post('https://arcane-woodland-66880.herokuapp.com/login', this.state)
        .then(response =>{
            if(response.data.ok === true){
                setAuthorizationToken(response.data.token)
                history.push(this.state.redirect)
            }
            else{
                alert('Invalid credentials')
            }
        }).catch(error =>{
            console.log(error)
        })
    }

    valueSetter = e =>{
        this.setState({[e.target.name] : e.target.value})
    }

    render() {
        return (
            <div>
                <div className="sidenav">
                    <div className="login-main-text">
                        <h2>Login Page</h2>
                        <p>Login or register from here to access.</p>
                    </div>
                </div>
                <div className="main">
                    <div className="col-md-6 col-sm-12">
                        <div className="login-form">
                        <form onSubmit={this.formHandler}>
                            <div className="form-group">
                                <label>User Name</label>
                                <input type="text" className="form-control" placeholder="User Name" name="username" onChange={this.valueSetter}/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Password" name="password" onChange={this.valueSetter}/>
                            </div>
                            <button type="submit" className="btn btn-black">Login</button>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
