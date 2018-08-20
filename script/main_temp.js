"use strict";


let c = document.getElementById("circle0");
let couleurPicker;
let defaultColor = "#0000ff";
let imageInput = document.getElementById("fichier");
let svg= document.getElementById("svg");

window.addEventListener("load", startup, false);

function startup() {
    couleurPicker = document.querySelector("#couleurPicker");
    couleurPicker.value = defaultColor;
    couleurPicker.addEventListener("input", updateFirst, false);
    couleurPicker.addEventListener("change", updateAll, false);
    couleurPicker.select();
}

function updateFirst(event) {

    if (c) {
        //c.setAttribute("fill", event.target.value);
        svg.style.backgroundColor = event.target.value;
    }
}

function updateAll(event) {
    //c.setAttribute("fill", event.target.value);
    svg.style.backgroundColor = event.target.value;

}

imageInput.addEventListener('change', function () {
    let fichier = imageInput.files;
    // console.log(fichier);
    //
    // for (let i = 0; i < fichier.length; i++) {
    //     console.log(fichier[i]);
    // }
    let reader = new FileReader();
    reader.readAsDataURL( fichier[0] );
    reader.onloadend = function(){

        //console.log(this.result);
        document.getElementById("bgImg").setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', this.result);

    }
});

function dropHandler(ev) {
    console.log('File(s) dropped');

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (let i = 0; i < ev.dataTransfer.items.length; i++) {
            // If dropped items aren't files, reject them
            if (ev.dataTransfer.items[i].kind === 'file') {
                let file = ev.dataTransfer.items[i].getAsFile();

                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = function(){

                    //console.log(this.result);
                    document.getElementById("bgImg").setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', this.result);

                }
            }
        }
    } else {
        // Use DataTransfer interface to access the file(s)
        for (let i = 0; i < ev.dataTransfer.files.length; i++) {
            console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
        }
    }

    // Pass event to removeDragData for cleanup
    removeDragData(ev)
}

function dragOverHandler(ev) {
    console.log('File(s) in drop zone');

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
}

function removeDragData(ev) {
    console.log('Removing drag data')

    if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to remove the drag data
        ev.dataTransfer.items.clear();
    } else {
        // Use DataTransfer interface to remove the drag data
        ev.dataTransfer.clearData();
    }
}