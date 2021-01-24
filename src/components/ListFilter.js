import axios from 'axios'
import React, { Component } from 'react'

class ListFilter extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
            teamCheck : false,
            titleCheck : false,
            team : null,
            title : null
        }
    }

    dataSetter = e => {
        this.setState({[e.target.name] : e.target.value})
    }

    check1 = e =>{
        const k = (this.state.teamCheck===true)?false:true
        this.setState({teamCheck:k})
    }

    check2 = e =>{
        const k = (this.state.titleCheck===true)?false:true
        this.setState({titleCheck:k})
    }
    
    formSubmit = e =>{
        e.preventDefault()
        if(this.state.teamCheck === false && this.state.titleCheck === false){
            this.setState({type : 0,team : null,title:null},this.post)
        }
        else if(this.state.teamCheck === true && this.state.titleCheck === false){
            this.setState({type : 1,title:null},this.post)
        }
        else if(this.state.teamCheck === false && this.state.titleCheck === true){
            this.setState({type : 2,team:null},this.post)
        }
        else{
            this.setState({type : 3},this.post)
        }
        
    }

    post = ()=>{
        axios.post('https://arcane-woodland-66880.herokuapp.com/search',this.state)
        .then(response =>{
            if(response.data.ok === true){
                this.props.listUpdater(response.data.user)
            }
            else{
                alert('something went wrong')
            }
        }).catch(err=>{
            alert('something went wrong')
        })
    }

    render() {
        return (
            <div class="fixed-bottom w-50 mx-auto border border-primary">
                <form onSubmit={this.formSubmit}>
                    <div class="col-lg-12">
                        <div class="row">
                            <div class="col-sm-6 form-group">
                                <label>Team</label>
                                <input type="checkbox" checked={this.state.teamCheck} onChange={this.check1}/>
                            </div>
                            <div class="col-sm-6 form-group">
                                <label>Title</label>
                                <input type="checkbox" checked={this.state.titleCheck} onChange={this.check2}/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-4 form-group">
                                <label>Team</label>
                                <input type="text" class="form-control" placeholder="Enter team name here..." name="team" onChange={this.dataSetter}/>
                            </div>
                            <div class="col-sm-4 form-group">
                                <label>Title</label>
                                <input type="text" placeholder="Enter title.." class="form-control" name="title" onChange={this.dataSetter}/>
                            </div>
                            <div class="col-sm-4 form-group">
                                <label>Search</label><br></br>
                                <input type="submit" class="btn btn-primary" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default ListFilter
