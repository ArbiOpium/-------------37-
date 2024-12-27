const shapes = [
    '⬛', '⬜', '🔵', '🔴', '🔺', '🔻',
    '⬛', '⬜', '🔵', '🔴', '🔺', '🔻'
];
let openCards = [];
let matchedPairs = 0;
let gameStarted = false;
function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}
function createGameBoard() 
{
    const board = document.getElementById('game-board');
    board.innerHTML = '';

    const row1 = document.createElement('div');
    row1.classList.add('row');
    const row2 = document.createElement('div');
    row2.classList.add('row');

    shuffle(shapes).forEach((shape, index) => 
        {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.value = shape;
        cardElement.addEventListener('click', handleCardClick);
        if (index < 6) 
            {
            row1.appendChild(cardElement);
        } else 
        {
            row2.appendChild(cardElement);
        }
    });

    board.appendChild(row1);
    board.appendChild(row2);
}
function handleCardClick(event) 
{
    if (!gameStarted || openCards.length >= 2) return;

    const card = event.target;
    if (card.classList.contains('open') || card.classList.contains('matched')) return;

    card.classList.add('open');
    card.textContent = card.dataset.value;
    openCards.push(card);

    if (openCards.length === 2) 
        {
        checkMatch();
    }
}
function checkMatch() {
    const [card1, card2] = openCards;
    if (card1.dataset.value === card2.dataset.value) 
        {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        openCards = [];
        if (matchedPairs === shapes.length / 2) {
            document.getElementById('message').textContent = 'это победа, да-ну насмерть!';
            gameStarted = false;
            document.getElementById('start-btn').textContent = 'Start';
        }
    } else 
    {
        setTimeout(() => {
            card1.classList.remove('open');
            card2.classList.remove('open');
            card1.textContent = '';
            card2.textContent = '';
            openCards = [];
        }, 500);
    }
}
document.getElementById('start-btn').addEventListener('click', () => 
    {
    if (gameStarted) {
        document.querySelectorAll('.card').forEach(card => 
            {
            card.classList.add('open');
            card.textContent = card.dataset.value;
        });
        document.getElementById('message').textContent = 'игра завершена. нажмите Start для перезапуска';
        document.getElementById('start-btn').textContent = 'Start';
        gameStarted = false;
    } else 
    {
        matchedPairs = 0;
        openCards = [];
        gameStarted = true;
        document.getElementById('message').textContent = '';
        document.getElementById('start-btn').textContent = 'Finish';
        createGameBoard();
    }
});
