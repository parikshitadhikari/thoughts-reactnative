# Thoughts

Thoughts is a project built using:
- React Native
- Nodejs and Express
- MongoDB
- Redux Toolkit

### Demo
https://github.com/parikshitadhikari/auth-reactnative/assets/83907047/5d17c319-fc5f-44c1-8f4d-7ad6ca36174d

### Features
- Authentication
- Update user profile
- Add, Delete and Edit Thoughts
- Search thoughts

### Running the project
In order to run this project locally, firstly you'll need to setup `expo` in your Mobile or need and an Android or iOS simulator.

After, expo setup, following steps shall be performed

1. Clone this repository

2. Navigate to the root directory and run `npm i`. After installation, run `npm start` to run the client side.

3. Navigate to the `backend` directory and run `npm i`. Then inside the `backend` directory create a `.env` file and add the following:
```
NODE_ENV=development
PORT=**** 
MONGO_URI=*********** 
JWT_SECRET=*******
```
Now, run `npm start` to start the server.