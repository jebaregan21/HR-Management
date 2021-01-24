import React, { Component } from 'react'
import axios from 'axios'

class HolidayAdder extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            date : null,
            reason : null
        }
    }

    dataSetter = e => {
        this.setState({[e.target.name] : e.target.value})
    }

    formSubmit = e =>{
        e.preventDefault()
        axios.post('https://arcane-woodland-66880.herokuapp.com/calender',this.state,{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        .then(response =>{
            if(response.data.ok===true){
                this.props.holidayUpdater(response.data.holidays)
            }
            else{
                alert('Something went wrong')
            }
        }).catch(error =>{
            console.log(error)
        })
    }
    
    render() {
        return (
            <div class="fixed-bottom w-50 mx-auto border border-primary">
                <form onSubmit={this.formSubmit}>
                    <div class="col-lg-12">
                        <div class="row">
                            <div class="col-sm-4 form-group">
                                <label>Date</label>
                                <input type="date" class="form-control" name="date" onChange={this.dataSetter}/>
                            </div>
                            <div class="col-sm-4 form-group">
                                <label>Reason</label>
                                <input type="text" placeholder="Enter Reason.." class="form-control" name="reason" onChange={this.dataSetter}/>
                            </div>
                            <div class="col-sm-4 form-group">
                                <label>Click here to add</label><br></br>
                                <input type="submit" class="btn btn-primary" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default HolidayAdder
