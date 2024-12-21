const gridSize = 7;  // 7x7 grid
const mineCount = 15;  // Mayın sayısı (dilerseniz bu sayıyı da değiştirebilirsiniz)
const grid = document.getElementById('grid');
const resetButton = document.getElementById('reset');
const scoreDisplay = document.getElementById('score');
const elimDisplay = document.getElementById('elim'); // Elenme oranı göstergesi

let board = [];
let revealedCells = 0;
let score = 0; // Puanı tutacak değişken
let totalCells = gridSize * gridSize; // Yeni grid boyutuna göre toplam hücre sayısı
let correctRevealedCells = 0; // Doğru açılan hücrelerin sayısı

function createBoard() {
    board = [];
    revealedCells = 0;
    score = 0; // Puanı sıfırla
    correctRevealedCells = 0; // Doğru hücre sayısını sıfırla
    scoreDisplay.textContent = score; // Puanı ekranda güncelle
    elimDisplay.textContent = "0"; // Elenme oranını sıfırla

    // Create empty board
    for (let i = 0; i < gridSize; i++) {
        let row = [];
        for (let j = 0; j < gridSize; j++) {
            row.push({
                isMine: false,
                revealed: false,
            });
        }
        board.push(row);
    }

    // Place mines randomly
    let minesPlaced = 0;
    while (minesPlaced < mineCount) {
        const row = Math.floor(Math.random() * gridSize);
        const col = Math.floor(Math.random() * gridSize);
        if (!board[row][col].isMine) {
            board[row][col].isMine = true;
            minesPlaced++;
        }
    }

    // Render grid
    grid.innerHTML = '';
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', handleClick);
            grid.appendChild(cell);
        }
    }
}

function handleClick(event) {
    const cell = event.target;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    const cellData = board[row][col];

    if (cellData.revealed) return;

    if (cellData.isMine) {
        revealMines();
        return;
    }

    revealCell(row, col);
    score++; // Doğru bir kutuya tıklandığında 1 puan ekle
    scoreDisplay.textContent = score; // Skoru güncelle

    // Eğer doğru bir hücre açılmışsa, doğru hücre sayısını artır
    correctRevealedCells++;

    // Yüzdelik hesaplama
    const percentEliminated = ((correctRevealedCells / (totalCells - mineCount)) * 100).toFixed(2);
    elimDisplay.textContent = percentEliminated; // Elenme oranını güncelle

    // Check if the game is won
    if (revealedCells === gridSize * gridSize - mineCount) {
        // Oyun bitti mesajını kaldırdık
    }
}

function revealCell(row, col) {
    const cellData = board[row][col];
    if (cellData.revealed) return;

    cellData.revealed = true;
    revealedCells++;
    const cell = grid.children[row * gridSize + col];
    cell.classList.add('revealed');
}

function revealMines() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = grid.children[i * gridSize + j];
            if (board[i][j].isMine) {
                cell.textContent = '💣'; // Mayın simgesi
                cell.classList.add('mined');
            }
            cell.classList.add('revealed');
        }
    }
}

resetButton.addEventListener('click', createBoard);

// Initialize the game
createBoard();

document.getElementById('home-btn').addEventListener('click', function() {
    window.location.href = 'https://ufak1.github.io/home/'; // Ana sayfaya yönlendirecek URL'yi buraya yazın
});
