# Overview

This project is a Pediatric BMI Analysis and Visualization System designed to help me strengthen my software development skills by building a complete application that works with a SQL relational database.

The software manages children and their health control records. Users can create, view, update, and delete child records and health control records through a web application. The application calculates Body Mass Index (BMI) from weight and height and stores the calculated value with the corresponding control record.

The software integrates with a MySQL relational database through a Java Spring Boot backend. The backend provides REST API endpoints that allow the web application to communicate with the database. The application uses Spring Data JPA and Hibernate to persist and retrieve information.

To use the program, a user can create a child record and then open the child's record to create health control records. A control record can include information such as date, weight, height, vital signs, dietary information, and calculated BMI. Existing records can be selected and updated, or deleted when necessary. The application can also retrieve a child's control history by combining information from the related database tables.

I wrote this software to strengthen my understanding of Java, object-oriented programming, REST APIs, relational databases, SQL operations, database relationships, and connecting a backend application to persistent data. It also gives me practical experience building software that combines multiple programming concepts into a functional application.

The software demonstration will show the application running, a walkthrough of the source code, and the MySQL relational database and its tables.

[Software Demo Video](https://drive.google.com/file/d/1otMsXpI2U4wy2BK6Ko_IyMae13Hb2fxz/view?usp=sharing)

# Relational Database

The application uses MySQL as its SQL relational database. The database is named `imc_pediatrico`.

The database contains two main tables:

* `children`
* `controls`

The `children` table stores information about each child. Its main fields include:

* `identification` – primary key used to uniquely identify the child
* `first_name`
* `last_name`
* `birth_date`
* `gender`
* `family_history`
* `personal_history`

The `controls` table stores health control information for each child. Its main fields include:

* `id` – primary key with automatic generation
* `control_date`
* `weight`
* `height`
* `bmi`
* `head_circumference`
* `thoracic_circumference`
* `abdominal_circumference`
* `heart_rate`
* `respiratory_rate`
* `oxygen_saturation`
* `temperature`
* `hemoglobin`
* `diet`
* `meals_per_day`
* `height_for_age_result`
* `weight_for_age_result`
* `bmi_for_age_result`
* `child_id`

The tables have a one-to-many relationship. One child can have multiple health control records, while each control belongs to one child.

The relationship is represented by the `identification` field in the `children` table and the `child_id` field in the `controls` table.

The application performs the four basic SQL database operations:

* INSERT
* SELECT
* UPDATE
* DELETE

The application also uses a SQL `JOIN` between the `children` and `controls` tables to retrieve a child's control history.

# Development Environment

I developed this software using IntelliJ IDEA and Visual Studio Code. I used Git and GitHub for version control, Maven for project management, Postman for testing REST API requests, and MySQL Workbench for creating and inspecting the relational database.

The programming language used is Java.

The main libraries and technologies used in the project are:

* Spring Boot
* Spring Data JPA
* Hibernate
* MySQL Connector/J
* Maven
* Java Collection Framework

Spring Boot is used to create the backend REST API. Spring Data JPA and Hibernate are used to communicate with the relational database and manage persistent entities. The Java Collection Framework, including `List`, is used to manage groups of child and control records.

# Useful Websites

* [Java Documentation](https://docs.oracle.com/en/java/)
* [Spring Boot Documentation](https://docs.spring.io/spring-boot/index.html)
* [Spring Data JPA Documentation](https://docs.spring.io/spring-data/jpa/reference/)
* [MySQL Documentation](https://dev.mysql.com/doc/)
* [GitHub Documentation](https://docs.github.com/)

# Future Work

* Add more pediatric growth reference data.
* Improve the BMI-for-age and growth chart visualizations.
* Add additional charts using Chart.js.
* Improve validation and error handling for incorrect or incomplete data.
* Add PDF reports for pediatric control records.
* Improve the web interface and user experience.
* Add authentication and user roles.
* Prepare a demonstration configuration using an in-memory database for educational deployment.
