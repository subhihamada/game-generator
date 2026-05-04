export default function buildChess() {
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <title>الشطرنج</title>
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
    h1 { font-size: 1.8rem; color: #fbbf24; }
    #info { font-size: 1rem; color: #60a5fa; height: 1.5rem; }
    table { border-collapse: collapse; border: 3px solid #fbbf24; border-radius: 4px; }
    td {
      width: 60px; height: 60px;
      text-align: center; vertical-align: middle;
      font-size: 2.2rem; cursor: pointer;
      user-select: none; transition: opacity 0.15s;
    }
    td:hover { opacity: 0.85; }
    .light { background: #f0d9b5; }
    .dark  { background: #b58863; }
    .selected { background: #f6f669 !important; }
    .possible { background: #cdd26a !important; }
    .possible::after { content: '●'; font-size: 1rem; color: rgba(0,0,0,0.25); }
    button {
      padding: 10px 28px; border: none; border-radius: 8px;
      background: #b45309; color: #fff; font-size: 1rem; cursor: pointer;
    }
    button:hover { background: #92400e; }
  </style>
</head>
<body>
  <h1>♟ الشطرنج</h1>
  <div id="info">دور الأبيض ⬜</div>
  <table id="board"></table>
  <button onclick="init()">🔄 لعبة جديدة</button>

  <script>
    const P = {
      wK:'♔', wQ:'♕', wR:'♖', wB:'♗', wN:'♘', wP:'♙',
      bK:'♚', bQ:'♛', bR:'♜', bB:'♝', bN:'♞', bP:'♟',
    };
    let board, selected, turn;

    function init() {
      turn = 'w'; selected = null;
      board = [
        ['bR','bN','bB','bQ','bK','bB','bN','bR'],
        ['bP','bP','bP','bP','bP','bP','bP','bP'],
        Array(8).fill(null), Array(8).fill(null),
        Array(8).fill(null), Array(8).fill(null),
        ['wP','wP','wP','wP','wP','wP','wP','wP'],
        ['wR','wN','wB','wQ','wK','wB','wN','wR'],
      ];
      render();
    }

    function render(sel = null, moves = []) {
      const t = document.getElementById('board');
      t.innerHTML = '';
      for (let r = 0; r < 8; r++) {
        const tr = document.createElement('tr');
        for (let c = 0; c < 8; c++) {
          const td = document.createElement('td');
          td.className = (r + c) % 2 === 0 ? 'light' : 'dark';
          if (sel && sel[0] === r && sel[1] === c) td.classList.add('selected');
          if (moves.some(m => m[0] === r && m[1] === c)) td.classList.add('possible');
          if (board[r][c]) td.textContent = P[board[r][c]] || '';
          td.onclick = () => click(r, c);
          tr.appendChild(td);
        }
        t.appendChild(tr);
      }
    }

    function click(r, c) {
      const p = board[r][c];
      if (selected) {
        const [sr, sc] = selected;
        const ms = getMoves(sr, sc);
        if (ms.some(m => m[0] === r && m[1] === c)) {
          // Pawn promotion
          if (board[sr][sc] === 'wP' && r === 0) board[r][c] = 'wQ';
          else if (board[sr][sc] === 'bP' && r === 7) board[r][c] = 'bQ';
          else board[r][c] = board[sr][sc];
          board[sr][sc] = null;
          // Check if king captured
          const allPieces = board.flat().filter(Boolean);
          if (!allPieces.includes('wK')) { document.getElementById('info').textContent = '⬛ الأسود فاز! 🏆'; selected = null; render(); return; }
          if (!allPieces.includes('bK')) { document.getElementById('info').textContent = '⬜ الأبيض فاز! 🏆'; selected = null; render(); return; }
          turn = turn === 'w' ? 'b' : 'w';
          document.getElementById('info').textContent = 'دور ' + (turn === 'w' ? 'الأبيض ⬜' : 'الأسود ⬛');
          selected = null;
          render();
        } else if (p && p[0] === turn) {
          selected = [r, c]; render([r, c], getMoves(r, c));
        } else {
          selected = null; render();
        }
      } else if (p && p[0] === turn) {
        selected = [r, c]; render([r, c], getMoves(r, c));
      }
    }

    function getMoves(r, c) {
      const p = board[r][c];
      if (!p) return [];
      const color = p[0], type = p[1], moves = [];

      const add = (nr, nc) => {
        if (nr < 0 || nr > 7 || nc < 0 || nc > 7) return false;
        if (board[nr][nc] && board[nr][nc][0] === color) return false;
        moves.push([nr, nc]);
        return !board[nr][nc];
      };

      const slide = (dr, dc) => {
        let nr = r + dr, nc = c + dc;
        while (add(nr, nc) && !board[nr][nc]) { nr += dr; nc += dc; }
        if (nr >= 0 && nr <= 7 && nc >= 0 && nc <= 7 && board[nr][nc] && board[nr][nc][0] !== color) add(nr, nc);
      };

      if (type === 'P') {
        const d = color === 'w' ? -1 : 1;
        const start = color === 'w' ? 6 : 1;
        if (!board[r + d]?.[c]) { add(r + d, c); if (r === start && !board[r + 2*d]?.[c]) add(r + 2*d, c); }
        [[r+d,c-1],[r+d,c+1]].forEach(([nr,nc]) => { if (board[nr]?.[nc] && board[nr][nc][0] !== color) moves.push([nr,nc]); });
      }
      if (type === 'R' || type === 'Q') [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dr,dc]) => slide(dr,dc));
      if (type === 'B' || type === 'Q') [[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([dr,dc]) => slide(dr,dc));
      if (type === 'N') [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]].forEach(([dr,dc]) => add(r+dr,c+dc));
      if (type === 'K') [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]].forEach(([dr,dc]) => add(r+dr,c+dc));

      return moves;
    }

    init();
  </script>
</body>
</html>`;
}
