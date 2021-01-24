import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import Password from '../components/PasswordReset'

class PasswordReset extends Component {
    render() {
        return (
            <div>
                <NavBar key={this.props.key} firstName={this.props.firstName} userId={this.props.userId} auth={this.props.auth} logoutClearer={this.props.logoutClearer}></NavBar>
                <Password></Password>
            </div>
        )
    }
}

export default PasswordReset
