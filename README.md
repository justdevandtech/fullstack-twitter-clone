# Fullstack Twitter Clone

This is a fullstack Twitter clone project built using modern web technologies. The goal of this project is to replicate the core functionality of Twitter, allowing users to create accounts, post tweets, follow other users, and engage with their content.

![ttt---1](https://github.com/ophicial-pauloski/fullstack-twitter-clone/assets/57170298/defcf416-cbdb-4b69-a5ef-92acc34c9b1c)

![ttt--2](https://github.com/ophicial-pauloski/fullstack-twitter-clone/assets/57170298/44406dc7-fd2b-4efc-848b-45f603e1171a)
![tt---3](https://github.com/ophicial-pauloski/fullstack-twitter-clone/assets/57170298/39a7e2b1-1007-430b-a4d9-bd645d21c576)




## Features

- User registration and authentication
- Posting tweets with no character limit
- Following and unfollowing other users
- Viewing and interacting with the timeline of tweets
- Liking and unliking tweets
- User profile pages with user info, and followers and following counts

## Technologies Used

### Frontend

- HTML, CSS, JavaScript, TypeScript, Tailwin-css
- React.js for building the user interface
- Redux-toolkit for state management
- zod for data validation
- React-hook-form for form handling
- date-fns for date/time manipulation
- Axios for making HTTP requests

### Backend

- Node.js for server-side development
- Express.js as the web framework
- Postgres for data storage
- Prisma for the object modeling tool
- JSON Web Tokens (JWT) for authentication
- Bcrypt for hashing

### Deployment

- Railway App for hosting the backend
- vercel for hosting the frontend

## Installation

To run the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/ophicial-pauloski/fullstack-twitter-clone.git`
2. Navigate to the project directory: `cd fullstack-twitter-clone`
3. Install the dependencies for the backend:
cd backend-twitter-clone
`npm install` or `yarn install`

## Set up the environment variables:
- Create a `.env` file in the `backend` directory.
- Add the following variables:
  ```
  PORT=800
  DATABASE_URL=your-postgres-uri
  JWT_SECRET_KEY=your-jwt-secret
  ```
- Replace `your-postgres-uri` with the connection string to your MongoDB database.
- Replace `your-jwt-secret` with a secret key for JWT token generation.
  
## Start the backend server:
`npm run dev` or `yarn dev`

## Install the dependencies for the frontend:
cd frontend-twitter-clone
`npm install` or `yarn install`

## Set up the environment variables:
- Create a `.env` file in the `frontend` directory.
- Add the following variables:
  ```
  REACT_APP_API_URL=http://localhost:8000/api/v1
  ```
- Replace `http://localhost:8000/api/v1` with the URL where your backend server is running on.

## Start the frontend development server:
``npm install` or `yarn install`

##  Open your browser and navigate to `http://localhost:3000` to see the application in action.
