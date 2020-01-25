// main.js

const display = document.querySelector('.display');

let num1;
let num2;
let symbol;
let showingResult;


function addListeners() {
    const gridChildren = document.querySelectorAll('.grid-child');
    gridChildren.forEach(child => {
                
        child.addEventListener("mousedown", function(event) {
            event.target.style.opacity = '0.8';
        });
        
        child.addEventListener('mouseup', function(e) {
            event.target.style.opacity = '1';
        });

    });

    document.querySelectorAll('.number').forEach(digit => {
        digit.addEventListener('click', function(event) {
            if (display.innerText === symbol || showingResult) {
                clearDisplay();
            }
            if (display.innerText.length > 15) {
                alert('That number is ridiculous!');
                setTimeout(clearDisplay, 1000);
            }
            display.innerText += event.target.innerText;
        });
    })

    document.querySelectorAll('.operator').forEach(operator => {
        operator.addEventListener('click', function(event) {

            if (num1 && symbol) {
                calculate();
            }

            num1 = Number(display.innerText);
            console.log(event.target.innerText);
            display.innerText = event.target.innerText;
            symbol = event.target.innerText;
            console.log(symbol);
        });
    })

    document.querySelector('.clear').addEventListener('click', function() {
        clearDisplay();
        resetValues();
    });

    document.querySelector('.decimal').addEventListener('click', function() {
        if (/[.]/gi.test(display.innerText)) {
            return;
        } else {
            if (display.innerText === symbol || showingResult) {
                clearDisplay();
            }
            if (display.innerText) {
                display.innerText += '.';
            } else {
                display.innerText = '0.';
            }
        }    
    });

    document.addEventListener('keydown', function(event) {
        console.log('event firing!');

        if(event.keyCode == 49) {
            display.innerText += '1';
        }
        else if(event.keyCode == 50) {
            display.innerText += '2';
        }
        else if(event.keyCode == 51) {
            display.innerText += '3';
        }
        else if(event.keyCode == 52) {
            display.innerText += '4';
        }
        else if(event.keyCode == 53) {
            display.innerText += '5';
        }
        else if(event.keyCode == 54) {
            display.innerText += '6';
        }
        else if(event.keyCode == 55) {
            display.innerText += '7';
        }
        else if(event.keyCode == 56) {
            display.innerText += '8';
        }
        else if(event.keyCode == 57) {
            display.innerText += '9';
        }
        else if(event.keyCode == 48) {
            display.innerText += '0';
        }
        else if(event.keyCode == 190) {
            if (/[.]/gi.test(display.innerText)) {
                return;
            } else {
                if (display.innerText === symbol || showingResult) {
                    clearDisplay();
                }
                if (display.innerText) {
                    display.innerText += '.';
                } else {
                    display.innerText = '0.';
                }
            }
        }
        else if(event.keyCode == 187) {
            calculate();
        }
    });
        

    document.querySelector('.plus-minus').addEventListener('click', plusMinus);
    document.querySelector('.percent').addEventListener('click', percent);
    document.querySelector('.equals').addEventListener('click', calculate);
    
}

function clearDisplay () {
    display.innerText = '';
    showingResult = false;
}

function resetValues () {
    num1 = null;
    num2 = null;
    symbol = null;
}

function plusMinus () {
    const str = display.innerText;
    display.innerText = Number(str * -1);
}

function percent () {
    const str = display.innerText;
    display.innerText = Number(str / 100);
}

function calculate () {
    let result;
    console.log('OPERATOR: ' + symbol);

    if (!symbol) {
        return;
    }
    
    if (isNaN(Number(display.innerText))) {
        num2 = Number(display.innerText.substr(1));
    } else {
        num2 = Number(display.innerText);
    }
    clearDisplay();

    switch (symbol) {
        case '×':
            result = multiply(num1, num2);
            break;
        case '÷':
            result = divide(num1, num2);
            break;
        case '+':
            result = add(num1, num2);
            break;
        case '−':
            result = subtract(num1, num2);
            break;
    }
    console.log('num1:' + num1);
    console.log('num2:' + num2);
    console.log('operator:' + symbol);
    console.log(result);
    display.innerText = result;
    showingResult = true;
    resetValues();
}

function add (num1, num2) {
	return num1 + num2;	
}

function subtract (num1, num2) {
	return num1 - num2;
}

function multiply (num1, num2) {
	return num1 * num2;
}

function divide (num1, num2) {
    if (num2 === 0) {
        alert('Cannot divide by zero!');
        setTimeout(clearDisplay, 100);
        return;
    } else {
        return num1 / num2;
    }
    
}

addListeners();