import React, { Component } from 'react'
import axios from 'axios'
import history from '../history'

class LeaveStatus extends Component {
    constructor(props) {
        super(props)

        this.state = {
            leaves : null,
            auth : false,
        }
    }

    componentDidMount(){
        document.title = 'Leave request status'
        if(localStorage.getItem('token')===null){
            history.push('/login')
        }
        axios.get('https://arcane-woodland-66880.herokuapp.com/leave/status',{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        .then(response=>{
            if(response.data.ok===true){
                this.setState({auth:response.data.auth,leaves:response.data.leave})
            }
            else{
                alert('No leave request found')
            }
        })
    }

    formSubmit = e =>{
        const key = e.target.parentNode.getAttribute("postid")         
        axios.post(`https://arcane-woodland-66880.herokuapp.com/leave/status/${key}`,
        {
            action:true,
            id : key
        }
        ,{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        .then(response=>{
            if(response.data.ok===true){
                history.push('/leave/status')
            }
            
        }).catch(error=>{
            alert('Oops something went wrong try again')
        })
    }

    reject = e =>{
        const key = e.target.parentNode.getAttribute("postid")
        axios.post(`https://arcane-woodland-66880.herokuapp.com/leave/status/${key}`,
        {
            action:false,
            id : key,
        }
        ,{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        .then(response=>{
            if(response.data.ok===true){
                history.push('/leave/status')
            }
            
        }).catch(error=>{
            alert('Oops something went wrong try again')
        })
    }


    leaveTable(){
        return this.state.leaves.map(leave => {
                return(
                <tr class>
                    <td><a href={`/account/${leave.userId}`}>{leave.requester}</a></td>
                    <td>{leave.numberOfDays}</td>
                    <td>{leave.startDate.substring(0,10)}</td>
                    <td>{leave.endDate.substring(0,10)}</td>
                    <td>{leave.reason}</td>
                    <td>{leave.status}</td>
                    {(this.state.auth===true && leave.status !== 'approved' && leave.status!=='rejected')?
                        <td class="row" postid={leave._id}>
                        <button type="submit" class="btn btn-success" onClick={this.formSubmit}>Accept</button>
                        <button class="btn btn-danger" onClick={this.reject}>Reject</button>
                    </td>:null
                    }
                </tr>
                )
            }
        )
    }

    render() {
        return (
            <div>
                <br></br><br></br><br></br>
                <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Requester</th>
                    <th scope="col">Number Of Days</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    <th scope="col">Reason</th>
                    <th scope="col">Status</th>
                    {(this.state.auth===true)? <th scope="col">Option</th> : null}
                    </tr>
                </thead>
                <tbody>
                    {(this.state.leaves!==null)?
                    this.leaveTable():null}
                </tbody>
                </table>
            </div>
        )
    }
}

export default LeaveStatus
