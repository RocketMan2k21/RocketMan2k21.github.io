//Поміняйте місцями тексти, позначені «x» та «y».


function swapText() {
    const headerText = document.getElementsByTagName('header')[0].querySelector('h1').innerText;
    const footerText = document.getElementsByTagName('footer')[0].querySelector('h1').innerText;
    
    document.getElementsByTagName('header')[0].querySelector('h1').innerText = footerText;
    document.getElementsByTagName('footer')[0].querySelector('h1').innerText = headerText;
}

swapText(); 

//Обчислення площі прямокутника
function calculateRectangleArea(d1, d2) {
    return d1 * d2;
}

function handleRecForm(event) {
    event.preventDefault();

    const d1Input = document.getElementById('d1');
    const d2Input = document.getElementById('d2');
    const areaOutput = document.getElementById('recArea');

    const d1 = d1Input.value;
    const d2 = d2Input.value;

    const recArea = calculateRectangleArea(d1, d2);

    areaOutput.innerText = 'Площа: ' + recArea;
}

(() => {
    const form = document.getElementById('recForm');
    form.addEventListener('submit', handleRecForm);
})();

// 3. Напишіть скрипт, який визначає кількість
// мінімальних чисел із 10 значень, беручи необхідні
// значення із відповідної форми в блоці «5», а
// отриманий результат виводить за допомогою
// діалогового вікна і зберігає в cookies, причому:
// а) при оновленні веб-сторінки в броузері
// користувачу за допомогою діалогового вікна виводиться інформація,
// збережена в cookies, із питанням про необхідність зберегти дані із cookies, і не
// виводиться згадана вище форма;
// б) при підтвердженні питання виводиться наступне діалогове вікно із
// інформуванням користувача про наявність cookies і необхідність
// перезавантаження веб-сторінки;
// в) при відмові відповідні cookies видаляються, і веб-сторінка оновлюється з
// початковим станом із наявною формою для введення даних.

function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + value + ';expires=' + expires.toUTCString();
}

function getCookie(name) {
    const keyValue = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

function showResultDialog(result) {
    alert('Number of minimum values: ' + result);
}

function calculateMinValues() {
    let numbers = [];
    let minAmount = 0;

    for (let i = 1; i <= 10; i++) {
        numbers.push(+document.getElementById('num' + i).value);
    }

    const min = Math.min(...numbers);
    for(i = 0; i < numbers.length; i++){
        if(numbers[i] == min)
            minAmount++;
    }

    return minAmount;

}

function showCookiesDialog() {
    const hasCookies = confirm('Cookies found! Do you want to reload the page with the saved data?');
    if (hasCookies) {
        const result = getCookie('minValuesResult');
        showResultDialog(result);
    } else {
        deleteCookie('minValuesResult');
        location.reload();
    }
}

function getMinValues(event) {
    event.preventDefault();

    const result = calculateMinValues();

    setCookie("minValuesResult", result);

    showResultDialog(result);
    
}

// Check for cookies on page load
window.onload = function () {
    const hasCookies = getCookie('minValuesResult');
    if (hasCookies) {
        showCookiesDialog();
    }
};

// Add event listener to the form
const form = document.getElementById('numbersForm');
form.addEventListener('submit', getMinValues);