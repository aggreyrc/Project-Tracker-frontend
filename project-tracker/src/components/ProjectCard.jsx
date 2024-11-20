import React, { useEffect, useState } from 'react';
import { Users, Code, Globe, Database } from 'lucide-react';

export default function ProjectCard({ project }) {
  
  const[comments,setComments] = useState([])
  const[newComment,setNewComment] =useState('')
  const[showComments, setShowComments] =useState("")

  // key for storing project-specific comments in localStorage
  const storageKey = `comments_${project.id}`

  // load comments from the local storage
  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem(storageKey));
    setComments(savedComments)
  }, [storageKey])

  // save comments to local storage whenever they change
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(comments))
  }, [comments, storageKey])

  function toggleComments(){
    setShowComments(!showComments)
  }

  function handleAddComment(){
     
      if (newComment.trim()){
          setComments([...comments, newComment]);
          setNewComment("")
      }
  }

  const getProjectTypeIcon = (type) => {
    switch (type) {
      case 'Web Development':
        return <Globe className="h-12 w-12 text-indigo-600" />;
      case 'Data Science':
        return <Database className="h-12 w-12 text-green-600" />;
      case 'Software Engineering':
        return <Code className="h-12 w-12 text-blue-600" />;
      default:
        return <Code className="h-12 w-12 text-gray-600" />;
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-center mb-4">
        {getProjectTypeIcon(project.type)}
      </div>

      <h2 className="text-lg font-semibold text-gray-800 text-center">{project.name}</h2>
      <p className="mt-2 text-gray-600">{project.description}</p>
      <p className="mt-4 text-sm text-gray-500">
        Cohort: {project.cohort_name} | Created on: {new Date(project.created_at).toLocaleDateString()}
      </p>

      {project.github_url && (
        <a
          href={project.github_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:underline mt-2 block text-sm"
        >
          View on GitHub
        </a>
      )}

      <div className="flex items-center mt-4 text-gray-600">
        <Users className="h-5 w-5 mr-1" />
        <span className="text-sm font-medium">
          {project.project_members ? project.project_members.length : 0} Member
          {project.project_members && project.project_members.length !== 1 ? 's' : ''}
        </span>
      </div>

     {/* COMMENTS*/}

     {/* Toggle Button */}
      <button 
           onClick={toggleComments}
            className="bg-indigo-600 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600 transition"
         >
             {showComments? "Hide Comments" : "View Comments"}
      </button>

      {/* Comments Section */}
      {showComments && (

        <div>
          <h3 className="text-xl font-bold mb-2 text-black" >Comments:</h3>

          <ul className="space-y-2">
             {comments.map((comment, index) => (
                <li 
                    key={index} 
                    className="py-2 text-gray-800 border-b border-gray-300 hover:bg-gray-100 transition-colors cursor-pointer"
            
                  >
                  {comment}
                </li>
             ))}
          </ul>

          <div className="mt-4 flex items-center space-x-2">
              <input
                  type='text'
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder='Add a comment...'
                  className="flex-1 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            
              />

              <button 
                  onClick={handleAddComment} 
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
                >
                  Add
                </button>
          </div>
        </div>
      )}
    </div>
  );
}
