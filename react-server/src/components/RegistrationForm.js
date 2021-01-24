import React, { Component } from 'react'
import axios from 'axios'
import '../css/register.css'
import history from '../history'

class RegistrationForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
        }
    }
    componentDidMount(){
        document.title = 'Create an employee account'
    }

    dataSetter = e => {
        this.setState({[e.target.name] : e.target.value})
        console.log(e.target.value)
    }

    formSubmit = e =>{
        e.preventDefault()
        if(this.state.password === this.state.repassword){
            axios.post('https://arcane-woodland-66880.herokuapp.com/create',this.state,{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
            .then(response =>{
                if(response.data.ok===true){
                    alert('Account has been created successfully')
                    history.push('/')
                }
                else{
                    alert("Something went wrong try again")
                }
            }).catch(error =>{
                alert('Could not connect with the server try again later')
            })
        }
    }

    render() {
        return (
            <div className="m-5 w-50 mx-auto con">
                <br></br><br></br>
            <div className="col-lg-12 well">
                <h4>Employee Registration Form</h4><br></br><br></br>
            <div class="row">
                        <form onSubmit={this.formSubmit}>
                            <div class="col-sm-12">
                                <div class="row">
                                    <div class="col-sm-6 form-group">
                                        <label>First Name</label>
                                        <input type="text" placeholder="Enter First Name Here.." class="form-control" name="firstName" onChange={this.dataSetter}/>
                                    </div>
                                    <div class="col-sm-6 form-group">
                                        <label>Last Name</label>
                                        <input type="text" placeholder="Enter Last Name Here.." class="form-control" name="lastName" onChange={this.dataSetter}/>
                                    </div>
                                </div>					
                                <div class="form-group">
                                    <label>Address</label>
                                    <textarea placeholder="Enter Address Here.." rows="3" class="form-control" name="address" onChange={this.dataSetter}></textarea>
                                </div>	
                                <div class="row">
                                    <div class="col-sm-4 form-group">
                                        <label>City</label>
                                        <input type="text" placeholder="Enter City Name Here.." class="form-control" name="city" onChange={this.dataSetter}/>
                                    </div>	
                                    <div class="col-sm-4 form-group">
                                        <label>State</label>
                                        <input type="text" placeholder="Enter State Name Here.." class="form-control" name="state" onChange={this.dataSetter}/>
                                    </div>	
                                    <div class="col-sm-4 form-group">
                                        <label>Zip</label>
                                        <input type="text" placeholder="Enter Zip Code Here.." class="form-control" name="zipcode" onChange={this.dataSetter}/>
                                    </div>		
                                </div>
                                <div class="row">
                                    <div class="col-sm-6 form-group">
                                        <label>Title</label>
                                        <input type="text" placeholder="Enter Designation Here.." class="form-control" name="title" onChange={this.dataSetter}/>
                                    </div>		
                                    <div class="col-sm-6 form-group">
                                        <label>Team</label>
                                        <input type="text" placeholder="Enter team Name Here.." class="form-control" name="team" onChange={this.dataSetter}/>
                                    </div>	
                                </div>						
                            <div class="form-group">
                                <label>Phone Number</label>
                                <input type="text" placeholder="Enter Phone Number Here.." class="form-control" name="phoneNumber" onChange={this.dataSetter}/>
                            </div>		
                            <div class="form-group">
                                <label>Email Address</label>
                                <input type="text" placeholder="Enter Email Address Here.." class="form-control" name="email" onChange={this.dataSetter}/>
                            </div>	
                            <div class="form-group">
                                <label>Gender</label><br></br>
                                <select name="gender" onChange={this.dataSetter}>
                                    <option value="null">------</option> {/*to make sure that the user choose any option*/}
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Date of birth</label>
                                <input type="date" class="form-control" name="dateOfBirth" onChange={this.dataSetter}/>
                            </div>
                            <div class="form-group">
                                <label>Father Name</label>
                                <input type="text" placeholder="Enter Father name.." class="form-control" name="fatherName" onChange={this.dataSetter}/>
                            </div>
                            <div class="form-group">
                                <label>Salary</label>
                                <input type="number" placeholder="Salary" class="form-control" name="salary" onChange={this.dataSetter}/>
                            </div>
                            <div class="form-group">
                                <label>special authentication</label><br></br>
                            <select name="auth" onChange={this.dataSetter}>
                                    <option>-----</option>
                                    <option value={false}>No</option> {/*to make sure that the user choose any option*/}
                                    <option value={true}>yes</option>
                                </select>		
                            </div>	
                            <div class="form-group">
                                <label>Username</label>
                                <input type="text" placeholder="Enter username.." class="form-control" name="username" onChange={this.dataSetter}/>
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" placeholder="Enter password.." class="form-control" name="password" onChange={this.dataSetter}/>
                            </div>
                            <div class="form-group">
                                <label>Re enter the Password</label>
                                <input type="password" placeholder="Re Enter the password.." class="form-control" name="repassword" onChange={this.dataSetter}/>
                            </div>
                            <button type="submit" class="btn btn-lg btn-info">Submit</button>					
                            </div>
                        </form> 
                        </div>
            </div>
	</div>
        )
    }
}

export default RegistrationForm
