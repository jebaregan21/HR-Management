import React, { Component } from 'react'
import history from '../history'
import axios from 'axios'

class LeaveForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            numberOfDays : null,
            authList : null
        }
    }

    componentDidMount(){
        document.title = 'Leave request form'
        if(localStorage.getItem('token')===null){
            history.push('/login')
        }
        axios.get('https://arcane-woodland-66880.herokuapp.com/leave')
        .then(response =>{
            if(response.data.ok===true){
                this.setState({authList : response.data.list})
            }
        }).catch(error =>{
            console.log(error)
            alert('something went wrong')
        })
    }
    

    dataSetter = e => {
        this.setState({[e.target.name] : e.target.value})
    }

    formSubmit = e =>{
        e.preventDefault()
        if(this.state.password === this.state.repassword){
            axios.post('https://arcane-woodland-66880.herokuapp.com/leave',this.state,{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
            .then(response =>{
                if(response.data.ok===true){
                    alert('Applied successfully. You can checks its status now.')
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
            <div className="m-5 con">
                <br></br><br></br>
            <div className="col-lg-12">
            <h4>Leave Request Form</h4>
                <br></br>
            <div class="col-lg-12 w-50 mx-auto">
                        <form onSubmit={this.formSubmit}>
                            <div class="col-sm-12">				
                                <div class="form-group">
                                    <label>Number of days</label>
                                    <input type="number" placeholder="Enter Number of days Here.." class="form-control" name="numberOfDays" onChange={this.dataSetter}/>
                                </div>	
                                <div class="row">
                                    <div class="col-sm-6 form-group">
                                        <label>Start Date</label>
                                        <input type="date" class="form-control" name="startDate" onChange={this.dataSetter}/>
                                    </div>
                                    {(this.state.numberOfDays!==null && this.state.numberOfDays>1)?
                                    <div class="col-sm-6 form-group">
                                        <label>End Date</label>
                                        <input type="date"class="form-control" name="endDate" onChange={this.dataSetter}/>
                                    </div>:
                                    <div class="col-sm-6 form-group">
                                        <label>End Date</label>
                                        <input type="date"class="form-control" name="endDate" onChange={this.dataSetter} readOnly/>
                                    </div>
                                    }
                                </div>	
                                						
                            	
                            <div class="form-group">
                                <label>Reason</label>
                                <input type="text" placeholder="Enter Reason Here.." class="form-control" name="reason" onChange={this.dataSetter}/>
                            </div>	
                            <div class="form-group">
                                <label>Request from</label><br></br>
                                <select name="requestedFrom" onChange={this.dataSetter}>
                                    <option value="null">------</option> {/*to make sure that the user choose any option*/}
                                    {(this.state.authList!==null && this.state.authList!== undefined)?
                                        this.state.authList.map(user => 
                                            <option key={user._id} value={user._id}>{user.firstName}</option>
                                        ):
                                        null
                                    }
                                </select>
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

export default LeaveForm
