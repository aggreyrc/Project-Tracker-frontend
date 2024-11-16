import { useSelector } from "react-redux"

function AdminDashboard(){

    const {user, isAdmin} = useSelector((state) => state.auth)

    console.log("User:", user);
    console.log("Is Admin:", isAdmin);

    if (!isAdmin){
        return <p>Access Denied. You are not an admin.</p>;
    }

    return(
        <>
            <h1>ADMIN DASHBOARD</h1>
            <p> Hi {user.name}</p>
        </>
    )
}

export default AdminDashboard