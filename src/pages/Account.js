import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import AccountSetting from '../components/AccountSetting'

class BonusApplication extends Component {

    render() {
        return (
            <div>
                <NavBar key={this.props.key} active="account" firstName={this.props.firstName} userId={this.props.userId} auth={this.props.auth} logoutClearer={this.props.logoutClearer}></NavBar>
                <AccountSetting userId={this.props.match.params.id} firstName={this.props.firstName}></AccountSetting>
            </div>
        )
    }
}

export default BonusApplication