import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

class navBar extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
            auth : false,
            home : "nav-link",
            account : "nav-link",
            login : "nav-link",
            create : "nav-link",
            calendar : "nav-link",
            searcha : "nav-link",
            search : null,
            firstName : null,
            userId : null,
            redirect : '/'
        }
    }
    componentDidMount(){
        if(this.props.userId !== null){
            this.setState({
                auth : this.props.auth,
                firstName : this.props.firstName,
                userId : this.props.userId,
            })
        }
        if(this.props.active==='home'){
            this.setState({home:"nav-link active"})
        }
        else if(this.props.active==='create'){
            this.setState({create : 'nav-link active'})
        }
        else if(this.props.active==='account'){
            this.setState({account : 'nav-link active'})
        }
        else if(this.props.active==='calendar'){
            this.setState({calendar:'nav-link active'})
        }
        else if(this.props.active==='search'){
            this.setState({searcha:'nav-link active'})
        }
    }

    logout = () =>{
        localStorage.clear()
        this.props.logoutClearer()
        return <Redirect to={this.state.redirect}/>
    }

    render() {
        return (
            <div>
                <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <a className="navbar-brand" href="/">Direct</a>
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className={this.state.home}>
                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className={this.state.calendar}>
                            <a className="nav-link" href="/calendar">Holiday Calendar</a>
                        </li>
                        <li className={this.state.searcha}>
                            <a className="nav-link" href="/search">Search</a>
                        </li>
                        <li className={this.state.account}>
                        {(this.state.userId !== null)?<a className="nav-link" href={`/account/${this.state.userId}`}>Account settings</a> :null}
                        </li>
                        
                        {(this.state.auth !== null && this.state.auth === true)?<li className={this.state.create}><a className="nav-link" href="/create">Create an employee account</a></li> : null}
                        <li className={this.state.login}>
                        {/*  To find out if logged in or not*/} 
                        {(this.state.userId !== null)?<a className="nav-link" onClick={this.logout} href="/">Logout</a> : <a className="nav-link" href="/login">Login</a>}
                        </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default navBar
