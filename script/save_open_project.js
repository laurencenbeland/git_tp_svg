"use strict";

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// appliquer une fonction init pour les listeners sur les objets
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

document.addEventListener("DOMContentLoaded", function () {

    svg.addEventListener("drop", drop);
    svg.addEventListener("dragover", dragover);
    svg.addEventListener("onload", makeDraggable);

    let select_projet = document.getElementById("select_projet");

    let btn_nouveau_projet = document.getElementById("btn_nouveau_projet");
    let btn_save = document.getElementById("btn_save");
    let btn_remove = document.getElementById("btn_remove");
    let btn_reset = document.getElementById("btn_reset");

    let input = document.getElementById("input_nom_projet");
    let input_nom_projet = " ";

    // INIT select list
    function init_options() {
        // Liste des projets (select)
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            //let value = localStorage[key];
            //console.log(key);
            let opt = document.createElement("option");
            opt.value = key;
            opt.innerHTML = key;
            select_projet.appendChild(opt)
        }
    }

    // initialiser la liste des projets sauvegardés dès l'ouverture de la page
    init_options();
    startup();

    // NOUVEAU PLAN
    btn_nouveau_projet.addEventListener("click", function (evt) {

        let nom_nouveau_projet = prompt('Nom du nouveau projet');

        if(nom_nouveau_projet === null || nom_nouveau_projet == ""){
            alert('Entrez un nom pour votre nouveau projet.');
            return false;
        } else if (nom_nouveau_projet != null) {

            let container_svg = document.getElementById("container-svg");
            container_svg.innerHTML = '<svg viewBox="0 0 150 150" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" id="svg"><image id="bgImg" xlink:href="" style="width: 100%; height: 100%"/></svg>';

            // enregistrer le nouveau svg empty
            let empty_svg = document.getElementById("container-svg").innerHTML;

            // ajouter au storage
            localStorage.setItem(nom_nouveau_projet, empty_svg);

            // ajouter à la liste de select
            let opt = document.createElement("option");
            opt.value = nom_nouveau_projet;
            opt.textContent = nom_nouveau_projet;
            select_projet.add(opt, select_projet.options[select_projet.options.length + 1]);
            alert("Votre nouveau projet a été créé et enregistré.");

            brancher_listener();

            return true;
        }
    });

    // btn modifier nom projet (plutot que de créer un novueau projet a partir du input...


    // SAVE PLAN
    btn_save.addEventListener("click", function (evt) {
        save_project();
    });

    


    // OPEN SELECTED PROJECT
    select_projet.addEventListener("change", function (evt) {
        let select_value = select_projet.value;
        let key = select_value;
        // console.log("key is open :", key);
        // console.log("project " + key + " est ouvert");
        let value = localStorage.getItem(key);
        document.getElementById("container-svg").innerHTML = value;
        // console.log("value : ", value);
        input.value = " ";

        brancher_listener();

    });


    btn_remove.addEventListener("click", function (evt) {
        let key = select_projet.value;
        localStorage.removeItem(key);
        remove_projet_from_select();
    });


    btn_reset.addEventListener("click", function (evt) {
        console.log("RESET AVANT : ", document.getElementById("container-svg").innerHTML);
        let container_svg = document.getElementById("container-svg");
        container_svg.innerHTML = '<svg id="svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><image id="bgImg" xlink:href="" width="100%" height="100%" style="width: 100%; height: 100%"/></svg>'
        svg.style.backgroundColor = "#FFFFFF";
        console.log("RESET APRÈS : ", document.getElementById("container-svg").innerHTML);
    });


    function save_project() {

        console.log("btn save clické");
        console.log("RESET AVANT : ", document.getElementById("container-svg").innerHTML);

        let select_value = select_projet.value;
        input_nom_projet = input.value;

        if (input_nom_projet !== "") {

            if (localStorage.getItem(select_value) !== null) {

                let new_svg = document.getElementById("container-svg").innerHTML;
                localStorage.setItem(select_value, new_svg);

            } else {

                let opt = document.createElement("option");

                opt.value = input_nom_projet;
                opt.textContent = input_nom_projet;

                let content_to_save = document.getElementById("container-svg").innerHTML;
                console.log(content_to_save);

                // localStorage Key, Value
                if (input_nom_projet.value === "") {
                    alert("Veuillez inscrire un nom de projet.");
                } else {
                    localStorage.setItem(input_nom_projet, content_to_save)
                    select_projet.add(opt, select_projet.options[select_projet.options.length + 1]);
                    alert("Votre projet est enregistré.");
                }
            }

        }
        console.log("RESET APRÈS : ", document.getElementById("container-svg").innerHTML);


    }

    function remove_projet_from_select() {
        if (!select_projet.options[0].selected) {
            console.log(select_projet.value, " a été retiré du select!");
            select_projet.options[select_projet.selectedIndex] = null;
        } else {
            console.log("tu peux po effacer choisir un projet yo");
        }
    }


    function brancher_listener() {

        console.log("entré dans brancher listener");

        svg = document.getElementById("svg");

        svg.addEventListener("drop", drop);
        svg.addEventListener("dragover", dragover);
        svg.addEventListener("onload", makeDraggable);

        let imgs = document.getElementsByTagName("img");

        for (let i of imgs) {
            i.addEventListener("drag", drag);
            //i.addEventListener("dragover", makeDraggable);
        }

        // modifier le libelle le l'objet
        let libelleTxt = document.getElementById("inputLabel");
        let libelleButton = document.getElementById("libelleButton");

        libelleButton.addEventListener("click", function () {
            let y = elementCourant.nextSibling.childNodes[0]
            elementCourant.nextSibling.removeChild(y);
            let textNode = document.createTextNode(libelleTxt.value);
            elementCourant.nextSibling.appendChild(textNode);
        });

    }


});

