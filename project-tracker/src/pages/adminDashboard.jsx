import { useOutletContext } from "react-router-dom"

function AdminDashboard(){

    const {user} = useOutletContext()

    return(
        <>
            <h1>ADMIN DASHBOARD</h1>
            <p> Hi {user.name}</p>
        </>
    )
}

export default AdminDashboard