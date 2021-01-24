import React, { Component } from 'react'
import axios from 'axios'
import history from '../history'

class LoanStatus extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loans : null,
            auth : false,
            current : null
        }
    }

    componentDidMount(){
        document.title = 'Loan request status'
        if(localStorage.getItem('token')===null){
            history.push('/login')
        }
        axios.get('https://arcane-woodland-66880.herokuapp.com/loan/status',{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        .then(response=>{
            if(response.data.ok===true){
                this.setState({auth:response.data.auth,loans:response.data.loans})
            }
            else{
                alert('No loan request found')
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
         
        axios.post(`https://arcane-woodland-66880.herokuapp.com/loan/status/${key}`,
        {
            action:true,
            id : key,
            amount : this.state.amount
        }
        ,{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        .then(response=>{
            if(response.data.ok===true){
                history.push('/loan/status')
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
        axios.post(`https://arcane-woodland-66880.herokuapp.com/loan/status/${key}`,
        {
            action:false,
            id : key,
            amount : 0
        }
        ,{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        .then(response=>{
            if(response.data.ok===true){
                history.push('/loan/status')
            }
            
        }).catch(error=>{
            alert('Oops something went wrong try again')
        })
    }


    loanTable(){
        return this.state.loans.map(loan => {
                return(
                <tr class>
                    <td><a href={`/account/${loan.userId}`}>{loan.requester}</a></td>
                    <td>{loan.amount}</td>
                    <td>{loan.type}</td>
                    <td>{loan.status}</td>
                    <td>{loan.approvedAmount}</td>
                    {(this.state.auth===true && loan.status !== 'approved' && loan.status!=='rejected')?
                        <td class="row" postid={loan._id}>
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
                    <th scope="col">Type</th>
                    <th scope="col">Status</th>
                    <th scope="col">Approved amount</th>
                    {(this.state.auth===true)? <th scope="col">Option</th> : null}
                    </tr>
                </thead>
                <tbody>
                    {(this.state.loans!==null)?
                    this.loanTable():null}
                </tbody>
                </table>
            </div>
        )
    }
}

export default LoanStatus
