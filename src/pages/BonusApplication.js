import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import BonusForm from '../components/BonusForm'

class BonusApplication extends Component {
    render() {
        return (
            <div>
                <NavBar key={this.props.key} firstName={this.props.firstName} userId={this.props.userId} auth={this.props.auth} logoutClearer={this.props.logoutClearer}></NavBar>
                <BonusForm></BonusForm>
            </div>
        )
    }
}

export default BonusApplication