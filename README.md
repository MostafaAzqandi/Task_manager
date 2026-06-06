# TaskFlow

A collaborative task management application inspired by tools like Trello and Jira.

Built with Node.js, Express, Sequelize, EJS, and MySQL.

---

# Features

* Authentication system
* Workspace management
* Public / private workspaces
* Role-based workspace permissions
* Boards and tasks
* Task comments
* Task assignment
* Notification system
* AJAX notification updates
* Activity logs
* Flash messages
* Middleware-based access control

---

# Tech Stack

## Backend

* Node.js
* Express.js
* Sequelize ORM

## Frontend

* EJS
* Vanilla JavaScript
* TailwindCSS

## Database

* MySQL database with Sequelize

---

# Architecture Highlights

* Middleware-based permission system
* Reusable access-control middlewares
* Relational database design
* AJAX-powered notifications
* Clean controller/service structure

---

# Installation

```bash
git clone <repo-url>

cd task-manager

npm install
```

---

# Environment Variables

Create a `.env` file:

```env
PORT=3000

DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost

SESSION_SECRET=your_secret
```

---

# Run The Project

```bash
npm run dev
```

---

# Future Improvements

* REST API
* JWT authentication
* Realtime updates with Socket.IO
* Drag & drop boards
* File uploads
* Redis caching
* React frontend
* PostgreSQL migration

---


# Learning Goals

This project focuses heavily on:

* backend architecture
* authentication
* authorization
* SQL relationships
* middleware design
* scalable application structure

---

# Author

TaskFlow created as a backend-focused learning project.
