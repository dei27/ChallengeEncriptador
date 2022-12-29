let values = [];
let form = document.getElementById("formValues");
let wrapper = document.getElementById('alertSave');
let array = ["ai", "enter", "imes", "ober", "ufat"]
let textChange = document.getElementById("change");
let text = document.getElementById("textArea");
let changeIcon = document.getElementById("changeText");
let btnImg = document.getElementById("btnImg");
let btnCopy = document.getElementById("btnCopy");
let isLock = true;

changeTxt();
saveValuesForm();
cleanValuesForm();
changeSymbolText();
copyToClickBoard();

function changeTxt() {
    text.addEventListener("keyup", () => {

        if (isLock) {
            textChangeFunction(encryptTextCustom, encryptText);
        } else {
            textChangeFunction(encryptTextCustomReverse, encryptTextReverse);
        }
    })
}

function saveValuesForm() {
    let btnSave = document.getElementById("saveValues");
    btnSave.addEventListener("click", () => {

        if (values.length > 0) {
            values = [];
        }
        for (let index = 0; index < 5; index++) {
            if (form.elements[index].value === "") {
                form.elements[index].value = array[index];
            }
            values.push(form.elements[index].value)
        }

        if (isLock) {
            textChange.value = encryptTextCustom(text.value, values);
        } else {
            textChange.value = encryptTextCustomReverse(text.value, values);
        }
        createAlert(wrapper, "success", "¡Perfecto! Guardado con éxito");
    });
}

function cleanValuesForm() {
    let text = document.getElementById("textArea");
    let btnClean = document.getElementById("cleanValues");
    btnClean.addEventListener("click", () => {

        for (let index = 0; index < 5; index++) {
            form.elements[index].value = "";
        }

        text.value = "";
        textChange.value = "";
        values=[];
        isLock=true;

        if (changeIcon.classList.contains('unlock')) {
            changeIcon.classList.remove("unlock");
            changeIcon.classList.add("lock");
            changeIcon.setAttribute("src", "src/lock.png");
            btnImg.style.backgroundColor = "white"
        }

        createAlert(wrapper, "info", "¡Genial! Restablecido con éxito");
    })
}

function encryptText(text) {
    return text.replace(/e/g, "enter").replace(/i/g, "imes").replace(/a/g, "ai").replace(/o/g, "ober").replace(/u/g, "ufat");
}

function encryptTextReverse(text) {
    return text.replace(/enter/g, "e").replace(/imes/g, "i").replace(/ai/g, "a").replace(/ober/g, "o").replace(/ufat/g, "u");
}

function encryptTextCustom(text, array) {
    return text.replace(/e/g, array[1]).replace(/i/g, array[2]).replace(/a/g, array[0]).replace(/o/g, array[3]).replace(/u/g, array[4]);
}

function encryptTextCustomReverse(text, array) {
    return text.replaceAll(array[1], "e").replaceAll(array[2], "i").replaceAll(array[0], "a").replaceAll(array[3], "o").replaceAll(array[4], "u");
}

function createAlert(wrapper, color, sms) {
    wrapper.innerHTML =
        `<div class="alert alert-${color} alert-dismissible fade show fw-bold fs-5" role="alert">${sms}.<button type="button" class="btn-close  bg-white" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
}

function textChangeFunction(func1, func2) {
    if (text.value.trim() === "") {
        textChange.value = "";
    } else {
        if (values.length > 0) {
            textChange.value = func1(text.value, values);
        } else {
            textChange.value = func2(text.value);
        }
    }
}

function changeSymbolText() {
    changeIcon.addEventListener("click", () => {
        changeIcon.classList.toggle("lock");
        changeImage();
        isLock = getClassLockUnlock();
    })
}


function changeImage() {
    if (changeIcon.classList.contains('lock')) {
        changeIcon.classList.remove('unlock');
        changeIcon.setAttribute("src", "src/lock.png");
        btnImg.style.backgroundColor = "white";
    } else {
        changeIcon.classList.add('unlock');
        changeIcon.setAttribute("src", "src/unlock.png");
        btnImg.style.backgroundColor = "deepskyblue";
    }
}

function getClassLockUnlock() {
    if (changeIcon.classList.contains('lock')) {
        return true;
    } else {
        return false;
    }
}

function copyToClickBoard() {
    btnCopy.addEventListener("click", () => {

        if (textChange.value != "") {
            navigator.clipboard.writeText(textChange.value);
            createAlert(wrapper, "info", "¡Genial! Copiado con éxito");
        } else {
            createAlert(wrapper, "danger", "No hay nada que copiar 😢");
        }
    })
}
