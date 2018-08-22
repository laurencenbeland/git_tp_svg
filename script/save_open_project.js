"use strict";

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// appliquer une fonction init pour les listeners sur les objets
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

document.addEventListener("DOMContentLoaded", function () {


    let select_projet = document.getElementById("select_projet");

    let btn_nouveau_projet = document.getElementById("btn_nouveau_projet");
    // let btn_open = document.getElementById("btn_open");
    let btn_save = document.getElementById("btn_save");
    let btn_remove = document.getElementById("btn_remove");
    let btn_reset = document.getElementById("btn_reset");

    let input = document.getElementById("input_nom_projet");
    let input_nom_projet = " ";

    // INIT select list
    function init_options(){

        // Liste des projets (select)
        for(let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            //let value = localStorage[key];
            //console.log(key);
            let opt = document.createElement("option");
            opt.value = key;
            opt.innerHTML = key;
            select_projet.appendChild(opt);
        }

    }

    // initialiser la liste des projets sauvegardés dès l'ouverture de la page
    init_options();

    // NOUVEAU PLAN
    btn_nouveau_projet.addEventListener("click", function(evt){

        let container_svg = document.getElementById("container-svg");
        container_svg.innerHTML = '<svg viewBox="0 0 150 150" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" id="svg"><image id="bgImg" xlink:href="" style="width: 100%; height: 100%"/></svg>';

        // fond blanc automatique
        let bg = document.getElementById("background");
        bg.style.backgroundColor = "#FFFFFF";

    });

    // SAVE PLAN
    btn_save.addEventListener("click", function(evt) {

        console.log("btn save clické");

        let select_value = select_projet.value;
        input_nom_projet = input.value;

        if(input_nom_projet !== ""){

        if(localStorage.getItem(select_value) !== null) {

            let new_svg = document.getElementById("container-svg").innerHTML;
            localStorage.setItem(select_value, new_svg);

        } else {

            let opt = document.createElement("option");

            opt.value = input_nom_projet;
            opt.textContent = input_nom_projet;

            let svg = document.getElementById("container-svg").innerHTML;
            console.log(svg);

            // localStorage Key, Value
            if (input_nom_projet.value === "") {
                alert("Veuillez inscrire un nom de projet.");
            } else {
                localStorage.setItem(input_nom_projet, svg)
                select_projet.add(opt, select_projet.options[select_projet.options.length + 1]);
                alert("Votre projet est enregistré.");
            }
        }

        }

    });


    // OPEN SELECTED PROJECT
    select_projet.addEventListener("change", function(evt){

        let select_value = select_projet.value;
        let key = select_value;
        console.log("key is open :", key);

        console.log("project " + key + " est ouvert");

        let value = localStorage.getItem(key);

        document.getElementById("container-svg").innerHTML = value;
        console.log("value : ", value);

        input.value = " ";

    });

    // btn_open.addEventListener("click", function(evt){
    //     let key = select_projet.value;
    //     console.log("key is open :", key);
    //     let value = localStorage.getItem(key);
    //     document.getElementById("container-svg").innerHTML = value;
    //     console.log("value : ", value);
    //     input.value = " ";
    // });

    btn_remove.addEventListener("click", function(evt){

        let key = select_projet.value;
        localStorage.removeItem(key);

        remove_projet_from_select();

    });

    btn_reset.addEventListener("click", function(evt){

        //console.log("RESET AVANT : ", document.getElementById("container-svg").innerHTML);

        let container_svg = document.getElementById("container-svg");
        container_svg.innerHTML = '<svg viewBox="0 0 150 150" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" id="svg"><image id="bgImg" xlink:href="" style="width: 100%; height: 100%"/></svg>';

        // fond blanc automatique
        let bg = document.getElementById("background");
        bg.style.backgroundColor = "#FFFFFF";

        //console.log("RESET APRÈS : ", document.getElementById("container-svg").innerHTML);



    });

    function save_project(){

        if(localStorage.getItem(select_projet.value) !== null) {

            let new_svg = document.getElementById("container-svg").innerHTML;
            localStorage.setItem(select_projet.value, new_svg);

        } else {

            input_nom_projet = input.value;

            let opt = document.createElement("option");

            opt.value = input_nom_projet;
            opt.textContent = input_nom_projet;

            let svg = document.getElementById("container-svg").innerHTML;
            console.log(svg);

            // localStorage Key, Value
            if (input_nom_projet.value === "") {
                alert("Veuillez inscrire un nom de projet.");
            } else {
                localStorage.setItem(input_nom_projet, svg)
                select_projet.add(opt, select_projet.options[select_projet.options.length + 1]);
                alert("Votre projet est enregistré.");
            }
        }
    }

    function remove_projet_from_select(){
        if(!select_projet.options[0].selected){
            console.log(select_projet.value, " a été retiré du select!");
            select_projet.options[select_projet.selectedIndex] = null ;
        } else {
            console.log("tu peux po effacer choisir un projet yo");
        }
    }


});


