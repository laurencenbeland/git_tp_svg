"use strict";
let s = Snap("#svgout");


let svg = document.getElementsByTagName("svg")[0];
let circle = document.createElement("circle");


let g = s.g();
let img1 = g.image("images/chair.svg", 100, 100, 100, 100);

g.dblclick(function (evt) {
    let c = g.circle(200, 200, 5);
    g.attr({id: 'toto'});

    Draggable.create("#toto", {
        type: "rotation",
        throwProps: true
    })


    g.click(function () {
        rotation[0].disable();
        c.remove();
    });
});


