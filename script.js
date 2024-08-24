const URL = 'https://dummyjson.com/quotes';
const quoteDisplay = document.querySelector(".quoteDisplay");
const textarea = document.getElementById("textarea");


// getting the quotes from API
const getQuotes = async () => {
    const data = await fetch(URL);
    const response = await data.json();
    return response.quotes;  // quotes[]
}

// generate one singel quote to display
const generateQuote = async () => {
    const randomNumber = Math.floor(Math.random() * 30) + 1;
    const quotes = await getQuotes();
    // console.log(quotes);  // quotes[]
    const getQuote = quotes[randomNumber];

    // to spilt each character and penetrate it inside a span to compare and then append to the quoteDisplay
    quoteDisplay.innerHTML = '';
    getQuote.quote.split('').forEach(elm => {
        const charspan = document.createElement("span");
        charspan.innerHTML = elm;
        quoteDisplay.appendChild(charspan);
    });
    textarea.value = null;
}


textarea.addEventListener("input", () => {
    const charValue = textarea.value.split('');
    // console.log(charValue);
    const compareElm = quoteDisplay.querySelectorAll("span");
    // elm==span 
    let correct = true;
    compareElm.forEach((elm, index) => {
        console.log(elm.innerText);
        const char = charValue[index];
        if (char == null) {
            elm.classList.remove("green");
            elm.classList.remove("red");
            correct = false;
        }
        else if (char === elm.innerText) {
            elm.classList.add("green");
            elm.classList.remove("red");
            correct = true;
        }
        else {
            elm.classList.remove("green");
            elm.classList.add("red");
            correct = false;
        }

    })

    if (correct) {
        generateQuote();
    }
    // Array.from(compareElm).forEach((elm, index) => {
    //     console.log(elm.innerText);
    // })
    // textarea.value.split("").forEach((elm) => {
    //     // 
    // })


})

generateQuote();


/* [
    'L', 'o', 'r', 'e',
    'm', ' ', 'I', 'p',
    's', 'u', 'm'
][index]     

[
'L', 'o', 'r', 'e',
    'm', ' ', 'I', 'p',
    's', 'u', 'm'
][0]    // L   

*/