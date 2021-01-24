import CalendarTable from '../components/CalendarTable'
import NavBar from '../components/NavBar'

function Calendar(props){
    return(
        <div>
            <NavBar key={props.key} active="calendar" firstName={props.firstName} userId={props.userId} auth={props.auth} logoutClearer={props.logoutClearer}></NavBar>
            <CalendarTable auth={props.auth}></CalendarTable>
        </div>
    )
}

export default Calendar
