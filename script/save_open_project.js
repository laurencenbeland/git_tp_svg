"use strict";


document.addEventListener("DOMContentLoaded", function () {


    let select_projet = document.getElementById("select_projet");

    let btn_nouveau_projet = document.getElementById("btn_nouveau_projet");
    let btn_save = document.getElementById("btn_save");
    let btn_remove = document.getElementById("btn_remove");
    let btn_reset = document.getElementById("btn_reset");

    let label_menu = document.getElementById("nom_projet_en_cours");

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
            container_svg.innerHTML = '<svg id="svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ondrop="drop(event)" ondragover="dragover(event)" onload="makeDraggable(event)"><image id="bgImg" xlink:href="" style="width: 100%; height: 100%"/></svg>';

            brancher_listener();

            // enregistrer le nouveau svg empty
            let empty_svg = document.getElementById("container-svg").innerHTML;

            // ajouter au storage
            localStorage.setItem(nom_nouveau_projet, empty_svg);

            // ajouter à la liste de select
            let opt = document.createElement("option");
            opt.value = nom_nouveau_projet;
            opt.textContent = nom_nouveau_projet;
            select_projet.add(opt, select_projet.options[select_projet.options.length + 1]);
            select_projet.value = nom_nouveau_projet;
            alert("Votre nouveau projet a été créé et enregistré.");

            label_menu.innerHTML = nom_nouveau_projet;

            return true;
        }
    });


    // btn modifier nom projet (plutot que de créer un novueau projet a partir du input...


    // SAVE PLAN
    btn_save.addEventListener("click", function (evt) {
        save_project();
    });


    // if(localStorage.getItem(select_projet.value) !== null || select_projet[0]){
    //     setInterval(save_project, 1000);
    //     console.log("saved!");
    // }


    // OPEN SELECTED PROJECT
    select_projet.addEventListener("change", function (evt) {
        let select_value = select_projet.value;
        let key = select_value;
        label_menu.innerHTML = key;
        // console.log("key is open :", key);
        // console.log("project " + key + " est ouvert");
        let value = localStorage.getItem(key);
        document.getElementById("container-svg").innerHTML = value;
        brancher_listener();
        // console.log("value : ", value);
    });

    btn_remove.addEventListener("click", function (evt) {
        let key = select_projet.value;
        localStorage.removeItem(key);
        remove_projet_from_select();
    });


    btn_reset.addEventListener("click", function (evt) {
        console.log("RESET AVANT : ", document.getElementById("container-svg").innerHTML);
        let container_svg = document.getElementById("container-svg");
        container_svg.innerHTML = '<svg id="svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ondrop="drop(event)" ondragover="dragover(event)" onload="makeDraggable(event)"><image id="bgImg" xlink:href="" style="width: 100%; height: 100%"/></svg>'
        svg.style.backgroundColor = "#FFFFFF";
        brancher_listener();
        console.log("RESET APRÈS : ", document.getElementById("container-svg").innerHTML);
    });



    function save_project() {

        console.log("btn save clické");
        console.log("RESET AVANT : ", document.getElementById("container-svg").innerHTML);

        let select_value = select_projet.value;

            if (localStorage.getItem(select_value) !== null) {

                let new_svg = document.getElementById("container-svg").innerHTML;
                localStorage.setItem(select_value, new_svg);

                alert("Votre projet est enregistré.");
                return true;

            } else {

                alert("Ne peut sauvegarder, pas de projet en cours.");
            }

        console.log("RESET APRÈS : ", document.getElementById("container-svg").innerHTML);
    }

    function remove_projet_from_select() {
        if (!select_projet.options[0].selected) {
            console.log(select_projet.value, " a été retiré du select!");
            select_projet.options[select_projet.selectedIndex] = null;
            label_menu.innerHTML = "";
        } else {
            console.log("tu peux po effacer 'seletionner un projet' yo");
        }
    }


    function brancher_listener() {

        console.log("entré dans brancher listener");

        svg = document.getElementById("svg");

        // svg.addEventListener("drop", drop);
        // svg.addEventListener("dragover", dragover);
        svg.addEventListener("click", makeDraggable);
        //svg.addEventListener("mousedown", makeDraggable);

        // récupéré img draggable
        let imgs = document.getElementsByClassName("draggable");

        for (let i of imgs) {
            i.addEventListener("drag", drag);
            i.addEventListener("click", setElementCourant);
            //i.addEventListener("click", makeDraggable);
            i.previousSibling.addEventListener("click", supprimerElement);
        }
    }


});

