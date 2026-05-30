const tictactoe_panel = document.getElementById('tictactoe');
const tictactoe_modal = document.getElementById('tictactoe_modal');
const close_modal = document.getElementById('close_modal');
tictactoe_panel.addEventListener('click', () => {
    tictactoe_modal.classList.add('active');
    reset_game();
});
close_modal.addEventListener('click', () => {
    tictactoe_modal.classList.remove('active');
});

// this to close the game by clikcing elseewhere
tictactoe_modal.addEventListener('click', (e) => {
    if (e.target === tictactoe_modal) {
        tictactoe_modal.classList.remove('active');
    }
});






const tictactoe_cells = document.querySelectorAll('.tactactoe_cell');
const status_msg = document.getElementById('status_msg');
const playagain_button = document.getElementById('playagain_button');
let board = Array(9).fill(null);
let game_over = false;
const winning_combos = [
    [0,1,2],[3,4,5],[6,7,8], 
    [0,3,6],[1,4,7],[2,5,8], 
    [0,4,8],[2,4,6]          
];

function check_winner(b, mark) {
    return winning_combos.some(combo => combo.every(i => b[i] === mark));
}

function is_draw(b) {
    return b.every(cell => cell !== null);
}

function computer_move() {
    for (let i = 0; i < 9; i++) {
        if (!board[i]) {
            board[i] = 'O';
            if (check_winner(board, 'O')) { render_board(); return; }
            board[i] = null;
        }
    }

    for (let i = 0; i < 9; i++) {
        if (!board[i]) {
            board[i] = 'X';
            if (check_winner(board, 'X')) { board[i] = 'O'; render_board(); return; }
            board[i] = null;
        }
    }

    if (!board[4]) { board[4] = 'O'; render_board(); return; }

    const corners = [0,2,6,8].filter(i => !board[i]);
    if (corners.length) {
        board[corners[Math.floor(Math.random() * corners.length)]] = 'O';
        render_board();
        return;
    }

    const open_spots = board.map((v, i) => v ? null : i).filter(i => i !== null);
    if (open_spots.length) {
        board[open_spots[Math.floor(Math.random() * open_spots.length)]] = 'O';
        render_board();
    }
}



function render_board() {
    tictactoe_cells.forEach((cell, i) => {
        cell.textContent = board[i] || '';
        cell.classList.toggle('taken', board[i] !== null);
    });

    if (check_winner(board, 'X')) {
        status_msg.textContent = 'u win';
        end_game();
    } else if (check_winner(board, 'O')) {
        status_msg.textContent = 'computer win';
        end_game();
    } else if (is_draw(board)) {
        status_msg.textContent = "draw";
        end_game();
    } else {
        status_msg.textContent = 'Ur Turn';
    }
}

function end_game() {
    game_over = true;
    playagain_button.classList.add('visible');
}

function reset_game() {
    board = Array(9).fill(null);
    game_over = false;
    status_msg.textContent = 'Ur Turn';
    playagain_button.classList.remove('visible');
    render_board();
}

tictactoe_cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const i = parseInt(cell.dataset.index);
        if (game_over || board[i]) return;

        board[i] = 'X';
        render_board();

        if (!game_over) {
            status_msg.textContent = 'computer is taking its turn';
            setTimeout(() => { computer_move(); }, 1700);
        }
    });
});



playagain_button.addEventListener('click', reset_game);




