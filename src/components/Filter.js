import React, { Component } from 'react'
import ListFilter from './ListFilter'

class Filter extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            list : null
        }
    }
    
    componentDidMount(){
        document.title = 'Search employee'
    }
    
    listUpdater = (list) =>{
        this.setState({list})
    } 

    list(){
        return this.state.list.map(user=>{
            return(
            <tr key={user._id}>
                <td>{this.state.list.indexOf(user)+1}</td>
                <td><a href={`/account/${user._id}`}>{user.firstName}</a></td>
                <td>{user.team}</td>
                <td>{user.title}</td>
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
                    <th scope="col">Firstname</th>
                    <th scope="col">Team</th>
                    <th scope="col">Title</th>
                    </tr>
                </thead>
                <tbody>
                    {(this.state.list!==null && this.state.list!==undefined)?
                    this.list():null}
                </tbody>
                </table>
                <ListFilter listUpdater={this.listUpdater}/>
            </div>
        )
    }
}

export default Filter
