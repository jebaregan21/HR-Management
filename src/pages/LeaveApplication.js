import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import LeaveForm from '../components/LeaveForm'

class LeaveApplication extends Component {
    render() {
        return (
            <div>
                <NavBar key={this.props.key} firstName={this.props.firstName} userId={this.props.userId} auth={this.props.auth} logoutClearer={this.props.logoutClearer}></NavBar>
                <LeaveForm></LeaveForm>
            </div>
        )
    }
}

export default LeaveApplication
