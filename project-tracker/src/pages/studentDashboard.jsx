import { useSelector } from "react-redux"

function StudentDashboard(){


    const user = useSelector((state) => state.auth.user);



    if (!user){
        return <p>You need to log in to access this page.</p>
    }

    return(
        <>
            <h1>STUDENT DASHBOARD</h1>
            <p> Hi {user.name}!</p>


        </>
    )
}

export default StudentDashboard