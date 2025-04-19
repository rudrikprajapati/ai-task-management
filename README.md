# AI-Powered Task Management System

A full-stack task management application built with **Golang (Gin)** for the backend and **Next.js (TypeScript, Tailwind, Shadcn UI)** for the frontend. It features user authentication, task CRUD operations, real-time updates via WebSockets, and AI-powered task suggestions using Google’s Gemini API.

## Features
- **Authentication:** JWT-based user registration and login.
- **Task Management:** Create, read, and (partially) update tasks with status and assignment options.
- **AI Suggestions:** Context-aware subtask suggestions powered by Gemini AI, based on existing tasks.
- **UI:** modern interface with Shadcn UI components and Tailwind CSS.

## Prerequisites
- **Golang**: 1.21+ (for backend)
- **Node.js**: 18+ (for frontend)
- **PostgreSQL**: NeonDB instance (or local PostgreSQL)
- **Gemini API Key**: For AI suggestions (get from Google Cloud or AI Studio)

## Getting Started

### Backend Setup
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/rudrikprajapati/zocket-task
   ```

2. **Install Dependencies:**
   ```bash
   go mod tidy
   ```

3. **Run the Backend:**
   ```bash
   go run main.go
   ```
   - Runs on `http://localhost:8080`.

### Frontend Setup
1. **Navigate to Frontend Directory:**
   ```bash
   cd task-manager-frontend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run the Frontend:**
   ```bash
   npm run dev
   ```
   - Runs on `http://localhost:3000`.

4. **Access the App:**
   - Open `http://localhost:3000` in your browser.
   - Register a user, log in, and start managing tasks.


https://github.com/user-attachments/assets/48952216-ef94-4c8b-8d4f-d4356a10fa07


![90F812A9-E867-47A4-8706-D4AFB7D6A697_1_102_o](https://github.com/user-attachments/assets/085dc6bd-bfeb-4ac3-983c-7169f7c922a7)

