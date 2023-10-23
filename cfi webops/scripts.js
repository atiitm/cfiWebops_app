const jokeApiUrl = "https://official-joke-api.appspot.com/random_joke";
const quoteApiUrl = "https://api.quotable.io/random";
const container = document.querySelector(".container");
const alertSound = document.getElementById("alertSound");

let isFlipped = false;
let likedItems = [];


async function fetchRandomJoke() {
    try {
        const response = await fetch(jokeApiUrl);
        const data = await response.json();
        return data.setup + " " + data.punchline;
    } catch (error) {
        console.error("Error fetching joke:", error);
        return "Could not fetch a joke.";
    }
}

async function fetchRandomQuote() {
    try {
        const response = await fetch(quoteApiUrl);
        const data = await response.json();
        return data.content;
    } catch (error) {
        console.error("Error fetching quote:", error);
        return "Could not fetch a quote.";
    }
}

function createCard() {
    const card = document.createElement("div");
    card.classList.add("card");

    card.addEventListener("click", async () => {
        if (isFlipped) {
            const index = Array.from(container.children).indexOf(card);
            card.textContent = likedItems[index];
            isFlipped = false;
        } else {
            alertSound.play();
            card.textContent = await fetchRandomQuote();
            isFlipped = true;
        }
    });

    container.appendChild(card);
}


for (let i = 0; i < 8; i++) {
    createCard();
    fetchRandomJoke().then((joke) => {
        container.children[i].textContent = joke;
    });
}
