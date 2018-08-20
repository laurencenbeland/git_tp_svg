"use strict";

// -----------------------------------------------------------------------------------
// options de personnalisation
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
    //c.setAttribute("fill", event.target.value);
    let bg = document.getElementById("background");
    bg.style.backgroundColor = event.target.value;

}

function updateAll(event) {
    //c.setAttribute("fill", event.target.value);
    let bg = document.getElementById("background");
    bg.style.backgroundColor = event.target.value;

}

// import image
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
        //document.getElementById("bgImg").setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', this.result);
        svg.style.backgroundImage = "url(" + this.result +")";
        svg.style.backgroundRepeat = "no-repeat";
        svg.style.backgroundSize = "100% 100%";
        svg.style. backgroundPosition = "center";


    }
});

// drag drop image
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
                    //document.getElementById("bgImg").setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', this.result);

                    svg.style.backgroundImage = "url(" + this.result +")";
                    svg.style.backgroundSize = "contain"
                    svg.style.backgroundSize = "100% 100%";
                    svg.style.backgroundRepeat = "no-repeat";
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


//--------------------------------------------------------------------------------
// drag and drop HTML to svg

let objet = document.querySelector("#objet");
let compteur = 0;

function drag(evt){
    let valeur = evt.target.src;
    evt.dataTransfer.setData('text/plain', valeur);
}


function dragover(evt){
    evt.preventDefault();
}


function drop(evt){
    evt.preventDefault();
    let valeur = evt.dataTransfer.getData('text/plain');
    let image = document.createElementNS("http://www.w3.org/2000/svg", "use");
    let libelle = document.createElementNS("http://www.w3.org/2000/svg", "text");
    let index  = valeur.indexOf('images');

    let strOut = valeur.substr(index);
    console.log(strOut);

    let pos = event_to_xy(svg, evt);
    let posX = pos.x ;
    let posY = pos.y;

    //libelle

    libelle.setAttributeNS(null,"x", ""+posX);
    libelle.setAttributeNS(null,"y", ""+posY);
    libelle.setAttributeNS(null,"font-size",30);
    let textNode = document.createTextNode("test");
    libelle.appendChild(textNode);


    //image
    image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', strOut + "#chair");
    image.setAttributeNS(null,"id", "chair" + compteur);
    image.setAttributeNS(null,"x", ""+posX);
    image.setAttributeNS(null,"y", ""+posY);
    image.setAttributeNS(null,"class", "draggable");

    svg.appendChild(image);
    svg.appendChild(libelle);
    compteur++;

}

//----------------------------------------------------------
// get positions

function event_to_xy(elem, ev) {
    let rect = elem.getBoundingClientRect();
    return {
        x : ev.clientX - rect.left,
        y : ev.clientY - rect.top,
    };
}

function getMousePosition(evt) {
    let CTM = svg.getScreenCTM();
    return {
        x: (evt.clientX - CTM.e) / CTM.a,
        y: (evt.clientY - CTM.f) / CTM.d
    };
}

//----------------------------------------------------------
// drag and drop in svg

function makeDraggable(evt) {
    let svgElem = evt.target;
    svgElem.addEventListener('mousedown', startDrag);
    svgElem.addEventListener('mousemove', drag2);
    svgElem.addEventListener('mouseup', endDrag);
    svgElem.addEventListener('mouseleave', endDrag);

    let selectedElement, selectedElement2, offset, transform, transform2;
    function startDrag(evt) {
        if (evt.target.classList.contains('draggable')) {
            selectedElement = evt.target;
            selectedElement2 = evt.target.nextSibling;
            offset = getMousePosition(evt);
            // Get all the transforms currently on this element
            let transforms = selectedElement.transform.baseVal;
            let transforms2 = selectedElement2.transform.baseVal;
            // Ensure the first transform is a translate transform
            if (transforms.length === 0 || transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
                // Create an transform that translates by (0, 0)
                let translate = svgElem.createSVGTransform();
                translate.setTranslate(0, 0);
                // Add the translation to the front of the transforms list
                selectedElement.transform.baseVal.insertItemBefore(translate, 0);
                selectedElement2.transform.baseVal.insertItemBefore(translate, 0);
            }
            // Get initial translation amount
            transform = transforms.getItem(0);
            transform2 = transforms2.getItem(0);

            offset.x -= transform.matrix.e;
            offset.y -= transform.matrix.f;
        }
    }

    function drag2(evt) {
        if (selectedElement) {
            evt.preventDefault();
            let coord = getMousePosition(evt);
            transform.setTranslate(coord.x - offset.x, coord.y - offset.y);
            transform2.setTranslate(coord.x - offset.x, coord.y - offset.y);
        }
    }
    function endDrag(evt) {
        selectedElement = null;
        selectedElement2 = null;
    }
}