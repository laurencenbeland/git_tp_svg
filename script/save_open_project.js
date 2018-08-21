"use strict";



document.addEventListener("DOMContentLoaded", function () {

    let select_projet = document.getElementById("select_projet");
    let btn_open = document.getElementById("btn_open");

    let input_nom_projet = document.getElementById("input_nom_projet");
    let btn_save = document.getElementById("btn_save");

    let btn_remove = document.getElementById("btn_remove");

    let list_saved_project;

    // INIT select list
    function init(){

        for(let p of localStorage){
           // https://stackoverflow.com/questions/3138564/looping-through-localstorage-in-html5-and-javascript
        }

    }


    // SAVE PLAN
    btn_save.addEventListener("click", function (evt, input_nom_projet) {

        // effacer tous les projets de la liste

        let input = document.getElementById("input_nom_projet");
        input_nom_projet = input.value;
        console.log ("nom projet : ", input_nom_projet);


        // localStorage Key, Value
        localStorage.setItem("input_nom_projet", "value");

        // pour le select, ajouter tous les projets

    });


    btn_open.addEventListener("click", function(evt, selected_project){

        //let projet = localStorage.getItem("selected_project");

    });

    btn_remove.addEventListener("click", function(evt, selected_project){
        localStorage.removeItem("selected_project");
    });

});