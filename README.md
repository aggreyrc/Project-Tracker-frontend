# Project-Tracker

The Project-Tracker Application is a React-based web application designed to manage and display data related to cohorts, projects, and project members. It utilizes Redux for state management and React Table for efficient data display and manipulation. The application provides features for creating, editing, deleting, and viewing details of different entities, ensuring an intuitive user experience for administrators.

Features
- Data Display: View cohorts, projects, and project members in a structured table format.
- Sorting and Pagination: Sort data by various columns and paginate through large datasets.
- CRUD Operations: Create, read, update, and delete operations for cohorts, projects, and project members.
- User Role Management: Admin users have the ability to edit and delete entries, while regular users have limited access.
- Responsive Design: The application is designed to be responsive and user-friendly across various devices.


# Technologies Used

## Frontend:

- React
- Redux
- React Table
- Tailwind CSS (for styling)

## Backend:

RESTful API


# Getting Started

Prerequisites
Node.js (v14 or later)
npm (v6 or later)

# Installation
Clone the repository:

```

git clone https://github.com/aggreyrc/Project-Tracker-frontend
cd project-tracker

```

## Install dependencies:

```
npm install
```

## Start the development server:

```
npm run dev
```

Open your browser and navigate to http://localhost:3000.


# Usage 

## Navigation
The application features a tabbed interface to switch between different entities: Cohorts, Projects, and Project Members.
Click on the respective tab to view the relevant data.
Performing Actions
- Editing: Click the "Edit" button next to an entry to open a form for editing the details.
- Deleting: Click the "Delete" button next to an entry to remove it from the database.
- Creating: Use the form that appears when you click Add project.

Sorting and Pagination
Click on the header of any column to sort the entries.
Use the "Previous" and "Next" buttons at the bottom of the table to navigate through pages of data.

# Code Structure
- src/: Contains all source code files
- components/: Contains reusable components such as DataTable and EntityForm.
- store/: Contains Redux slices and configuration for state management.
- App.js: Main application component that sets up routing and layout.
- index.js: Entry point of the application.


# Contributing
Contributions are welcome! Please follow these steps to contribute:

- Fork the repository.
- Create a new branch (git checkout -b feature-branch).
- Make your changes and commit them (git commit -m 'Add new feature').
- Push to the branch (git push origin feature-branch).


# Acknowledgments
Thanks to the open-source community for the libraries and tools that make this project possible.
Special thanks to contributors and users who help improve the application.