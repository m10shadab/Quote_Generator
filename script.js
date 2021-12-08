const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}


//loading complete
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}


// Show new Quote
function newQuote() {
    loading();
    // to pick a random quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check if Author field is blank
    if(!quote.author) {
        authorText.textContent = 'Unknown'
    }else {
        authorText.textContent = quote.author;
    }
   
    if(quote.text.length > 50){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    complete();
    quoteText.textContent = quote.text;
}

// Get Quotes from API

async function getQuotes() {
    const apiURL = 'https://type.fit/api/quotes';
try {
     const response = await fetch(apiURL);
     apiQuotes = await response.json();
     newQuote();
} catch (error) {
    
}
} 

// tweet quote
function tweetQuote() {
    const tweetURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(tweetURL, '_blank')
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();
