const URL = 'https://dummyjson.com/quotes';
const quoteDisplay = document.querySelector(".quoteDisplay");
const textarea = document.getElementById("textarea");
const btn = document.getElementById("btn");
const msg = document.getElementById("msg");
const container = document.querySelector("container");
const para = document.getElementById("para");

let startTime, endTime;

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

// text ground by user
textarea.addEventListener("input", () => {
    const charValue = textarea.value.split('');
    // console.log(charValue);
    const compareElm = quoteDisplay.querySelectorAll("span");
    // elm==span 
    let correct = true;
    compareElm.forEach((elm, index) => {
        // console.log(elm.innerText);
        const char = charValue[index];
        if (char == undefined) {
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

    // getting the next quote if all right
    // if (correct) {
    //     generateQuote();
    // }
})

const endTyping = () => {
    const date = new Date();
    endTime = date.getTime();
}

const startTyping = () => {
    const date = new Date();


    if (btn.innerText === "Start") {
        btn.innerText = "Done";
        textarea.removeAttribute("disabled");
        startTime = date.getTime();
        return;
    }

    if (btn.innerText === "Done") {
        btn.innerText = "Start";
        textarea.setAttribute("disabled", "true");
        endTyping();

        // const p = document.createElement("p");
        // p.classList.add("para");
        // container.appendChild(p);

        let countDown = 5;
        const interval = setInterval(() => {
            countDown--;

            para.innerText = `Next quote will be generated within ${countDown} seconds`;

            if (countDown < 1) {
                para.innerText = "";
                clearInterval(interval);
            }

        }, 1000);

        setTimeout(() => {
            generateQuote();
            msg.innerText = '';
        }, 5000);

    }

    totalTimeTaken();
}

const totalTimeTaken = () => {
    const time_taken = (endTime - startTime) / 1000;
    const typedWords = textarea.value.trim();
    const actual_words = typedWords.split(" ");
    const WPM = (actual_words.length / time_taken) * 60;
    msg.innerText = `Total word written ${actual_words.length} and WPM ${Math.round(WPM)}`;
}


btn.addEventListener("click", () => {
    startTyping();
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