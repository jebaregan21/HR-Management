import React, { Component } from 'react'
import history from '../history'
import axios from 'axios'

class PasswordReset extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            
        }
    }
    
    componentDidMount(){
        document.title = 'Change password'
    }

    dataSetter = e => {
        this.setState({[e.target.name] : e.target.value})
    }

    formSubmit = e =>{
        e.preventDefault()
        if(this.state.newpassword===this.state.repassword){
            axios.post('https://arcane-woodland-66880.herokuapp.com/reset',this.state,{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
            .then(response =>{
                if(response.data.ok===true){
                    alert('Password has been changed successfully')
                    localStorage.clear()
                    history.push('/')
                }
                else{
                    alert("Invalid credentials")
                }
            }).catch(error =>{
                alert('Could not connect with the server try again later')
            })
        }
        else{
            alert('check passwords')
        }
    }

    render() {
        return (
            <div className="m-5 con">
                <br></br><br></br>
            <div className="col-lg-12">
            <h4>Reset password</h4>
                <br></br>
            <div class="row col-lg-12 w-50 mx-auto">
                        <form onSubmit={this.formSubmit}>
                            <div class="col-sm-12">				
                                <div class="form-group">
                                    <label>Username</label>
                                    <input type="text" placeholder="Username" class="form-control" name="username" onChange={this.dataSetter}/>
                                </div>	
                               </div>
                               <div class="col-sm-12">				
                                <div class="form-group">
                                    <label>Old password</label>
                                    <input type="text" placeholder="old password" class="form-control" name="password" onChange={this.dataSetter}/>
                                </div>	
                               </div>  						
                               <div class="col-sm-12">				
                                <div class="form-group">
                                    <label>New password</label>
                                    <input type="text" placeholder="Username" class="form-control" name="newpassword" onChange={this.dataSetter}/>
                                </div>	
                               </div>
                               <div class="col-sm-12">				
                                <div class="form-group">
                                    <label>Re enter password</label>
                                    <input type="text" placeholder="Username" class="form-control" name="repassword" onChange={this.dataSetter}/>
                                </div>	
                               </div>
                            
                            <button type="submit" class="btn btn-lg btn-info">Submit</button>					
                        </form> 
                    </div>
            </div>
	</div>
        )
    }
}

export default PasswordReset
