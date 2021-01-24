const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const User = require('./models/UserModel')
const path = require('path')

const Home = require('./RouteHandlers/Home')
const Login = require('./RouteHandlers/Login')
const CreateAccount = require('./RouteHandlers/CreateAccount')
const Calender = require('./RouteHandlers/Calender')
const LeaveForm = require('./RouteHandlers/LeaveForm')
const LoanForm = require('./RouteHandlers/LoanForm')
const BonusForm = require('./RouteHandlers/BonusForm')
const BonusStatus = require('./RouteHandlers/BonusStatus')
const LoanStatus = require('./RouteHandlers/LoanStatus')
const LeaveStatus = require('./RouteHandlers/LeaveStatus')
const Account = require('./RouteHandlers/Account')
const Search = require('./RouteHandlers/Search')
const PasswordReset = require('./RouteHandlers/PasswordReset')
const { use } = require('./RouteHandlers/Home')

const port = process.env.PORT || 5000

mongoose.connect('mongodb+srv://TeamTitan:TeamTitan@cluster0.ceyj7.mongodb.net/Cluster0?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.once('open', ()=>{
    console.log('Connect with DB')
}).on('error', err =>{
    console.log(`An error has occured : ${err}`)
})

let corsOptions = {
    origin : 'https://immense-springs-88024.herokuapp.com',
    methods : ['POST','GET','DELETE'],
    credentials : true
}
app.use(cors(corsOptions))
// app.use(express.static(path.join(__dirname,'client','build')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(Home)
app.use(Login)
app.use(CreateAccount)
app.use(Calender)
app.use(LeaveForm)
app.use(LoanForm)
app.use(BonusForm)
app.use(BonusStatus)
app.use(LoanStatus)
app.use(PasswordReset)
app.use(LeaveStatus)
app.use(Account)
app.use(Search)

app.listen(port, () => {
    console.log(`App running in port ${port}`)
})

// app.get('*',(req,res)=>{
//     res.sendFile(path.join(__dirname, '../client/build/index.html'),err=>{
//         if(err){
//             console.log(err)
//             res.json({ok : false})
//         }
//     })
// })