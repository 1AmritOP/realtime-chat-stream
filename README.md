# Realtime Chat Stream


Realtime Chat Stream is a full-stack application that allows users to create private rooms to watch YouTube videos together and chat in real time. It features synchronized video playback and a persistent chat history for each room.

## Features

-   **User Authentication**: Secure login and registration using Google (Firebase Authentication).
-   **Room Creation & Management**:
    -   Create new, private rooms with a unique, shareable ID.
    -   Join existing rooms using the room ID.
-   **Synchronized Video Streaming**:
    -   Watch YouTube videos in sync with all participants in a room.
    -   Real-time synchronized controls for play, pause, and seek.
    -   The room host can search for and change the YouTube video for everyone.
-   **Real-time Chat**:
    -   Live chat functionality within each room.
    -   Messages are persisted and loaded for users joining the room.
    -   Real-time notifications when a user joins or leaves the room.
-   **User Profiles**: View your user profile information.

## Tech Stack

The project is a monorepo containing a separate client and server.

-   **Frontend (Client)**
    -   **Framework/Library**: React.js, Vite
    -   **Styling**: Tailwind CSS
    -   **State Management**: Redux Toolkit
    -   **Real-time Communication**: Socket.IO Client
    -   **Routing**: React Router
    -   **Authentication**: Firebase Authentication
    -   **Video Player**: `react-youtube`
    -   **HTTP Client**: Axios
    -   **Notifications**: `react-toastify`

-   **Backend (Server)**
    -   **Framework**: Node.js, Express.js
    -   **Real-time Communication**: Socket.IO
    -   **Database**: MongoDB with Mongoose
    -   **Utilities**: `uuid` for room IDs, `ytsr` for YouTube search

## Project Structure

The repository is organized as a monorepo:

```
/
├── client/       # Contains the React frontend application
└── server/       # Contains the Node.js backend server
```

## Setup and Installation

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn
-   A MongoDB instance (local or cloud-based like MongoDB Atlas)
-   A Firebase project for authentication

### 1. Server Setup

1.  Navigate to the `server` directory:
    ```bash
    cd server
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `server` directory and add the following variables:
    ```env
    MONGODB_URI=your_mongodb_connection_string
    FRONTEND_URL=http://localhost:5173
    PORT=8000
    ```
4.  Start the server:
    ```bash
    npm run dev
    ```
    The server will be running on the port specified in your `.env` file (e.g., `http://localhost:8000`).

### 2. Client Setup

1.  Navigate to the `client` directory:
    ```bash
    cd client
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `client` directory and add your Firebase project credentials and the backend URL:
    ```env
    VITE_BACKEND_URL=http://localhost:8000

    # Firebase Config
    VITE_API_KEY=your_firebase_api_key
    VITE_AUTH_DOMAIN=your_firebase_auth_domain
    VITE_PROJECT_ID=your_firebase_project_id
    VITE_STORAGE_BUCKET=your_firebase_storage_bucket
    VITE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    VITE_APP_ID=your_firebase_app_id
    VITE_MEASUREMENT_ID=your_firebase_measurement_id
    ```
4.  Start the client:
    ```bash
    npm run dev
    ```
    The client will be running on `http://localhost:5173`.

## Deployment

This project includes `vercel.json` configuration files for both the client and server, making it ready for deployment on Vercel. Ensure you set the necessary environment variables in your Vercel project settings for both the client and server applications.

## License

This project is licensed under the ISC License.
