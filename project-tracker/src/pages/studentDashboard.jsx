import { useOutletContext } from "react-router-dom"

function StudentDashboard(){

    const {user} = useOutletContext()

    return(
        <>
            <h1>STUDENT DASHBOARD</h1>
            <p> Hi {user.name}</p>


        </>
    )
}

export default StudentDashboard