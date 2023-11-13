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


// 4. Напишіть скрипт, який при настанні події keypress встановлює властивість
// «курсив» для всього тексту в блоці «3» при встановленні користувачем
// відповідної галочки у формі і зберігає відповідне значення «курсивності» тексту
// в localStorage броузера так, щоб при наступному відкриванні веб-сторінки
// значення «курсивності» тексту в блоці «3» встановлювалось із збереженого
// значення в localStorage.

restoreFontFromLocalStorage();
    window.addEventListener('keypress', function (event) {
        
        const italicCheckbox = document.getElementById('italicCheckbox');
        // Check if the key pressed is 'i' or 'I'
        if(italicCheckbox.checked){
            if (event.key.toLowerCase() === 'i') {
                // Toggle italic style
                

                if(italicCheckbox.checked){
                    applyFontStyle('italic');
                    // Save the italic state to localStorage
                    localStorage.setItem('italicState', italicCheckbox.checked.toString());

                }
                else{
                    applyFontStyle('normal');
                    localStorage.removeItem('italicState', italicCheckbox.checked.toString());
                }
            }
        }else{
            applyFontStyle('normal');
            localStorage.removeItem('italicState', italicCheckbox.checked.toString());
        }
    });



function restoreFontFromLocalStorage() {
    const savedItalicState = localStorage.getItem('italicState');
        if (savedItalicState === 'true') {
            applyFontStyle('italic');
            document.getElementById('italicCheckbox').checked = true;
        }
}


function applyFontStyle(style) {
    const block3 = document.getElementsByTagName('nav')[0];
    block3.style.fontStyle = style;
}

// Напишіть скрипт задання CSS-інструкцій для будь-якого тега в HTML-структурі
// номерних блоків (1..6):
// а) необхідні елементи форми появляються у блоці «5» внаслідок подвійного
// кліку на блоці «у», кількість CSS-інструкцій необмежена;
// б) після елементів форми розміщується кнопка, внаслідок натискання на яку
// додана CSS-інструкція зберігається в localStorage броузера і задіюється для
// відповідного тега;
// г) для кожної нової CSS-інструкції в блоці «2» розміщується кнопка, внаслідок
// натискання якої ця CSS- інструкція видаляється із localStorage броузера і її вплив
// на відповідний тег припиняється - без перезавантаження веб-сторінки.
let tagSelect;

function showForm() {
    const block5 = document.getElementsByTagName('article')[0];
    const form = document.createElement('form');
    form.id = 'dynamicForm';

    tagSelect = document.createElement('select');
    tagSelect.id = 'tagSelect';
    const tagOptions = ['footer', 'header', 'nav', 'article', 'aside', 'panel'];
    tagOptions.forEach(function (tag) {
        const option = document.createElement('option');
        option.value = tag;
        option.text = tag;
        tagSelect.appendChild(option);
    });

    form.appendChild(tagSelect);

    // Add input for CSS instruction
    const cssInput = document.createElement('input');
    cssInput.type = 'text';
    cssInput.placeholder = 'Enter CSS instruction';
    form.appendChild(cssInput);

    // Add button to apply CSS instruction
    const applyButton = document.createElement('button');
    applyButton.type = 'button';
    applyButton.innerText = 'Apply CSS';
    applyButton.addEventListener('click', applyCSS);
    form.appendChild(applyButton);

    // Add form to block 5
    block5.appendChild(form);
}

// Function to apply CSS instruction
function applyCSS() {
    const form = document.getElementById('dynamicForm');
    const cssInput = form.querySelector('input');

    // Get the entered CSS instruction
    const selectedTag = tagSelect.value;
    const cssInstruction = cssInput.value;

    // Apply CSS to the appropriate tag
    const selectedElement = document.getElementsByTagName(selectedTag)[0];
    if (selectedElement) {
        selectedElement.style.cssText = cssInstruction;
    }

    // Save the CSS instruction and selected element to localStorage
    saveToLocalStorage(selectedTag, cssInstruction, selectedElement);

    // Create a button in block 2 for removing the CSS instruction
    createRemoveButton(cssInstruction, selectedTag);

    // Clear the form
    form.remove();
}

// Function to create a button for removing CSS instruction
function createRemoveButton(cssInstruction, selectedTag) {
    const block2 = document.getElementsByTagName('aside')[0];
    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remove CSS: ' + cssInstruction + " for " + selectedTag;
    removeButton.addEventListener('click', function () {
        removeFromLocalStorage(cssInstruction, selectedTag);
        removeCSS(selectedTag);
        removeButton.remove();
    });
    block2.appendChild(removeButton);
}

// Function to remove CSS instruction from the appropriate tag
function removeCSS(selectedTag) {
    const selectedElement = document.getElementsByTagName(selectedTag)[0];
    if (selectedElement) {
        selectedElement.style.cssText = '';
    }
}

// Function to save CSS instruction and selected element to localStorage
function saveToLocalStorage(selectedTag, cssInstruction, selectedElement) {
    const storedData = JSON.parse(localStorage.getItem('cssInstructions')) || {};
    const elementId = selectedElement ? selectedElement.id : null;

    // Save the CSS instruction and selected element to localStorage
    storedData[selectedTag] = { cssInstruction, elementId };
    localStorage.setItem('cssInstructions', JSON.stringify(storedData));
}

// Function to remove CSS instruction from localStorage
function removeFromLocalStorage(cssInstruction, selectedTag) {
    const storedData = JSON.parse(localStorage.getItem('cssInstructions')) || {};
    delete storedData[selectedTag];
    localStorage.setItem('cssInstructions', JSON.stringify(storedData));
}

// Check for stored CSS instructions on page load
window.onload = function () {
    const storedData = JSON.parse(localStorage.getItem('cssInstructions')) || {};
    for (const selectedTag in storedData) {
        const { cssInstruction } = storedData[selectedTag];
        createRemoveButton(cssInstruction, selectedTag);
    }
};

// Add event listener to block 5 for double click
const block5 = document.getElementsByTagName('footer')[0].querySelector('h1');
block5.addEventListener('dblclick', showForm);

