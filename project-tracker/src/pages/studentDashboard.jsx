import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { setUser } from "../Components/authSlice";

function StudentDashboard(){

    const [projects,setProjects] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const dispatch =useDispatch();
    const user = useSelector((state) => state.auth.user);

    useEffect(() =>{

        fetch(`http://127.0.0.1:5555/projects?${currentPage}`)
        .then((response) => response.json())
        .then((projectsData) => {
                      console.log(projectsData);
                      console.log("Projects:", projectsData.projects)
                      setProjects(projectsData.projects || []);
                      setTotalPages(projectsData.pages || 1)

            })
        .catch((error) => console.error("Error fetching projects:", error))    

    },[dispatch, currentPage])



    if (!user){
        return <p>You need to log in to access this page.</p>
    }

    return(
        <>
            <h1>STUDENT DASHBOARD</h1>
            <p> Hi {user.name}!</p>

            <div>
               {projects.length > 0 ? (
                    projects.map((project) => (
                        <div key={project.id || Math.random().toString()} style={{ border: "1px solid #ddd", margin: "10px", padding: "10px" }}>
                            <h3>{project.name}</h3>
                            <p>{project.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No projects available.</p>
                )}
                
            </div>

            <div>
                {/* Previous Button */}
                <button
                    onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
                    disabled = {currentPage === 1}
                >
                    Previous
                </button>

                <button
                    onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                
                >
                    Next
                    
                </button>
            </div>




        </>
    )
}

export default StudentDashboard