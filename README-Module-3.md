# Pediatric BMI Web Application

## Overview

The Pediatric BMI Web Application is a web application designed to help users register children, manage medical controls, calculate pediatric health indicators, and monitor growth measurements through interactive charts.

The application allows users to create and manage children's records, record weight and height measurements, review previous medical controls, and visualize weight-for-age, length/height-for-age, and BMI-for-age information.
Form validation helps prevent incomplete or invalid records from being submitted.

The frontend was developed with React and Vite. It communicates with a Spring Boot REST API, which manages persistent data stored in a MySQL database. Chart.js is used to display growth reference charts and dynamically
visualize the child's measurements.

My goal in developing this software was to strengthen my skills in modern web application development, particularly component-based frontend design, state management, REST API integration, database-backed applications,
and interactive data visualization. Migrating the frontend to React also provided an opportunity to organize the interface into reusable components while preserving the existing backend and calculation logic.

### Running the Application Locally

First, start the Spring Boot backend from the project root:

```bash
./mvnw spring-boot:run
```

The backend runs at:

`http://localhost:8080`

Next, open a second terminal and start the React frontend:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite in the terminal, usually:

`http://localhost:5173` use the route `/imc-pediatrico/frontend$ npm run dev`  <== FRONTEND

The backend must be running while using the application. The frontend uses the Vite proxy to forward API requests to the Spring Boot server. 
The MySQL database must also be configured and available according to the application's backend settings.

### Software Demo Video

[Software Demo Video](https://www.youtube.com/watch?v=REPLACE_WITH_VIDEO_ID)

Replace the placeholder URL with the actual video link after publishing the demonstration.

## Project Structure

The project is organized into two main parts: a Spring Boot backend and a React frontend. The backend manages application logic and database operations, 
while the frontend provides the user interface and interactive growth charts.

```text
imc-pediatrico/
├── src/
│   └── main/
│       ├── java/
│       │   └── org/israelsantos/imc_pediatrico/
│       │       ├── controller/       # REST API endpoints
│       │       ├── service/          # Application and business logic
│       │       ├── repository/       # Database access
│       │       └── entity/           # Database entities
│       │
│       └── resources/
│           └── static/
│               ├── index.html        # Legacy frontend backup
│               ├── pages/            # Legacy frontend pages
│               └── js/
│                   ├── app.js        # Legacy JavaScript implementation
│                   └── charts.js     # Existing growth chart logic
│
└── frontend/
    ├── package.json
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── main.jsx                  # React entry point
        ├── App.jsx                   # Main application component
        ├── pages/
        │   ├── Children.jsx          # Children list and management
        │   └── ChildRecord.jsx       # Child record and medical controls
        ├── components/
        │   ├── ChildForm.jsx         # Child data form
        │   ├── ControlForm.jsx       # Medical control form
        │   ├── ControlList.jsx       # Medical control list
        │   └── GrowthChart.jsx       # Growth chart component
        └── services/
            └── api.js                # Frontend API communication
```

The `frontend` directory contains the React application. Its pages organize the main application views, reusable components handle forms and charts, and `services/api.js` 
centralizes communication with the backend.

The Java packages separate responsibilities: controllers expose REST endpoints, services handle application logic, repositories access persistent data, and entities represent database records.

The files under `src/main/resources/static` belong to the previous frontend implementation and are retained as legacy resources. The React application in `frontend` is the active frontend for this module.

## Frontend and Backend Integration

The React frontend uses Vite as its local development server. The `vite.config.js` file configures a development proxy 
that forwards API requests from the frontend to the Spring Boot backend running at `http://localhost:8080`.

The development workflow is:

```text
Browser
   |
   | http://localhost:5173
   v
React + Vite Frontend
   |
   | API requests through the Vite proxy
   v
Spring Boot REST API
   |
   | Database operations
   v
MySQL Database
```

The frontend sends HTTP requests and receives JSON responses through the backend API. The Vite proxy allows the frontend to use the backend endpoints during local development
without requiring the frontend to communicate directly with a separate backend origin.

The proxy configuration belongs to `frontend/vite.config.js`. The frontend API service in `frontend/src/services/api.js` uses the API paths to communicate with the backend.
This keeps HTTP communication separate from the React page and component logic.

The legacy `app.js` and the React `api.js` have different responsibilities. The legacy `app.js` contains JavaScript from the previous frontend, while `api.js` is the service 
layer used by the React application to make backend requests. The existing growth chart logic in `charts.js` was preserved as part of the legacy resources; the React chart 
component uses the chart implementation configured for the active frontend.

## Web Pages

### Children Page

The Children page is the main entry point of the application. It allows users to:

- Register a child by entering the required identification and personal information.
- View the list of registered children.
- Edit existing child information.
- Delete a child's record.
- Open a child's medical record to manage medical controls and view growth information.

The displayed list is populated using data retrieved from the backend. After normal create, update, or delete operations, React updates the interface to reflect the current application state.

### Child Record Page

The Child Record page displays the selected child's information and provides access to medical controls and growth visualizations.

Users can:

- View the child's information.
- Create a medical control containing a control date, weight, and height.
- View previously recorded controls.
- Edit or delete a control.
- Review calculated health indicators.
- View growth charts containing the child's measurements.

The control list and chart data reflect the available records. Users can navigate between the child list and the selected child's record through the application's navigation.

### Dynamic Content and Interaction

The application uses React state, event handlers, forms, and API requests to update the interface in response to user actions.

Examples of dynamic behavior include:

- Displaying children and medical controls retrieved from the database.
- Validating required form fields before submission.
- Refreshing displayed records after create, update, and delete operations.
- Calculating age and BMI from the relevant child and measurement data.
- Adding or updating measurement points on growth charts when controls change.

The application uses Chart.js to display six reference charts: length/height-for-age, weight-for-age, and BMI-for-age for boys and girls. The child's gender determines which reference chart is used,
and the relevant measurements are displayed on the corresponding chart.

## Development Environment

The application was developed using the following tools and technologies.

### Frontend

- React for building the component-based user interface.
- JavaScript for application logic and event handling.
- Vite for local development and the frontend development server.
- React Router for navigation between application pages.
- Chart.js for interactive growth charts.
- HTML5 and CSS3 for page structure and styling.

### Backend

- Java for backend application logic.
- Spring Boot for the REST API.
- Spring Web for HTTP endpoints and API communication.
- Maven for backend dependency management and execution.

### Database

- MySQL for persistent storage of children's records and medical controls.

### Development Tools

- Node.js and npm for frontend dependencies and scripts.
- Git and GitHub for version control and source code hosting.
- Visual Studio Code for code editing.

The application follows a frontend-backend architecture. React communicates with the Spring Boot REST API using HTTP requests and JSON data. The backend handles data operations and communicates with MySQL
through the existing persistence layer.

## Useful Websites

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/guide/)
- [React Router Documentation](https://reactrouter.com/)
- [Chart.js Documentation](https://www.chartjs.org/docs/latest/)
- [Spring Boot Documentation](https://docs.spring.io/spring-boot/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [World Health Organization: Child Growth Standards](https://www.who.int/tools/child-growth-standards)

## Future Work

- Add PDF report generation and printing for children's medical records.
- Expand automated testing for frontend interactions, backend endpoints, and database operations.
- Improve deployment configuration so the application can be used outside the local development environment.
- Continue improving accessibility and responsive behavior across different screen sizes.
- Expand reporting and visualization features while maintaining the existing pediatric growth calculations.