let canvas = document.querySelector("#canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 60;

window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 60;

    drawfromdb();
});

// canvas drawing gets erased on window resize ???

// a context object which provides fun for 2d drawing
let ctx = canvas.getContext("2d");

let linesDb = [];

let line = [];

let mousedown = false;
canvas.addEventListener("mousedown", function(e) {
    if (penciloption.classList.contains("hide") == false) {
        penciloption.classList.add("hide");
    } else if (eraseroption.classList.contains("hide") == false) {
        eraseroption.classList.add("hide");
    }
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY - 60);
    mousedown = true;
    let pointObject = {
        x: e.clientX,
        y: e.clientY - 60,
        event: "md",
        linewidth: ctx.lineWidth,
        linecolor: ctx.strokeStyle
    }

    line.push(pointObject);
})

canvas.addEventListener("mousemove", function(e) {
    if (mousedown) {
        ctx.lineTo(e.clientX, e.clientY - 60);
        ctx.stroke();
        let pointObject = {
            x: e.clientX,
            y: e.clientY - 60,
            event: "mm"
        }
        line.push(pointObject);

    }
})

canvas.addEventListener("mouseup", function(e) {
    mousedown = false;
    linesDb.push(line);
    line = [];
    redolineDB = [];
})