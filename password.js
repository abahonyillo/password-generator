//DOM elements
let resultEl = document.getElementById('result');
let lengthEl = document.getElementById('length');
let uppercaseEl = document.getElementById('uppercase');
let lowercaseEl = document.getElementById('lowercase');
let numbersEl = document.getElementById('numbers');
let symbolsEl = document.getElementById('symbols');
let generateEl = document.getElementById('generate');
let clipboardEl = document.getElementById('clipboard');


let randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbols: getRandomSymbol
};

//generateEl event listener
generateEl.addEventListener('click', () => {
    let length = +lengthEl.value;
    let hasLower = lowercaseEl.checked;
    let hasUpper = uppercaseEl.checked;
    let hasNumber = numbersEl.checked;
    let hasSymbols = symbolsEl.checked;

    resultEl.innerHTML = generatePassword(
    hasLower, 
    hasUpper, 
    hasNumber, 
    hasSymbols, 
    length);
});
//copy password to clipboard
clipboardEl.addEventListener('click', () => {
    let textarea = document.createElement('textarea');
    let password = resultEl.innerText;

    if(!password){
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('password coppied to clipboard!');
})

//generate password function
function generatePassword(lower, upper, number, symbols, length) {
// 1.initialize password variable
// 2.filter out unchecked types
// 3.loop over length call generator function for each type
// 4.add final password to the password variable and return

    let generatedPassword = '';

    const typesCount = lower + upper + number + symbols;

    // console.log('typesCount', typesCount);

    const typesArr = [{lower}, {upper}, {number}, {symbols}].filter(item => Object.values(item)[0]);

    // console.log('typesCount', typesCount);

    if(typesCount === 0){
        return '';
    }
    
    console.log(length + "\n");

    for(let i = 0; i < length; i += typesCount){
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];

            generatedPassword += randomFunc[funcName]();
        });
    }


    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}

//Generate function

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random()* 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random()* 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random()* 10) + 48);
}

function getRandomSymbol() {
    let symbols = '!@#$%^&*()_+?></';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

