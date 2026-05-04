export default function buildSnake() {
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <title>لعبة الثعبان</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: sans-serif;
      background: #0f0f1a;
      color: #eee;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      gap: 16px;
    }
    h1 { font-size: 2rem; color: #34d399; }
    #score { font-size: 1.2rem; color: #60a5fa; }
    canvas {
      border: 2px solid #2d2d4e;
      border-radius: 8px;
      background: #1a1a2e;
    }
    button {
      padding: 10px 28px;
      border: none;
      border-radius: 8px;
      background: #059669;
      color: #fff;
      font-size: 1rem;
      cursor: pointer;
    }
    button:hover { background: #047857; }
    p { color: #9ca3af; font-size: 0.9rem; }
  </style>
</head>
<body>
  <h1>🐍 لعبة الثعبان</h1>
  <div id="score">النقاط: 0</div>
  <canvas id="c" width="400" height="400"></canvas>
  <button onclick="startGame()">▶ ابدأ / إعادة</button>
  <p>استخدم أسهم لوحة المفاتيح للتحكم</p>

  <script>
    const c = document.getElementById('c');
    const ctx = c.getContext('2d');
    const S = 20, W = 20, H = 20;
    let snake, dir, food, score, loop;

    function startGame() {
      clearInterval(loop);
      snake = [{ x: 10, y: 10 }];
      dir = { x: 1, y: 0 };
      score = 0;
      document.getElementById('score').textContent = 'النقاط: 0';
      placeFood();
      draw();
      loop = setInterval(tick, 120);
    }

    function placeFood() {
      food = {
        x: Math.floor(Math.random() * W),
        y: Math.floor(Math.random() * H),
      };
    }

    function tick() {
      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
      if (
        head.x < 0 || head.x >= W || head.y < 0 || head.y >= H ||
        snake.some(s => s.x === head.x && s.y === head.y)
      ) {
        clearInterval(loop);
        alert('💀 انتهت اللعبة! نقاطك: ' + score);
        return;
      }
      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById('score').textContent = 'النقاط: ' + score;
        placeFood();
      } else {
        snake.pop();
      }
      draw();
    }

    function draw() {
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, 400, 400);
      snake.forEach((s, i) => {
        ctx.fillStyle = i === 0 ? '#34d399' : '#059669';
        ctx.beginPath();
        ctx.roundRect(s.x * S, s.y * S, S - 2, S - 2, 4);
        ctx.fill();
      });
      ctx.fillStyle = '#f87171';
      ctx.beginPath();
      ctx.arc(food.x * S + S / 2, food.y * S + S / 2, S / 2 - 1, 0, Math.PI * 2);
      ctx.fill();
    }

    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowUp'    && dir.y === 0) dir = { x: 0, y: -1 };
      else if (e.key === 'ArrowDown'  && dir.y === 0) dir = { x: 0, y:  1 };
      else if (e.key === 'ArrowLeft'  && dir.x === 0) dir = { x: -1, y: 0 };
      else if (e.key === 'ArrowRight' && dir.x === 0) dir = { x:  1, y: 0 };
      e.preventDefault();
    });

    draw();
  </script>
</body>
</html>`;
}
