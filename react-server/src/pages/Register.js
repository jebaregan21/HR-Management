import React, { Component } from 'react'
import RegistrationForm from '../components/RegistrationForm'
import NavBar from '../components/NavBar'

class EmployeeRegistration extends Component {
    render() {
        return (
            <div>
                <NavBar active="create" key={this.props.key} firstName={this.props.firstName} userId={this.props.userId} auth={this.props.auth} logoutClearer={this.props.logoutClearer}></NavBar>
                <RegistrationForm></RegistrationForm>
            </div>
        )
    }
}

export default EmployeeRegistration
