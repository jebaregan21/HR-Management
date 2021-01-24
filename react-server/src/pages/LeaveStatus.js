import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import Leaves from '../components/LeaveStatus'

class LeaveStatus extends Component {
    render() {
        return (
            <div>
                <NavBar key={this.props.key} firstName={this.props.firstName} userId={this.props.userId} auth={this.props.auth} logoutClearer={this.props.logoutClearer}></NavBar>
                <Leaves></Leaves>
            </div>
        )
    }
}

export default LeaveStatus
