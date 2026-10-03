# Pediatric BMI Web Application

## Overview

The Pediatric BMI Web Application is a web-based system designed to record and monitor pediatric health information.

The application allows users to register children, record medical controls, calculate health indicators, and visualize growth information using percentile charts.

The project was originally developed using a traditional HTML, CSS, and JavaScript frontend connected to a Spring Boot REST API and MySQL database.

For CSE310 Module 3, the frontend was migrated to **React** while preserving the existing Spring Boot REST API and MySQL database.

---

## Technologies Used

### Frontend

* React
* JavaScript
* Vite
* React Router
* HTML5
* CSS3
* Chart.js

### Backend

* Java
* Spring Boot
* Spring Web
* REST API

### Database

* MySQL

### Development Environment

* Node.js
* npm
* Java
* Maven
* Git

---

## Application Architecture

The application uses a React frontend connected to the existing Spring Boot REST API.

```text
React + Vite
      |
      | HTTP / JSON
      v
Spring Boot REST API
      |
      | JPA / Hibernate
      v
MySQL Database
```

The growth charts use Chart.js.

```text
React
  |
  v
GrowthChart.jsx
  |
  v
charts.js
  |
  v
Chart.js
```

The existing chart calculation and percentile logic was preserved during the React migration.

---

## React Frontend

The React application is located inside the `frontend` directory.

```text
frontend/
├── package.json
├── package-lock.json
├── index.html
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── pages/
    │   ├── Children.jsx
    │   └── ChildRecord.jsx
    ├── components/
    │   ├── ControlForm.jsx
    │   ├── ControlList.jsx
    │   └── GrowthChart.jsx
    └── services/
        └── api.js
```

### Main React Pages

#### Children

The `Children` page allows the user to:

* Create a new child.
* View registered children.
* Edit child information.
* Delete children.
* Open the medical record of a child.

#### Child Record

The `ChildRecord` page allows the user to:

* View child information.
* Create medical controls.
* View previous controls.
* Edit controls.
* Delete controls.
* View calculated health indicators.
* View pediatric growth charts.

---

## Dynamic User Interaction

The application uses React state and event handlers to dynamically update the interface.

Examples include:

* Form input state.
* Child creation and editing.
* Control creation and editing.
* Dynamic control lists.
* Dynamic chart updates.
* Delete operations.
* Navigation between application pages.

The interface does not require a complete page reload after normal CRUD operations.

---

## Database Integration

The React frontend communicates with the Spring Boot REST API.

The API communicates with the MySQL database.

Examples of operations include:

```text
GET    /api/children
GET    /api/children/{identification}
POST   /api/children
PUT    /api/children/{identification}
DELETE /api/children/{identification}

GET    /api/children/{identification}/controls
GET    /api/controls/{id}
POST   /api/controls
PUT    /api/controls/{id}
DELETE /api/controls/{id}
```

This satisfies the database integration requirement because the React application retrieves and modifies persistent data stored in MySQL through the REST API.

---

## Form Validation

The application validates required information before submitting forms.

### Child

The following information is required:

* Identification
* First name
* Last name
* Birth date
* Gender

### Control

The following information is required:

* Control date
* Weight
* Height

Weight and height must also be greater than zero.

Other clinical fields are optional.

---

## Pediatric Health Calculations

The application calculates and displays pediatric health information including:

* BMI
* Age
* Weight-for-age
* Height/length-for-age
* BMI-for-age

Growth measurements are displayed using percentile charts.

The charts use the child's gender to select the corresponding reference data.

---

## Growth Charts

The application uses Chart.js to display six available reference charts:

* Length/Age - Boys
* Length/Age - Girls
* Weight/Age - Boys
* Weight/Age - Girls
* BMI/Age - Boys
* BMI/Age - Girls

The React application dynamically adds the child's measurements to the corresponding chart.

The existing chart implementation was preserved during the migration to React.

---

## Running the Application

### 1. Start the Spring Boot backend

From the project root:

```bash
./mvnw spring-boot:run
```

The backend runs on:

```text
http://localhost:8080
```

---

### 2. Start the React frontend

Open another terminal and enter the frontend directory:

```bash
cd frontend
```

Install dependencies if necessary:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Vite will provide the local development URL in the terminal.

The React development server uses the Vite proxy to forward API requests to the Spring Boot server.

---

## Vite Proxy

The React frontend uses the following proxy configuration:

```text
/api → http://localhost:8080
/js  → http://localhost:8080
```

This allows React to communicate with the existing Spring Boot application during local development.

---

## Testing

The application has been tested through normal CRUD workflows.

### Children

* Create child
* Read child
* Update child
* Delete child

### Controls

* Create control
* Read controls
* Update control
* Delete control

### Charts

The application has also been tested after:

* Creating controls.
* Editing controls.
* Deleting controls.
* Deleting the last control.
* Navigating between React pages without refreshing the browser.

The calculated points are synchronized with the current control data.

---

## CSE310 Module 3 Requirements

This project uses React as the required web application framework.

The application demonstrates:

* A framework-based web application using React.
* Multiple dynamic pages.
* Interactive user input through forms.
* Dynamic data rendering.
* Local development using Vite.
* Database integration through the existing Spring Boot REST API and MySQL database.
* Dynamic visualization using Chart.js.
* Persistent data retrieved from and stored in a database.

---

## Future Improvements

The following features are planned or may be added later:

* PDF generation and printing of pediatric records.
* Additional visual improvements and responsive CSS.
* Deployment of the application.
* Additional database testing using H2.
* GitHub/GitHub Pages integration where appropriate.
* Further improvements to the user interface.

---

## Project Status

The React frontend migration has been successfully completed.

The current architecture allows the React frontend to use the existing Spring Boot and MySQL infrastructure while providing a modern component-based interface.

Further development will focus on reporting, deployment, styling, and additional testing.
