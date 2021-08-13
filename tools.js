let undoLine = document.querySelector("#undo");
let redoLine = document.querySelector("#redo");
let addsticky = document.querySelector("#sticky");
let download = document.querySelector("#download");

undoLine.addEventListener("click", udline);
redoLine.addEventListener("click", rdline);
addsticky.addEventListener("click", function() {
    addStky();
});

let redolineDB = [];

function udline() {
    redolineDB.push(linesDb.pop());
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawfromdb();

}

function drawfromdb() {
    let actuallw = ctx.lineWidth;
    let actuallc = ctx.strokeStyle;

    for (let i = 0; i < linesDb.length; i++) {
        let lineobj = linesDb[i];
        for (let j = 0; j < lineobj.length; j++) {
            let ptobj = lineobj[j];
            if (ptobj.event == "md") {
                ctx.lineWidth = ptobj.linewidth;
                ctx.strokeStyle = ptobj.linecolor;
                ctx.beginPath();
                ctx.moveTo(ptobj.x, ptobj.y);
            } else {
                ctx.lineTo(ptobj.x, ptobj.y);
                ctx.stroke();
            }
        }
    }
    ctx.lineWidth = actuallw;
    ctx.strokeStyle = actuallc;
}

function rdline() {

    if (redolineDB.length > 0) {
        actuallw = ctx.lineWidth;
        actuallc = ctx.strokeStyle;
        linesDb.push(redolineDB.pop());
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawfromdb();
        ctx.lineWidth = actuallw;
        ctx.strokeStyle = actuallc;
    }
}

function addStky(imgFile) {
    let stickydiv = document.createElement("div");
    stickydiv.classList.add("sticky-note");
    stickydiv.innerHTML = `<div class="sticky-header">
              <div class="sticky-min"><i class="fas fa-compress-alt"></i></div>
              <div class="sticky-close"><i class="fas fa-times"></i></div>
          </div>
          <div class="sticky-content" contenteditable="true"></div>`
    let stkyclose = stickydiv.querySelector(".sticky-close");
    stkyclose.addEventListener("click", function() {
        stickydiv.remove();
    })
    let stkycont = stickydiv.querySelector(".sticky-content");
    let stkymin = stickydiv.querySelector(".sticky-min");
    stkymin.addEventListener("click", function(e) {
        stkycont.style.display == "none" ? stkycont.style.display = "block" : stkycont.style.display = "none";
    })

    if (imgFile) {
        stkycont.append(imgFile);
        stkycont.setAttribute("contenteditable", "false");
    }
    let stickyHeader = stickydiv.querySelector(".sticky-header");
    let stickyHold = false;
    let initialX;
    let initialY;
    stickyHeader.addEventListener("mousedown", function(e) {
        stickyHold = true;
        initialX = e.clientX;
        initialY = e.clientY;
    });

    stickyHeader.addEventListener("mousemove", function(e) {
        if (stickyHold) {
            let finalX = e.clientX;
            let finalY = e.clientY;

            let dx = finalX - initialX;
            let dy = finalY - initialY;

            let { top, left } = stickydiv.getBoundingClientRect();

            stickydiv.style.top = top + dy + "px";
            stickydiv.style.left = left + dx + "px";

            initialX = finalX;
            initialY = finalY;
        }
    });

    stickyHeader.addEventListener("mouseup", function(e) {
        stickyHold = false;
    });

    document.body.append(stickydiv);

}

let imageupload = document.querySelector("#image");
let uploadbut = document.querySelector("#image-upload");

imageupload.addEventListener("click", function() {
    uploadbut.click();
})

uploadbut.addEventListener("change", function(e) {
    let imagepath = URL.createObjectURL(e.target.files[0]);
    let img = document.createElement("img");
    img.setAttribute("src", imagepath);
    img.classList.add("sticky-image");
    addStky(img);

})

download.addEventListener("click", function() {
    let downimg = canvas.toDataURL("image/jpg");
    let atag = document.createElement("a");
    atag.classList.add("canvas-download");
    atag.setAttribute("href", downimg);
    atag.download = "canvas.jpg";
    atag.click();
})

let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
let penciloption = document.querySelector(".pencil-options");
let eraseroption = document.querySelector(".eraser-option");

let glopensize = ctx.lineWidth;
let glopencolor = ctx.strokeStyle;

let gloerasersize = "2";
let gloerasercolor = "white";

pencil.addEventListener("click", function() {

    if (pencil.classList.contains("active")) {
        if (penciloption.classList.contains("hide")) {
            penciloption.classList.remove("hide");
        } else {
            penciloption.classList.add("hide");
        }
    } else {
        ctx.strokeStyle = glopencolor;
        ctx.lineWidth = glopensize;
        eraser.classList.add("fade");
        eraseroption.classList.add("hide");
        eraser.classList.remove("active")

        pencil.classList.remove("fade");
        // penciloption.classList.remove("hide");
        pencil.classList.add("active");
    }

})

eraser.addEventListener("click", function() {
    if (eraser.classList.contains("active")) { 
        if (eraseroption.classList.contains("hide")) {
            eraseroption.classList.remove("hide");
        } else {
            eraseroption.classList.add("hide");
        }

    } else {
        ctx.lineWidth = gloerasersize;
        ctx.strokeStyle = gloerasercolor;
        pencil.classList.add("fade");
        penciloption.classList.add("hide");
        pencil.classList.remove("active");

        eraser.classList.remove("fade");
        // eraseroption.classList.remove("hide");
        eraser.classList.add("active")
        ctx.strokeStyle = "white";

    }

})

let pencilsize = document.querySelector(".pencil-size");
let pencilcolor = document.querySelectorAll(".pencil-colors");

pencilsize.addEventListener("change", function() {
    let currpencilsize = pencilsize.value;
    ctx.lineWidth = currpencilsize;
    glopensize = currpencilsize;
})

for (let i = 0; i < pencilcolor.length; i++) {
    pencilcolor[i].addEventListener("click", function(e) {
        let currpencolor = e.target.className;
        ctx.strokeStyle = currpencolor;
        glopencolor = currpencolor;
    })
}

let erasersize = document.querySelector(".eraser-size");

erasersize.addEventListener("change",function(e){
      ctx.lineWidth = erasersize.value;
      gloerasersize = erasersize.value;
})