const mainDiv = document.querySelector("#main-div");
const startButton = document.querySelector("#start-button");
const subDiv = document.querySelector("#sub-div");
const retry = document.querySelector("#retry");
const count = document.querySelector("#count");
let clickedNumber = 1;
let firstSelectedCardIndex = 0;
let secontSelectedCardIndex = 0;
let correctCardPairNumber = 0;
const cardCollection = [
    {closedCard: "🃏", openedCard: "🐶", isOpen: false},
    {closedCard: "🃏", openedCard: "🐶", isOpen: false},
    {closedCard: "🃏", openedCard: "🦝", isOpen: false},
    {closedCard: "🃏", openedCard: "🦝", isOpen: false},
    {closedCard: "🃏", openedCard: "🐵", isOpen: false},
    {closedCard: "🃏", openedCard: "🐵", isOpen: false},
    {closedCard: "🃏", openedCard: "🦊", isOpen: false},
    {closedCard: "🃏", openedCard: "🦊", isOpen: false},
    {closedCard: "🃏", openedCard: "🦁", isOpen: false},
    {closedCard: "🃏", openedCard: "🦁", isOpen: false},
    {closedCard: "🃏", openedCard: "🐯", isOpen: false},
    {closedCard: "🃏", openedCard: "🐯", isOpen: false},
    {closedCard: "🃏", openedCard: "🐷", isOpen: false},
    {closedCard: "🃏", openedCard: "🐷", isOpen: false},
    {closedCard: "🃏", openedCard: "🐹", isOpen: false},
    {closedCard: "🃏", openedCard: "🐹", isOpen: false},
    {closedCard: "🃏", openedCard: "🐰", isOpen: false},
    {closedCard: "🃏", openedCard: "🐰", isOpen: false},
];

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function clickStartButton() {
    startButton.classList.add("hidden");
    printClosedCard();
}

function printClosedCard() {
    correctCardPairNumber = 0;
    shuffle(cardCollection);
    for(i = 0; i < 18; i++) {
        const span = document.createElement("span");
        span.innerText = cardCollection[i].openedCard;
        span.id = i;
        subDiv.appendChild(span);
        if(i === 5 || i === 11 || i === 17) {
            const br = document.createElement("br");
            subDiv.appendChild(br);
        }
    }
    subDiv.classList.add("disable-click");
    count.innerText = 3;
    setTimeout(() => {
       count.innerText = 2; 
    }, 1000);
    setTimeout(() => {
        count.innerText = 1;
    }, 2000);
    setTimeout(() => {
        count.innerText = "시작!";
    }, 3000);
    setTimeout(closeAllCard, 3000);
    setTimeout(() => {
        count.innerText = "";
    }, 4000);
}

function closeAllCard() {
    for(i = 0; i < 18; i++) {
        document.getElementById(i).innerText = cardCollection[i].closedCard;
    }
    subDiv.classList.remove("disable-click");
}

function clickClosedCard(event) {
    if(cardCollection[event.target.id].isOpen === false) {
        event.target.innerText = cardCollection[event.target.id].openedCard;
        if(clickedNumber === 1) {
            firstSelectedCardIndex = event.target.id;
            clickedNumber = 2;
        } else if(clickedNumber === 2) {
            secondSelectedCardIndex = event.target.id;
            clickedNumber = 1;
            if(firstSelectedCardIndex === secondSelectedCardIndex) {
                wrongCardPair();
            } else {
                if(event.target.innerText != cardCollection[firstSelectedCardIndex].openedCard) {
                    subDiv.classList.add("disable-click");
                    setTimeout(wrongCardPair, 1000);
                } else {
                    cardCollection[firstSelectedCardIndex].isOpen = true;
                    cardCollection[secondSelectedCardIndex].isOpen = true;
                    correctCardPairNumber += 1;
                    if(correctCardPairNumber === 9) {
                        setTimeout(matchAllCardPair, 100);
                    }
                }
            }
        }
    }
}

function wrongCardPair() {
    const firstSelectedSpan = document.getElementById(firstSelectedCardIndex);
    const secondSelectedSpan = document.getElementById(secondSelectedCardIndex);
    firstSelectedSpan.innerText = cardCollection[firstSelectedCardIndex].closedCard;
    secondSelectedSpan.innerText = cardCollection[secondSelectedCardIndex].closedCard;
    subDiv.classList.remove("disable-click");
}

function matchAllCardPair() {
    count.innerText = "짝을 다 맞추었어요!";
    retry.classList.remove("hidden");
}

function retryButton() {
    subDiv.innerHTML = "";
    for(i = 0; i < 18; i++) {
        cardCollection[i].isOpen = false;
    }
    retry.classList.add("hidden");
    printClosedCard();
}

startButton.addEventListener("click", clickStartButton);
subDiv.addEventListener("click", clickClosedCard);
retry.addEventListener("click", retryButton);