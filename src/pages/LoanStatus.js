import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import Loans from '../components/LoanStatus'

class LoanStatus extends Component {
    render() {
        return (
            <div>
                <NavBar key={this.props.key} firstName={this.props.firstName} userId={this.props.userId} auth={this.props.auth} logoutClearer={this.props.logoutClearer}></NavBar>
                <Loans></Loans>
            </div>
        )
    }
}

export default LoanStatus
