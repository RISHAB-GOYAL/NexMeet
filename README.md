# NexMeet

NexMeet is a full-stack video conferencing application built with React, Node.js, Express, Socket.IO, and MongoDB. It lets users sign in, create or join meetings, share audio/video, exchange chat messages, and use screen sharing inside a browser-based meeting room.

## What This Project Does

- User authentication with register and login flows.
- Meeting lobby for entering or creating a room.
- Real-time video and audio communication.
- Screen sharing during meetings.
- Live chat inside the meeting room.
- Meeting history and basic user-facing navigation.

## Project Structure

- `backend/` - Express + Socket.IO API server with MongoDB integration.
- `frontend/` - React single-page application for the UI.

## Requirements

- Node.js 18 or newer.
- npm.
- MongoDB Atlas or another MongoDB instance.

## Environment Variables

Create these files before running the app:

### `backend/.env`

```bash
PORT=8000
MONGODB_URI=your-mongodb-connection-string
FRONTEND_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000
SOCKET_CORS_ORIGIN=http://localhost:3000
```

### `frontend/.env`

```bash
REACT_APP_BACKEND_URL=http://localhost:8000
REACT_APP_APP_NAME=NexMeet
```

## Install Dependencies

Run the installs separately in each folder:

```bash
cd backend
npm install
```

```bash
cd frontend
npm install
```

## Run the Project Locally

### Start the backend

```bash
cd backend
npm start
```

For development with auto-restart:

```bash
cd backend
npm run dev
```

### Start the frontend

Open a second terminal:

```bash
cd frontend
npm start
```

The frontend usually runs at `http://localhost:3000` and the backend at `http://localhost:8000`.

## Build the Frontend for Production

```bash
cd frontend
npm run build
```

This creates a production-ready build in the `build/` folder.

## Production Backend Start

```bash
cd backend
npm start
```

If you want a PM2-based production process:

```bash
cd backend
npm run prod
```

## Deployment Summary

- Backend: deploy `backend/` on Render.
- Frontend: deploy `frontend/` on Vercel.
- Set `REACT_APP_BACKEND_URL` in Vercel to the Render backend URL.
- Set `FRONTEND_URL`, `CORS_ORIGIN`, and `SOCKET_CORS_ORIGIN` in Render to the final Vercel domain.

## Notes

- Do not commit real `.env` files to GitHub.
- Rotate your MongoDB credentials if they were exposed anywhere public.
- If you change the frontend URL later, update the backend CORS environment variables too.
