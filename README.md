# MealMind - Word Guessing Game

A real-time word guessing game built with React, Node.js, Express, and Socket.io. Players take turns asking yes/no questions to guess a secret word.

## 🚀 Features

* **Real-time multiplayer gameplay** using WebSocket connections
* **Interactive UI** built with React and Tailwind CSS
* **RESTful API** for game management
* **MySQL database support** (optional - falls back to in-memory storage)
* **Automated testing** for API and WebSocket functionality
* **Responsive design** for desktop and mobile

## 🛠️ Tech Stack

### Backend

* **Node.js**
* **Express.js**
* **Socket.io**
* **MySQL2**
* **JWT** (future use)
* **bcryptjs** (future use)

### Frontend

* **React 19**
* **Vite**
* **Tailwind CSS**
* **React Router**
* **Axios**
* **Socket.io-client**

## 📋 Prerequisites

* **Node.js** (v16 or higher)
* **npm** or **yarn**
* **MySQL** (optional)

## 🗄️ Database Setup (Optional)

If you want persistent storage, use MySQL.

### 1. Create Database

```sql
CREATE DATABASE guess_db;
USE guess_db;
```

### 2. Create Tables

```sql
CREATE TABLE games (
    game_id VARCHAR(50) PRIMARY KEY,
    player1_id VARCHAR(50),
    player2_id VARCHAR(50),
    secret_word VARCHAR(255),
    status ENUM('ongoing','won') DEFAULT 'ongoing',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE questions (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    game_id VARCHAR(50),
    question_text VARCHAR(255),
    answer ENUM('Yes','No') DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE
);
```

### 3. Environment Variables

Create a `.env` file inside the `server` directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=guess_db
PORT=5000
```

> If MySQL is not configured, the app automatically falls back to in-memory storage. No crashes, no drama.

## 🚀 Installation & Setup

### Clone the Repository

```bash
git clone <repository-url>
cd MealMind
```

### Backend Setup

```bash
cd server
npm install
npm run dev
```

### Frontend Setup

```bash
cd word-guesser-frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`
Backend runs at `http://localhost:5000`

## 📁 Project Structure

```
MealMind/
├── server/
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── socket.js
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   └── dotenv.config.js
│   │   ├── controller/
│   │   │   └── gameController.js
│   │   └── route/
│   │       └── gameRoutes.js
│   └── test/
├── word-guesser-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   └── services/
└── README.md
```

## 🔌 API Endpoints

* `POST /api/game/start`
* `POST /api/game/join`
* `GET /api/game/status/:gameId`
* `POST /api/game/guess`
* `POST /api/game/reply`

## 🎮 How to Play

1. Player 1 starts a game and sets a secret word
2. Share the Game ID
3. Player 2 joins
4. Ask yes/no questions
5. Guess the word
6. Win. Brag. Repeat.

## 📝 License

ISC License
