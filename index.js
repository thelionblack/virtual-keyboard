window.onload = function() {
    document.body.innerHTML = ` 
<textarea></textarea>
<div class="button" data-type="${localStorage.getItem('language')}">language: ${localStorage.getItem('language')}</div>
<div class="keyboard"></div>`;
let textarea = document.querySelector("textarea");
let button = document.querySelector('.button');


    createKeyboard();
    changeLanguage();
    writeSymbolWithKeyboard();
  };

const writeSymbolWithVirtualKeyboard = () => {
    let row = document.querySelectorAll(".row");
    let key = document.querySelectorAll(".key");
    let textarea = document.querySelector("textarea");
    console.log(key[25]);
    row.forEach((e, i) => {
        e.addEventListener("click", (event) => {
            let target = event.target;
            console.log(target)
            if(target.classList.contains('Tab')){
                textarea.value += "    ";
            }else if(target.classList.contains('Space')){
                textarea.value += " ";
            }else if(event.target.classList.contains('CapsLock-active')){
                event.target.classList.remove('CapsLock-active');
                key.forEach((e,i) => {
                    key[i].innerText = key[i].innerText.toLowerCase();
                })
            }else if(event.target.dataset.key == "CapsLock"){
                event.target.classList.add('CapsLock-active');
                key.forEach((e,i) => {
                    key[i].innerText = key[i].innerText.toUpperCase();
                })
            }else if(target.classList.contains('key')){
                textarea.value += target.innerHTML;
            }
        })
    });
};

const writeSymbolWithKeyboard = () => {
    let textarea = document.querySelector("textarea");
    document.addEventListener('keydown', function(event){
        textarea.value += event.key;
        addKeyboardBacklight();
    });
    document.addEventListener('keyup', function(event){
        removeKeyboardBacklight();
    });
};

const addKeyboardBacklight = () => {
    document.querySelectorAll(".key").forEach((e) => {
        if(event.key == e.innerHTML || event.key == e.dataset.key){
            e.classList.add("active");
        }
    })
};

const removeKeyboardBacklight = () => {
    document.querySelectorAll(".key").forEach((e) => {
        if(event.key == e.innerHTML || event.key == e.dataset.key){
            e.classList.remove("active");
        }
    })
};

const changeLanguage = () => {
    let button = document.querySelector('.button');
    button.addEventListener('click', (event) => {
        if(button.dataset.type == "rus"){
            localStorage.removeItem("language");
            button.dataset.type = "en";
            button.innerHTML = `language: en`;
            localStorage.setItem("language", button.dataset.type);
        }else{
            localStorage.removeItem("language");
            button.dataset.type = "rus";
            button.innerHTML = `language: rus`;
            localStorage.setItem("language", button.dataset.type);
        }
        removeKeyboard();
        createKeyboard();
    })
};

const removeKeyboard = () => {
    document.querySelector('.keyboard').innerHTML = "";
}

const createKeyboard = () => {
    let arr = chooseKeyboard();
    let keyboard = `<div class="row">`;
    arr.forEach((e, i) => {
        if(e == "Control"){
            e = "Ctrl";
        }
        if(e == "Backspace"){
            keyboard += `<div class="key ${e}" data-key="${e}">${e}</div></div><div class="row">`;
        }else if(e == "Enter"){
            keyboard += `<div class="key ${e}" data-key="${e}">${e}</div></div><div class="row">`;
        }else if(e == "\\"){
            keyboard += `<div class="key ${e}" data-key="${e}">${e}</div></div><div class="row">`;
        }else if(i == 52){
            keyboard += `<div class="key ${e}" data-key="${e}">${e}</div></div><div class="row">`;
        }else if(i == 59){
            keyboard += `<div class="key ${e}" data-key="${e}">${e}</div></div>`;
        }else {
            keyboard += `<div class="key ${e}" data-key="${e}">${e}</div>`;
        }
    });
    document.querySelector('.keyboard').innerHTML += keyboard;
    writeSymbolWithVirtualKeyboard();
};

const chooseKeyboard = () => {
    let button = document.querySelector('.button');
    if(button.dataset.type == "rus"){
        return ["ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "Enter", "CapsLock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "\\", "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "Shift", "Control", "Meta", "Alt", "Space", "Alt", "Control"];
    }else {
        return ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "Enter", "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "\\", "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "Shift", "Control", "Meta", "Alt", "Space", "Alt", "Control"];
    }
};

