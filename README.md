

  <p align="center">User and Contact Management.</p>
    

<p>

## Overview

This project is a User and Contact Management API built using the NestJS framework and PostgreSQL as the database. The API allows users to register, login, verify their email addresses, and manage a personal contacts book. The application also supports JWT-based authentication to ensure that only authenticated users can access protected routes.

## Features

-User Registration: Users can register using their email and receive a verification link via email.<br>
-Email Verification: Users must verify their email address before accessing protected routes.<br>
-User Login: JWT-based authentication for secure login.<br>
-Create, Read, Update, and Delete (CRUD) Contacts: Authenticated users can manage their own contacts.<br>
-Search Contacts: Users can search contacts by name or phone number.<br>
-Pagination: Retrieve contacts with pagination support.<br>
-Protected Routes: Contacts API routes are restricted to logged-in users.<br>

## Technologies used

  -NestJS: Backend framework.<br>
  -TypeORM: ORM for database interactions.<br>
  -PostgreSQL: Database.<br>
  -JWT: JSON Web Tokens for authentication.<br>
  -Mailgun: Email service for sending verification emails.<br>
  -Postman: API documentation and testing.<br>

## Project setup

  $ Pre-requisites

  -Node.js and npm
  -PostgreSQL
  -Mailgun account for email services

  $ Setup

  ```bash

    $ git clone https://github.com/sauravcell/Contact_Book_Management.git
    $ cd Contact_Book_Management
    $ npm install 

  ```

## Compile and run the project

  ```bash
  # development
  $ npm run start
  
  # watch mode
  $ npm run start:dev
  
  # production mode
  $ npm run start:prod
  ```

## API Endpoints

1. User Registration:
  $ POST /api/auth/register

    -> Registers a new user and sends a verification email.

2. User Login:
  $ POST /api/auth/login

    -> Authenticates a user and returns a JWT.

3. Email Verification:
  $ GET /api/auth/verify?token={token}

    -> Verifies a user's email with the token sent in the verification email.

4. Create Contact:
  $ POST /api/contacts

    -> Requires JWT token in the Authorization header.

    -> Creates a new contact for the authenticated user.

5. Get All Contacts (With Pagination):
  $ GET /api/contacts?page={page}&limit={limit}

    -> Requires JWT token in the Authorization header.

    -> Retrieves all contacts with pagination support.

6. Search Contacts:
  $ GET /api/contacts/search?query={name_or_phone}
  
    -> Requires JWT token in the Authorization header.
  
    -> Searches for contacts by name or phone number.

7. Update Contact:
  $ PUT /api/contacts/{contactId}
  
    -> Requires JWT token in the Authorization header.
  
    -> Updates a specific contact by ID.

8. Delete Contact:
  $ DELETE /api/contacts/{contactId}
  
    -> Requires JWT token in the Authorization header.
  
    -> Deletes a specific contact by ID.

## Database

  $ Entities: user Entity, Contact Entity.<br>
  $ Relationship: One-To-Many.
  
## Resources
</p>


