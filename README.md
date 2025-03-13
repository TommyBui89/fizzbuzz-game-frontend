# FizzBuzz Game

A customizable FizzBuzz game where users can create, edit, and play with custom FizzBuzz rules. This project is split into two repositories:

- **Backend**: [.NET 8 / EF Core / SQLite](https://github.com/TommyBui89/fizzbuzz-game-backend)
- **Frontend**: [React + Vite](https://github.com/TommyBui89/fizzbuzz-game-frontend) (this repo)

## Table of Contents

1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Local Setup (No Docker)](#local-setup-no-docker)  
4. [Docker Setup](#docker-setup)  
5. [Usage](#usage)  
6. [License](#license)

---

## Features

- **Create** and **Edit** custom FizzBuzz games with different divisors and replacement texts.
- **Play** the game in real-time, with a timer and score tracking.
- **Backend** uses .NET 8 with Entity Framework Core and SQLite for easy local development.
- **Frontend** is a React app built with Vite for fast development builds.

---

## Tech Stack

- **.NET 8** (ASP.NET Core)  
  - **EF Core** for data access  
  - **SQLite** for a lightweight database  
- **React 18** with **Vite**  
- **Docker & Docker Compose** for containerized deployment

---

## Local Setup (No Docker)

If you want to run **backend** and **frontend** without Docker:

### 1. Clone Both Repos
```bash
git clone https://github.com/TommyBui89/fizzbuzz-game-backend.git
git clone https://github.com/TommyBui89/fizzbuzz-game-frontend.git
```

### 2. Install Requirements
- **.NET 8 SDK** (for backend)  
- **Node.js LTS** (for frontend)

### 3. Backend: Apply EF Migrations
```bash
cd fizzbuzz-game-backend/fizzbuzz-game-backend
dotnet ef migrations add InitialCreate  # if not already created
dotnet ef database update
```
This creates a local `fizzbuzz.db` with the necessary tables.

### 4. Run the Backend
```bash
dotnet run
```
Backend should start at `http://localhost:8080` (see console logs).

### 5. Run the Frontend
```bash
cd fizzbuzz-game-frontend
npm install
npm run dev
```
Frontend typically runs at `http://localhost:5173`.

### 6. Test
- Visit `http://localhost:5173` for the frontend.
- The frontend calls the backend at `http://localhost:8080/api/...`.

---

## Docker Setup

If you want **everything** to run automatically in Docker, do this:

1. **Clone** both repos (backend & frontend).
2. **Navigate** to the **frontend** folder (which contains `docker-compose.yml`).
3. **Run**:
   ```bash
   docker-compose up --build
   ```
4. Docker will build **two containers**:
   - **backend** (listening on `localhost:8080`)
   - **frontend** (listening on `localhost:4173`)
5. **Access** the game:
   - **Frontend**: [http://localhost:4173](http://localhost:4173)
   - **Backend**: [http://localhost:8080/swagger](http://localhost:8080/swagger) (for API docs)

---

## Usage

1. **Create** a new FizzBuzz game (e.g., “FooBarBaz” with custom divisors).
2. **Play** the game from the frontend, which calls the backend for random numbers.
3. **Score** is tracked based on correct or incorrect answers.


**Enjoy** the FizzBuzz Game! If you have questions or run into issues, please open an **issue** or **pull request**.