import React, { Component } from 'react'
import axios from 'axios'

class AccountSetting extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            userId : this.props.userId,
            data : null,
            auth : false
        }
    }

    componentDidMount(){
        document.title = this.props.firstName
        this.setState({userId : this.props.userId})
        axios.get(`https://arcane-woodland-66880.herokuapp.com/account/${this.props.userId}`,{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        .then(response=>{
            if(response.data.ok===true){
                this.setState({data : response.data.user, auth : response.data.auth})
            }
            else{
                console.log('bad')
            }
        })
        .catch(error =>{
            alert('Something went wrong')
        })
    }

    
    render() {
        return (
            <div>
                {(this.state.data!==null)?
                <div className="container mt-6">
                    <br></br><br></br><br></br><br></br>
                <div className="row form-group">
                    <h5>Firstname : </h5>
                    <h5>{this.state.data.firstName}</h5>
                </div>
                <div className="row form-group">
                    <h5>Lastname : </h5>
                    <h5>{this.state.data.lastName}</h5>
                </div>
                <div className="row form-group">
                    <h5>Email : </h5>
                    <h5>{this.state.data.email}</h5>
                </div>
                <div className="row form-group">
                    <h5>Title : </h5>
                    <h5>{this.state.data.title}</h5>
                </div>
                <div className="row form-group">
                    <h5>Gender : </h5>
                    <h5>{this.state.data.gender}</h5>
                </div>
                <div className="row form-group">
                    <h5>Date of birth : </h5>
                    <h5>{this.state.data.dateOfBirth.substring(0,10)}</h5>
                </div>
                <div className="row form-group">
                    <h5>Fathername : </h5>
                    <h5>{this.state.data.fatherName}</h5>
                </div>
                <div className="row form-group">
                    <h5>Address : </h5>
                    <h5>{this.state.data.address}</h5>
                </div>
                <div className="row form-group">
                    <h5>City : </h5>
                    <h5>{this.state.data.city}</h5>
                </div>
                <div className="row form-group">
                    <h5>State : </h5>
                    <h5>{this.state.data.state}</h5>
                </div>
                <div className="row form-group">
                    <h5>Zipcode : </h5>
                    <h5>{this.state.data.zipcode}</h5>
                </div>
                <div className="row form-group">
                    <h5>Team : </h5>
                    <h5>{this.state.data.team}</h5>
                </div></div>
                :null}
                {(this.state.auth===true)?<a href="/account/reset">Change password</a>:null}
            </div>
        )
    }
}

export default AccountSetting
