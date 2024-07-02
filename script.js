const QUOTES = [
    "The quick brown fox jumps over the lazy dog.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "A journey of a thousand miles begins with a single step.",
    "To be or not to be, that is the question.",
    "All that glitters is not gold."
];

const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const startButton = document.getElementById('startButton');
const timerElement = document.getElementById('timer');
const accuracyElement = document.getElementById('accuracy');

let currentQuote = '';
let startTime;
let interval;

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * QUOTES.length);
    return QUOTES[randomIndex];
}

function displayNewQuote() {
    currentQuote = getRandomQuote();
    quoteDisplayElement.innerHTML = '';
    currentQuote.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        quoteDisplayElement.appendChild(characterSpan);
    });
    quoteInputElement.value = null;
}

function startTimer() {
    timerElement.innerText = 'Time: 0s';
    startTime = new Date();
    interval = setInterval(() => {
        timerElement.innerText = 'Time: ' + getTimerTime() + 's';
    }, 1000);
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000);
}

function calculateAccuracy() {
    const input = quoteInputElement.value.split('');
    const quoteArray = currentQuote.split('');
    let correct = 0;

    quoteArray.forEach((char, index) => {
        if (char === input[index]) {
            correct++;
            quoteDisplayElement.children[index].classList.add('correct');
            quoteDisplayElement.children[index].classList.remove('incorrect');
        } else {
            quoteDisplayElement.children[index].classList.add('incorrect');
            quoteDisplayElement.children[index].classList.remove('correct');
        }
    });

    const accuracy = (correct / quoteArray.length) * 100;
    accuracyElement.innerText = 'Accuracy: ' + accuracy.toFixed(2) + '%';
}

quoteInputElement.addEventListener('input', () => {
    calculateAccuracy();
});

startButton.addEventListener('click', () => {
    displayNewQuote();
    quoteInputElement.disabled = false;
    quoteInputElement.focus();
    startTimer();
});
