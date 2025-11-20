// Game settings
const GRID_SIZE = 20;
const CANVAS_SIZE = 400;
const CELLS = CANVAS_SIZE / GRID_SIZE;
const BASE_SPEED = 120; // milliseconds (starting speed)
const MIN_SPEED = 60; // minimum speed (fastest)
const SPEED_INCREASE_INTERVAL = 20; // increase speed every N points
const SPEED_DECREASE_AMOUNT = 5; // decrease delay by N ms each interval

// Game state
let snake = [{x: 10, y: 10}];
let direction = {x: 1, y: 0};
let food = {x: 15, y: 15};
let score = 0;
let gameRunning = false;
let lastUpdateTime = 0;
let animationFrame = null;
let highScore = 0;

// Canvas setup
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Load high score
highScore = parseInt(localStorage.getItem('snakeHighScore')) || 0;
document.getElementById('highScore').textContent = highScore;

// Make canvas focusable
canvas.tabIndex = 0;
canvas.focus();

// Initialize game
function initGame() {
    snake = [{x: 10, y: 10}];
    direction = {x: 1, y: 0};
    score = 0;
    gameRunning = false;
    food = {x: 15, y: 15};
    lastUpdateTime = performance.now();
    
    if (animationFrame) cancelAnimationFrame(animationFrame);
    
    document.getElementById('score').textContent = score;
    document.getElementById('gameOver').classList.add('hidden');
    
    // Start game loop
    gameLoop();
    draw();
}

// Generate food
function generateFood() {
    food = {
        x: Math.floor(Math.random() * CELLS),
        y: Math.floor(Math.random() * CELLS)
    };
    
    // Make sure food doesn't spawn on snake
    for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            generateFood();
            return;
        }
    }
}

// Calculate current game speed based on score
function getCurrentSpeed() {
    // Calculate how many speed increases have happened
    const speedLevel = Math.floor(score / SPEED_INCREASE_INTERVAL);
    // Decrease delay (increase speed) based on level
    const currentSpeed = BASE_SPEED - (speedLevel * SPEED_DECREASE_AMOUNT);
    // Don't go below minimum speed
    return Math.max(currentSpeed, MIN_SPEED);
}

// Smooth game loop
function gameLoop() {
    const currentTime = performance.now();
    const currentSpeed = getCurrentSpeed();
    
    // Update game logic at fixed intervals (speed increases with score)
    if (gameRunning && currentTime - lastUpdateTime >= currentSpeed) {
        update();
        lastUpdateTime = currentTime;
    }
    
    // Always draw for smooth visuals
    draw();
    
    // Continue loop
    animationFrame = requestAnimationFrame(gameLoop);
}

// Update game
function update() {
    if (!gameRunning) return;
    
    // Move snake
    const head = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
    };
    
    // Check wall collision
    if (head.x < 0 || head.x >= CELLS || head.y < 0 || head.y >= CELLS) {
        gameOver();
        return;
    }
    
    // Check self collision (skip head itself)
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
            return;
        }
    }
    
    snake.unshift(head);
    
    // Check food collision
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById('score').textContent = score;
        if (score > highScore) {
            highScore = score;
            document.getElementById('highScore').textContent = highScore;
            localStorage.setItem('snakeHighScore', highScore);
        }
        generateFood();
    } else {
        snake.pop();
    }
}

