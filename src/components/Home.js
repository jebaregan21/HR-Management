import React from 'react'
import '../css/home.css'

function Home(props){
    return(
      <div>
        {(props.auth===false || props.auth===null)?
        <div class="card text-white cont align-self-center">
      <div class="card mt-2 mb-3 bg-warning">
        <div class="card-body">
          <h5 class="card-title">Apply for leave</h5>
          <a href="/leave" class="btn btn-dark">Go</a>
          <br></br><br></br>
          <a href="/leave/status" class="btn btn-dark">Check status</a>
        </div>
      </div>
      <div class="card p-3 mb-3 bg-success">
        <div class="card-body">
        <h5 class="card-title">Apply for loan</h5>
        <a href="/loan" class="btn btn-danger">Go</a>
        <br></br><br></br>
          <a href="/loan/status" class="btn btn-danger">Check status</a>
        </div>
      </div>
      <div class="card mb-3 bg-secondary">
        <div class="card-body">
          <h5 class="card-title">Apply for bonus</h5>
          <a href="/bonus" class="btn btn-info">Go</a>
          <br></br><br></br>
          <a href="/bonus/status" class="btn btn-info">Check status</a>
        </div>
      </div>
      </div>
      
      :

      <div class="card text-white cont align-self-center">
      <div class="card mt-2 mb-3 bg-warning">
        <div class="card-body">
          <h5 class="card-title">Leave requests</h5>
          <a href="/leave/status" class="btn btn-dark">Go</a>
        </div>
      </div>
      <div class="card p-3 mb-3 bg-success">
        <div class="card-body">
        <h5 class="card-title">Loan requests</h5>
          <a href="/loan/status" class="btn btn-danger">Go</a>
        </div>
      </div>
      <div class="card mb-3 bg-secondary">
        <div class="card-body">
          <h5 class="card-title">Bonus requests</h5>
          <a href="/bonus/status" class="btn btn-info">Go</a>
        </div>
      </div>
      </div>
      }
      </div>
    )
}

export default Home