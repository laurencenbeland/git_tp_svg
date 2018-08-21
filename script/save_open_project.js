"use strict";



document.addEventListener("DOMContentLoaded", function () {

    let select_projet = document.getElementById("select_projet");
    let options = document.getElementsByTagName("option");

    let btn_open = document.getElementById("btn_open");
    let btn_save = document.getElementById("btn_save");
    let btn_remove = document.getElementById("btn_remove");

    // initialiser la liste des projets sauvegardés dès l'ouverture de la page
    init_options();

    // INIT select list
    function init_options(){
        for(let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            //let value = localStorage[key];
            //console.log(key);
            let opt = document.createElement("option");
            opt.value = key;
            opt.innerHTML = key;
            select_projet.appendChild(opt);
            //if(value.equals(desired_value))
            //    console.log(key + " => " + value);
        }
    }

    // SAVE PLAN
    btn_save.addEventListener("click", function(evt) {

        let input = document.getElementById("input_nom_projet");
        let select_projet = document.getElementById("select_projet");

        console.log("select selected : ", select_projet.selected.value);

        if(localStorage.getItem(input.value) !== null && input.value === "" && input.value === select_projet.selected) {

            let new_svg = document.getElementById("svg_div").innerHTML;
            localStorage.setItem(input.value, new_svg)

        } else {

            let input_nom_projet = input.value;
            console.log ("nom projet : ", input_nom_projet);

            let opt = document.createElement("option");

            opt.value = input_nom_projet;
            opt.textContent = input_nom_projet;

            let svg = document.getElementById("svg_div").innerHTML;
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
    });

    btn_open.addEventListener("click", function(evt){


        for(let i = 1; i < options.length; i++){
            if(options[i].selected){
                let key = options[i].value;
                console.log("ouvrir plan clické", key);
                //console.log("options[o] : ", options[i]);
                console.log("key :", key);
                let value = localStorage.getItem(key);

                document.getElementById("svg_div").innerHTML = value;
                console.log("value : ", value);

            }
        }
    });

    btn_remove.addEventListener("click", function(evt){

        for(let i = 1; i < options.length; i++) {
            if(options[i].selected) {
                let key = options[i].value;
                localStorage.removeItem(key);
            }
        }
        remove_projet_from_select();

    });

});

function remove_projet_from_select(){
    let select_projet = document.getElementById("select_projet");
    if(select_projet.options[0]){
        select_projet.options[select_projet.selectedIndex] = null ;
    }
}

