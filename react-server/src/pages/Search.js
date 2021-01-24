import Filter from '../components/Filter'
import NavBar from '../components/NavBar'

function Search(props){
    return(
        <div>
            <NavBar key={props.key} active="search" firstName={props.firstName} userId={props.userId} auth={props.auth} logoutClearer={props.logoutClearer}></NavBar>
            <Filter></Filter>
        </div>
    )
}

export default Search
