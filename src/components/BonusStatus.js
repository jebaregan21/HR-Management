import React, { Component } from 'react'
import axios from 'axios'
import history from '../history'

class BonusStatus extends Component {
    constructor(props) {
        super(props)

        this.state = {
            bonus : null,
            auth : false,
            current : null
        }
    }

    componentDidMount(){
        document.title = 'Bonus request status'
        if(localStorage.getItem('token')===null){
            history.push('/login')
        }
        axios.get('https://arcane-woodland-66880.herokuapp.com/bonus/status',{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        .then(response=>{
            if(response.data.ok===true){
                this.setState({auth:response.data.auth,bonus:response.data.bonus})
            }
            else{
                alert('No bonus request found')
            }
        })
    }

    dataSetter = e =>{
        const id = e.currentTarget.parentNode.getAttribute("postid")
        this.setState({amount : e.target.value,current:id})
    }

    formSubmit = e =>{
        const key = e.target.parentNode.getAttribute("postid")
        
        if(this.state.current === key){
         
        axios.post(`https://arcane-woodland-66880.herokuapp.com/bonus/status/${key}`,
        {
            action:true,
            id : key,
            amount : this.state.amount
        }
        ,{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        .then(response=>{
            if(response.data.ok===true){
                history.push('/bonus/status')
            }
            
        }).catch(error=>{
            alert('Oops something went wrong try again')
        })
    }
    else{
        alert('Enter amount only in one textbox at a time')
        }
    }

    reject = e =>{
        const key = e.target.parentNode.getAttribute("postid")
            
        axios.post(`https://arcane-woodland-66880.herokuapp.com/bonus/status/${key}`,
        {
            action:false,
            id : key,
            amount : this.state.amount
        }
        ,{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        .then(response=>{
            if(response.data.ok===true){
                history.push('/bonus/status')
            }
            
        }).catch(error=>{
            alert('Oops something went wrong try again')
        })
    }


    bonusTable(){
        return this.state.bonus.map(bonus => {
                return(
                <tr class>
                    <td><a href={`/account/${bonus.userId}`}>{bonus.requester}</a></td>
                    <td>{bonus.amount}</td>
                    <td>{bonus.status}</td>
                    <td>{bonus.approvedAmount}</td>
                    {(this.state.auth===true && bonus.status !== 'approved' && bonus.status !== 'rejected')?
                        <td class="row" postid={bonus._id}>
                        <input type="number" placeholder="Approved amount" name="amount" onChange={this.dataSetter}/>
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
                    <th scope="col">Amount</th>
                    <th scope="col">Status</th>
                    <th scope="col">Approved amount</th>
                    {(this.state.auth===true)? <th scope="col">Option</th> : null}
                    </tr>
                </thead>
                <tbody>
                    {(this.state.bonus!==null)?
                    this.bonusTable():null}
                </tbody>
                </table>
            </div>
        )
    }
}

export default BonusStatus
