"use strict";

let objet = document.querySelector("#objet");
let svg = document.getElementsByTagName("svg")[0];
let compteur = 0;

// drag and drop HTML to svg

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



    //image
    image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', strOut + "#chair");
    image.setAttributeNS(null,"id", "chair" + compteur);
    image.setAttributeNS(null,"x", ""+posX);
    image.setAttributeNS(null,"y", ""+posY);
    image.setAttributeNS(null,"class", "draggable");

    svg.appendChild(image);
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
            offset = getMousePosition(evt);
            // Get all the transforms currently on this element
            let transforms = selectedElement.transform.baseVal;

            // Ensure the first transform is a translate transform
            if (transforms.length === 0 || transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
                // Create an transform that translates by (0, 0)
                let translate = svgElem.createSVGTransform();
                translate.setTranslate(0, 0);
                // Add the translation to the front of the transforms list
                selectedElement.transform.baseVal.insertItemBefore(translate, 0);
            }
            // Get initial translation amount
            transform = transforms.getItem(0);

            offset.x -= transform.matrix.e;
            offset.y -= transform.matrix.f;
        }
    }

    function drag2(evt) {
        if (selectedElement) {
            evt.preventDefault();
            let coord = getMousePosition(evt);
            transform.setTranslate(coord.x - offset.x, coord.y - offset.y);

        }
    }
    function endDrag(evt) {
        selectedElement = null;
    }
}