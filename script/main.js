"use strict";

// -----------------------------------------------------------------------------------
// options de personnalisation
let couleurPicker;
let defaultColor = "#e4e4e4";
let imageInput = document.getElementById("fichier");
let svg= document.getElementById("svg");
let elementCourant;
let imageCourante;
let supprimerBtnCourant;
let dropzone = document.getElementById("drop-zone");

dropzone.addEventListener("drop", function () {dropHandler(event)});
dropzone.addEventListener("dragover", function () {dragOverHandler(event)});

window.addEventListener("load", startup, false);

function startup() {
    couleurPicker = document.querySelector("#couleurPicker");
    couleurPicker.value = defaultColor;
    couleurPicker.addEventListener("input", updateFirst, false);
    couleurPicker.addEventListener("change", updateAll, false);
    couleurPicker.select();
}

function updateFirst(event) {

    //let bg = document.getElementById("background");
    svg.style.backgroundColor = event.target.value;
    svg.style.backgroundImage = "none";

}

function updateAll(event) {

    //let bg = document.getElementById("background");
    svg.style.backgroundColor = event.target.value;
    svg.style.backgroundImage = "none";

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

// modifier le libelle le l'objet
let libelleTxt = document.getElementById("inputLabel");
let libelleButton = document.getElementById("libelleButton");

libelleButton.addEventListener("click", function() {
    let y = elementCourant.nextSibling.childNodes[0]
    elementCourant.nextSibling.removeChild(y);
    let textNode = document.createTextNode(libelleTxt.value);
    elementCourant.nextSibling.appendChild(textNode);

    libelleTxt.value = '';
});


//--------------------------------------------------------------------------------
// drag and drop HTML to svg

let objet = document.querySelector("#objet");
let listImg = document.getElementsByClassName("iconImg");
let compteur = 0;

for (let i = 0; i < listImg.length; i++) {
    listImg[i].addEventListener("dragstart", drag);
}

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
    if(valeur.includes("images/")){
        let supprimerBtn = document.createElementNS("http://www.w3.org/2000/svg", "use");
        let image = document.createElementNS("http://www.w3.org/2000/svg", "use");
        let libelle = document.createElementNS("http://www.w3.org/2000/svg", "text");
        let index  = valeur.indexOf('images');

        let strOut = valeur.substr(index);
        console.log(strOut);

        let pos = event_to_xy(svg, evt);
        let posX = pos.x ;
        let posY = pos.y;

        //delete
        supprimerBtn.setAttributeNS('http://www.w3.org/1999/xlink', 'href', "images/delete_icon.svg#delete_icon");
        supprimerBtn.setAttributeNS(null,"id", "delete_icon" + compteur);
        supprimerBtn.setAttributeNS(null,"x", posX - 30);
        supprimerBtn.setAttributeNS(null,"y", posY - 30);
        supprimerBtn.setAttributeNS(null,"visibility", "hidden");

        //libelle
        libelle.setAttributeNS(null,"x", ""+posX);
        libelle.setAttributeNS(null,"y", ""+posY);
        libelle.setAttributeNS(null,"font-size",30);
        let textNode = document.createTextNode("libelle");
        libelle.appendChild(textNode);


        //image
        image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', strOut + "#objet");
        image.setAttributeNS(null,"x", ""+posX);
        image.setAttributeNS(null,"y", ""+posY);
        image.setAttributeNS(null,"class", "draggable");
        let elements = document.getElementsByClassName("draggable");
        for(let e of elements){
            if(e.previousSibling.getAttribute("visibility") === "visible"){
                e.previousSibling.setAttribute("visibility", "hidden");
            }
        }
        supprimerBtn.setAttribute("visibility", "visible");
        elementCourant = image;

        svg.appendChild(supprimerBtn);
        svg.appendChild(image);
        svg.appendChild(libelle);
        imageCourante = image;
        supprimerBtnCourant = supprimerBtn;
        compteur++;
        image.addEventListener("click", setElementCourant);
        supprimerBtn.addEventListener("click", supprimerElement);
    }

}

function setElementCourant(ev){
    console.log("test");
    let elements = document.getElementsByClassName("draggable");
    for(let e of elements){
        if(e.previousSibling.getAttribute("visibility") === "visible"){
            e.previousSibling.setAttribute("visibility", "hidden");
        }
    }
    let supprimerBtn = ev.target.previousSibling;
    supprimerBtn.setAttribute("visibility", "visible");
    elementCourant = ev.target;
    supprimerBtnCourant = supprimerBtn;
}

function supprimerElement(){
    let img = supprimerBtnCourant.nextSibling;
    let libelle = img.nextSibling;
    libelle.remove();
    img.remove();
    supprimerBtnCourant.remove();

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

    console.log('entré makeDraggable function');

    let svgElem = evt.target;
    svgElem.addEventListener('mousedown', startDrag);
    svgElem.addEventListener('mousemove', drag2);
    svgElem.addEventListener('mouseup', endDrag);
    svgElem.addEventListener('mouseleave', endDrag);

    let selectedElement, selectedElement2,selectedElementDelete, offset, transform, transform2, transform3;
    function startDrag(evt) {
        if (evt.target.classList.contains('draggable')) {
            selectedElement = evt.target;
            selectedElement2 = evt.target.nextSibling;
            selectedElementDelete = evt.target.previousSibling;
            offset = getMousePosition(evt);
            // Get all the transforms currently on this element
            let transforms = selectedElement.transform.baseVal;
            let transforms2 = selectedElement2.transform.baseVal;
            let transforms3 = selectedElementDelete.transform.baseVal;
            // Ensure the first transform is a translate transform
            if (transforms.length === 0 || transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
                // Create an transform that translates by (0, 0)
                let translate = svgElem.createSVGTransform();
                translate.setTranslate(0, 0);
                // Add the translation to the front of the transforms list
                selectedElement.transform.baseVal.insertItemBefore(translate, 0);
                selectedElement2.transform.baseVal.insertItemBefore(translate, 0);
                selectedElementDelete.transform.baseVal.insertItemBefore(translate, 0);
            }
            // Get initial translation amount
            transform = transforms.getItem(0);
            transform2 = transforms2.getItem(0);
            transform3 = transforms3.getItem(0);

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
            transform3.setTranslate(coord.x - offset.x, coord.y - offset.y);
        }
    }
    function endDrag(evt) {
        selectedElement = null;
        selectedElement2 = null;
        selectedElementDelete = null;
    }
}