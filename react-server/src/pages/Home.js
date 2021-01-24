import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import HomeMenu from '../components/Home'

class Home extends Component {

    componentDidMount(){
        document.title = "Direct - Easy management app"
    }
    render() {
        return (
            <div>
                <NavBar active="home" key={this.props.key} firstName={this.props.firstName} userId={this.props.userId} auth={this.props.auth} logoutClearer={this.props.logoutClearer}></NavBar>
                <HomeMenu auth={this.props.auth}></HomeMenu>
            </div>
        )
    }
}

export default Home
