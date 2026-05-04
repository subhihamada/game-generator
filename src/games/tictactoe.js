export default function buildTicTacToe() {
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <title>تيك تاك تو</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: sans-serif;
      background: #1a1a2e;
      color: #eee;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      gap: 20px;
    }
    h1 { font-size: 2rem; color: #a78bfa; }
    #status { font-size: 1.2rem; color: #60a5fa; height: 2rem; }
    #board {
      display: grid;
      grid-template-columns: repeat(3, 110px);
      grid-template-rows: repeat(3, 110px);
      gap: 8px;
    }
    .cell {
      background: #2d2d4e;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      cursor: pointer;
      transition: background 0.2s;
    }
    .cell:hover { background: #3d3d6e; }
    .cell.x { color: #f87171; }
    .cell.o { color: #60a5fa; }
    .win { background: #4c1d95 !important; }
    button {
      padding: 10px 28px;
      border: none;
      border-radius: 8px;
      background: #7c3aed;
      color: #fff;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.2s;
    }
    button:hover { background: #6d28d9; }
  </style>
</head>
<body>
  <h1>✕○ تيك تاك تو</h1>
  <div id="status">دور اللاعب ✕</div>
  <div id="board"></div>
  <button onclick="reset()">🔄 إعادة اللعب</button>

  <script>
    let board = Array(9).fill('');
    let turn = 'X';
    let over = false;
    const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

    function render() {
      const b = document.getElementById('board');
      b.innerHTML = '';
      board.forEach((v, i) => {
        const c = document.createElement('div');
        c.className = 'cell' + (v ? ' ' + v.toLowerCase() : '');
        c.textContent = v;
        c.onclick = () => play(i);
        b.appendChild(c);
      });
    }

    function checkWin(p) {
      return wins.find(w => w.every(i => board[i] === p));
    }

    function play(i) {
      if (over || board[i]) return;
      board[i] = turn;
      const w = checkWin(turn);
      if (w) {
        over = true;
        document.querySelectorAll('.cell').forEach((c, i) => {
          if (w.includes(i)) c.classList.add('win');
        });
        document.getElementById('status').textContent = (turn === 'X' ? '✕' : '○') + ' فاز! 🎉';
      } else if (board.every(v => v)) {
        over = true;
        document.getElementById('status').textContent = 'تعادل! 🤝';
      } else {
        turn = turn === 'X' ? 'O' : 'X';
        document.getElementById('status').textContent = 'دور اللاعب ' + (turn === 'X' ? '✕' : '○');
      }
      render();
    }

    function reset() {
      board = Array(9).fill('');
      turn = 'X';
      over = false;
      document.getElementById('status').textContent = 'دور اللاعب ✕';
      render();
    }

    render();
  </script>
</body>
</html>`;
}
