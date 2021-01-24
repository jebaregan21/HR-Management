import React, { Component } from 'react'
import axios from 'axios'
import HolidayAdder from './HolidayAdder'

class CalendarTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            holidays : null,
            auth : this.props.auth
        }
    }

    componentDidMount(){
        // this.setState({auth : this.props.auth})
        document.title = 'Calendar'
        axios.get('https://arcane-woodland-66880.herokuapp.com/calender')
        .then(response=>{
            if(response.data.ok===true){
                this.setState({holidays:response.data.holidays})
            }
            else{
                alert('No holidays found')
            }
        })
    }

    holidayUpdater = (holidays) =>{
        this.setState({holidays})
    } 

    holiday(){
        return this.state.holidays.map(holiday=>{
            return(
            <tr>
                <td>{this.state.holidays.indexOf(holiday)+1}</td>
                <td>{holiday.date.substring(0,10)}</td>
                <td>{holiday.reason}</td>
            </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <br></br><br></br><br></br>
                <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Count</th>
                    <th scope="col">Date</th>
                    <th scope="col">Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {(this.state.holidays!==null)?
                    this.holiday():null}
                </tbody>
                </table>
                {(this.state.auth===true)?<HolidayAdder holidayUpdater={this.holidayUpdater}/>: null}
            </div>
        )
    }
}

export default CalendarTable
