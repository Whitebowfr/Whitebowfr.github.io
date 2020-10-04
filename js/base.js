function showThisPage(idToShow) {
    document.getElementById('translations').style.display = ((idToShow == 'translations') ? "block" : "none")
    document.getElementById('calculator').style.display = ((idToShow == 'calculator') ? "block" : "none")
};

addKeyInput();

function addKeyInput() {
    var textInputs = document.querySelectorAll("input");
    for (i = 0; i<textInputs.length; i++) {
        textInputs[i].addEventListener('keyup', function a() {
            if(event.keyCode == 13) { 
                textboxes = $("input");
                currentBoxNumber = textboxes.index(this);
                if (textboxes[currentBoxNumber + 1] != null && textboxes[currentBoxNumber + 1].disabled != true) {
                    nextBox = textboxes[currentBoxNumber + 1]
                    nextBox.focus();
                    nextBox.select();
                    event.preventDefault();
                    return false 
                } else {
                    if (textboxes[currentBoxNumber + 2] != null && textboxes[currentBoxNumber + 2].disabled != true) {
                        nextBox = textboxes[currentBoxNumber + 2]
                        nextBox.focus();
                        nextBox.select();
                        event.preventDefault();
                        return false  
                    } if (textboxes[currentBoxNumber + 3] != null && textboxes[currentBoxNumber + 3].disabled != true) {
                        nextBox = textboxes[currentBoxNumber + 3]
                        nextBox.focus();
                        nextBox.select();
                        event.preventDefault();
                        return false 
                    } 
                }
            }
        }, false)
    }
}

var number = 0

function addLine() {
    number += 2
    var br = document.createElement('br');
    var voInput = document.createElement('input');
    voInput.id = (number+1);
    voInput.name = "original";
    var vfInput = document.createElement('input');
    vfInput.id = (number+2);
    vfInput.name = "translation";
    vfInput.style = "margin-left: 5px";
    document.getElementById('inputSrc').appendChild(br);
    document.getElementById('inputSrc').appendChild(voInput);
    document.getElementById('inputSrc').appendChild(vfInput);
}

function createInput(type, id, br, dis, divid) {
    var divID = "-" + divid
    console.log(divID)
    var table = document.createElement('input')
    table.id = id + "*"
    table.name = type
    table.type = "text"
    table.style = "margin-left: 5px;"
    table.autocomplete = "off"
    if (br == true) {
        var label = document.createElement('label')
        label.style = "display: inline-block; margin-left: 5px; color: green;"
        label.id = "l" + id
        label.className = "verified"
        document.getElementById(divID).appendChild(table)
        document.getElementById(divID).appendChild(label);
    } else {
        document.getElementById(divID).appendChild(table)  
    }
    if (dis == true) {
        $(table).prop( "disabled",true );
       table.className = 'disabled'
    }
}

function getRandom(end) {
    return Math.ceil(Math.random()*end)
}

function buildTable() {
    document.getElementById('tableSrc').innerHTML = ""
    var passe = 0
    var divId = 'divVar'
    for (var i = 0; i<(number + 2)/2; i++) {
        var div = document.createElement('div')
        var divNum = getRandom((number + 2)/2)
        while ($('#-' + divNum).length != 0) {
            divNum = getRandom((number + 2)/2)
        }
        div.id = "-" + divNum
        document.getElementById('tableSrc').appendChild(div)
        eval(divId + divNum + '= ' + divNum + ";");
    }
    for (var i = 0; i<(number + 2); i++) {
        var numero = getRandom((number + 2)/2)
        var lock = getRandom(2);
        passe += 1
        var id = (passe - 1) + "*"
        console.log(passe)
        if (passe % 2 == 1) {
                if (lock == 1) {
                    createInput("original", passe, false, true, window["divVar" + (passe + 1)/2])
                } else {
                    createInput("original", passe, false, false, window["divVar" + (passe + 1)/2])
                }
            if (document.getElementById(passe + "*").classList.value == 'disabled') {
                document.getElementById(passe + "*").value = localStorage.getItem(passe)
            }
        } else {
            if (document.getElementById(id).classList.value != 'disabled') {
                createInput("translation", passe, true, true, window["divVar" + passe/2])
            } if (document.getElementById(id).classList.value == 'disabled') {
                createInput("translation", passe, true, false, window["divVar" + passe/2])
            }
            if (document.getElementById(passe + "*").classList.value == 'disabled') {
                document.getElementById(passe + "*").value = localStorage.getItem(passe)
            }
        }
    }
}

function finish() {
    var passes = 0
    for(var i = 0; i<(number+2); i++) {
        passes += 1
        var current = document.getElementById(passes)
        if (current.name == "original") {
            localStorage.setItem(current.id, current.value)
        } if (current.name == "translation") {
            localStorage.setItem(current.id, current.value)
        }
    }
    $('.hide').hide();
    $('.hidden').show();
    buildTable();
}

function checkAnswer() {
    var test = 0
    for (var i = 1; i<(number + 3); i++) {
        test++
        if (document.getElementById(test + "*").classList.value != 'disabled') {
            if (document.getElementById(test + "*").value == localStorage.getItem(test)) {
                if (test%2 == 1) {
                    document.getElementById("l" + (test + 1)).innerText = 'Vrai !'
                } else {
                    document.getElementById("l" + test).innerText = 'Vrai'
                }
            }
            else {
                if (test%2 == 1) {
                    document.getElementById("l" + (test + 1)).innerText = 'Faux, la bonne réponse est ' + localStorage.getItem(test)
                } else {
                    document.getElementById("l" + test).innerText = 'Faux, la bonne réponse est ' + localStorage.getItem(test)
                }
            }
        }
    }
}

function removeBubbles(check) {
    var checkbox = document.getElementById('keepBubbles')
    if (checkbox.checked == false) {
        document.getElementById('particles-js').style.display = 'none'
        checkbox.checked = true
    } else {
        document.getElementById('particles-js').style.display = 'block'
        checkbox.checked = false
    }
}