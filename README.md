# 🐍 Snake Game

A modern, dark-themed Snake game built with HTML, CSS, and JavaScript. Available as both a desktop app (Electron) and web app.

## 🎮 Features

- Smooth gameplay with progressive difficulty
- Dark theme with beautiful visuals
- Snake head with directional eyes
- Score tracking with high score persistence
- Progressive speed increase as score increases

## 🚀 Play Online

The game is deployed and playable at: [Your Vercel URL]

## 💻 Local Development

### As Desktop App (Electron)

1. Install dependencies:
```bash
npm install
```

2. Run the game:
```bash
npm start
```

### As Web App

Simply open `index.html` in your browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server
```

Then open `http://localhost:8000` in your browser.

## 📦 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Vercel will automatically detect it as a static site
5. Deploy!

The Electron files (`main.js`, `package.json` with Electron) won't affect the web deployment - Vercel will serve the HTML/CSS/JS files.

## 🎯 Controls

- **Arrow Keys** or **WASD** to control the snake
- Game starts automatically when you press a key
- Speed increases every 20 points

## 🛠️ Technologies

- HTML5 Canvas
- Vanilla JavaScript
- CSS3
- Electron (for desktop version)

## 📝 License

MIT