// Draw game
function draw() {
    // Clear canvas
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    
    // Draw grid
    ctx.strokeStyle = '#16213e';
    ctx.lineWidth = 1;
    for (let i = 0; i <= CELLS; i++) {
        ctx.beginPath();
        ctx.moveTo(i * GRID_SIZE, 0);
        ctx.lineTo(i * GRID_SIZE, CANVAS_SIZE);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * GRID_SIZE);
        ctx.lineTo(CANVAS_SIZE, i * GRID_SIZE);
        ctx.stroke();
    }
    
    // Draw snake body
    ctx.fillStyle = '#4ade80';
    for (let i = 1; i < snake.length; i++) {
        const segment = snake[i];
        ctx.fillRect(
            segment.x * GRID_SIZE + 1,
            segment.y * GRID_SIZE + 1,
            GRID_SIZE - 2,
            GRID_SIZE - 2
        );
    }
    
    // Draw snake head with eyes
    if (snake.length > 0) {
        const head = snake[0];
        const headX = head.x * GRID_SIZE + GRID_SIZE / 2;
        const headY = head.y * GRID_SIZE + GRID_SIZE / 2;
        const headSize = GRID_SIZE - 2;
        
        // Head body (rounded)
        ctx.fillStyle = '#86efac';
        ctx.beginPath();
        ctx.arc(headX, headY, headSize / 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Head border
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Eyes based on direction
        ctx.fillStyle = '#000';
        const eyeSize = 3;
        const eyeOffset = 4;
        
        if (direction.x === 1) { // Right
            ctx.beginPath();
            ctx.arc(headX + eyeOffset, headY - eyeOffset, eyeSize, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(headX + eyeOffset, headY + eyeOffset, eyeSize, 0, Math.PI * 2);
            ctx.fill();
        } else if (direction.x === -1) { // Left
            ctx.beginPath();
            ctx.arc(headX - eyeOffset, headY - eyeOffset, eyeSize, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(headX - eyeOffset, headY + eyeOffset, eyeSize, 0, Math.PI * 2);
            ctx.fill();
        } else if (direction.y === -1) { // Up
            ctx.beginPath();
            ctx.arc(headX - eyeOffset, headY - eyeOffset, eyeSize, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(headX + eyeOffset, headY - eyeOffset, eyeSize, 0, Math.PI * 2);
            ctx.fill();
        } else if (direction.y === 1) { // Down
            ctx.beginPath();
            ctx.arc(headX - eyeOffset, headY + eyeOffset, eyeSize, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(headX + eyeOffset, headY + eyeOffset, eyeSize, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Draw food (circle)
    const foodX = food.x * GRID_SIZE + GRID_SIZE / 2;
    const foodY = food.y * GRID_SIZE + GRID_SIZE / 2;
    const foodRadius = GRID_SIZE / 2 - 3;
    
    // Food glow
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#ef4444';
    
    // Food circle
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(foodX, foodY, foodRadius, 0, Math.PI * 2);
    ctx.fill();
    
    // Food highlight
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#ff6b6b';
    ctx.beginPath();
    ctx.arc(foodX - 2, foodY - 2, foodRadius * 0.4, 0, Math.PI * 2);
    ctx.fill();
    
    // Food border
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(foodX, foodY, foodRadius, 0, Math.PI * 2);
    ctx.stroke();
}

// Game over
function gameOver() {
    gameRunning = false;
    document.getElementById('finalScore').textContent = score;
    document.getElementById('gameOver').classList.remove('hidden');
}

// Keyboard input
function handleKey(e) {
    const key = e.key.toLowerCase();
    
    // Start game on first key press
    if (!gameRunning && (key === 'arrowup' || key === 'arrowdown' || key === 'arrowleft' || key === 'arrowright' || key === 'w' || key === 's' || key === 'a' || key === 'd')) {
        gameRunning = true;
        lastUpdateTime = performance.now();
    }
    
    // Change direction
    if (key === 'arrowup' || key === 'w') {
        if (direction.y === 0) {
            direction = {x: 0, y: -1};
            e.preventDefault();
        }
    } else if (key === 'arrowdown' || key === 's') {
        if (direction.y === 0) {
            direction = {x: 0, y: 1};
            e.preventDefault();
        }
    } else if (key === 'arrowleft' || key === 'a') {
        if (direction.x === 0) {
            direction = {x: -1, y: 0};
            e.preventDefault();
        }
    } else if (key === 'arrowright' || key === 'd') {
        if (direction.x === 0) {
            direction = {x: 1, y: 0};
            e.preventDefault();
        }
    }
}

// Event listeners
document.addEventListener('keydown', handleKey);
canvas.addEventListener('click', () => canvas.focus());
document.getElementById('restart').addEventListener('click', initGame);

// Initial draw
initGame();

