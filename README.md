# 🐍 Snake Game

A modern, dark-themed Snake game built with HTML5 Canvas, CSS3, and vanilla JavaScript. Available as both a desktop application (Electron) and web application.

![Snake Game](https://img.shields.io/badge/Game-Snake-green)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

- 🎮 **Smooth Gameplay** - 60 FPS rendering with requestAnimationFrame
- 🌙 **Dark Theme** - Beautiful dark UI with neon accents
- 🐍 **Animated Snake Head** - Directional eyes that follow movement
- 📈 **Progressive Difficulty** - Speed increases as your score grows
- 💾 **High Score Tracking** - Persistent high scores saved in browser
- 🎯 **Responsive Controls** - Arrow keys or WASD support

## 🎮 How to Play

1. **Start the Game** - Press any arrow key or WASD to begin
2. **Control the Snake** - Use arrow keys or WASD to change direction
3. **Eat the Food** - Collect the red circles to grow and score points
4. **Avoid Collisions** - Don't hit the walls or yourself!
5. **Get Faster** - Game speed increases every 20 points

## 🚀 Quick Start

### Desktop Application (Electron)

```bash
# Install dependencies
npm install

# Run the game
npm start
```

### Web Application

Simply open `index.html` in your browser, or use a local server:

```bash
# Python
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher) - for Electron version
- Modern web browser - for web version

### Clone the Repository

```bash
git clone https://github.com/Dizay1957/Snake-game.git
cd Snake-game
npm install
```

## 🌐 Live Demo

🎮 **Play the game online**: [https://snake-game-umber-pi.vercel.app/](https://snake-game-umber-pi.vercel.app/)

## 🛠️ Technologies Used

- **HTML5** - Structure and Canvas API
- **CSS3** - Styling and animations
- **JavaScript (ES6+)** - Game logic and mechanics
- **Electron** - Desktop application framework

## 📁 Project Structure

```
snake-game/
├── index.html      # Main HTML file
├── style.css       # Styling
├── game.js         # Game logic
├── main.js         # Electron main process
├── package.json    # Dependencies
└── README.md       # This file
```

## 🎯 Game Mechanics

- **Starting Speed**: 120ms per move
- **Speed Increase**: Every 20 points, speed increases by 5ms
- **Maximum Speed**: 60ms per move (fastest)
- **Score**: +10 points per food eaten

## 📝 Development

### Building for Production

The web version requires no build step - just deploy the files as-is.

For Electron desktop app:
```bash
npm install electron-builder --save-dev
npm run build
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Dizay1957/Snake-game/issues).

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**El Yazid**

- GitHub: [@Dizay1957](https://github.com/Dizay1957)
- Project Link: [https://github.com/Dizay1957/Snake-game](https://github.com/Dizay1957/Snake-game)
- Live Demo: [https://snake-game-umber-pi.vercel.app/](https://snake-game-umber-pi.vercel.app/)

## 🙏 Acknowledgments

- Inspired by the classic Snake game
- Built with modern web technologies

---

⭐ If you like this project, give it a star on GitHub!
