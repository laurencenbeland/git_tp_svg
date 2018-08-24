"use strict";

document.addEventListener("DOMContentLoaded", function () {

    let select_projet = document.getElementById("select_projet");
    let btn_nouveau_projet = document.getElementById("btn_nouveau_projet");
    let btn_save = document.getElementById("btn_save");
    let btn_remove = document.getElementById("btn_remove");
    let btn_reset = document.getElementById("btn_reset");
    let label_menu = document.getElementById("nom_projet_en_cours");

    // Initialisation de la select list
    function init_options() {
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let opt = document.createElement("option");
            opt.value = key;
            opt.innerHTML = key;
            select_projet.appendChild(opt)
        }
    }

    // initialiser la liste des projets sauvegardés dès l'ouverture de la page
    init_options();
    dernier_projet_saved();
    startup();

    // Création nouveau plan
    btn_nouveau_projet.addEventListener("click", function (evt) {
        creer_nouveau_projet();
    });

    // Sauvegarde du plan
    btn_save.addEventListener("click", function (evt) {
        save_project();
    });

    // Ouvrir un autre projet
    select_projet.addEventListener("change", function (evt) {
        let select_value = select_projet.value;
        let key = select_value;
        label_menu.innerHTML = key;
        let value = localStorage.getItem(key);
        document.getElementById("container-svg").innerHTML = value;
        brancher_listener();
    });

    // Supprimer un projet de la liste
    btn_remove.addEventListener("click", function (evt) {
        let key = select_projet.value;
        if(key !== null) {
            localStorage.removeItem(key);
            remove_projet_from_select();
        }
    });

    // Réinitialiser le plan actuel
    btn_reset.addEventListener("click", function (evt) {
        let container_svg = document.getElementById("container-svg");
        container_svg.innerHTML = '<svg id="svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ondrop="drop(event)" ondragover="dragover(event)" onload="makeDraggable(event)"><image id="bgImg" xlink:href="" style="width: 100%; height: 100%"/></svg>'
        svg.style.backgroundColor = "#FFFFFF";
        brancher_listener();
    });

    // Enregistrer le projet dans le localstorage
    function save_project() {
        console.log("btn save clické");
        let select_value = select_projet.value;
            if (localStorage.getItem(select_value) !== null) {
                let new_svg = document.getElementById("container-svg").innerHTML;
                localStorage.setItem(select_value, new_svg);
                return true;
            } else {
                let nom_nouveau_projet_entame = prompt('Nom du nouveau projet');
                if(nom_nouveau_projet_entame === null || nom_nouveau_projet_entame == ""){
                    alert('Entrez un nom pour votre nouveau projet.');
                    return false;
                } else if (nom_nouveau_projet_entame != null) {
                    // enregistrer le nouveau svg entamé
                    let current_svg = document.getElementById("container-svg").innerHTML;
                    // ajouter au storage
                    localStorage.setItem(nom_nouveau_projet_entame, current_svg);
                    // ajouter à la liste de select
                    let opt = document.createElement("option");
                    opt.value = nom_nouveau_projet_entame;
                    opt.textContent = nom_nouveau_projet_entame;
                    select_projet.add(opt, select_projet.options[select_projet.options.length + 1]);
                    select_projet.value = nom_nouveau_projet_entame;
                    label_menu.innerHTML = nom_nouveau_projet_entame;
                    return true;
                }
            }
    }

    // Retirer un projet de la liste select
    function remove_projet_from_select() {
        if (!select_projet.options[0].selected) {
            console.log(select_projet.value, " a été retiré du select!");
            select_projet.options[select_projet.selectedIndex] = null;
            dernier_projet_saved();
        }
    }

    // Créer nouveau projet
    function creer_nouveau_projet(){
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
    }

    // Rebrancher les listeners après la sauvegarde des informations
    function brancher_listener() {
        svg = document.getElementById("svg");
        svg.addEventListener("click", makeDraggable);
        // récupéré img draggable
        let imgs = document.getElementsByClassName("draggable");
        for (let i of imgs) {
            i.addEventListener("drag", drag);
            i.addEventListener("click", setElementCourant);
            i.addEventListener("dragstart", drag);
            //i.addEventListener("click", makeDraggable);
            i.previousSibling.addEventListener("click", supprimerElement);
        }
    }

    // Aller chercher le dernier projet/plan créé
    function dernier_projet_saved(){
        let cpt = 0;
        for (let i = 0; i < localStorage.length; i++) {
            if(localStorage.length <= 0){
                creer_nouveau_projet();
            }

            if (cpt === localStorage.length-1) {
                let last_key = localStorage.key(i);
                console.log("last element: ", last_key);
                let last_value = localStorage.getItem(last_key);
                select_projet.value = last_key;
                label_menu.innerHTML = last_key;
                document.getElementById("container-svg").innerHTML = last_value;
                brancher_listener();
                return true;
            }
            cpt++;
        }
    }

    // Enregistrer à chaque seconde
    if(localStorage.getItem(select_projet.value) !== null || select_projet[0]){
        setInterval(save_project, 1000);
        console.log("saved!");
    }


});

