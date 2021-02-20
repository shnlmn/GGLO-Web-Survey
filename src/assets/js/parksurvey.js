import { fabric } from "fabric";
import { scaleObj } from "./setScale.js";
console.log(scaleObj(1000, 30));
const pieces = require("../data/pieces.json");

export function canvasApp() {
  //Set up the canvas, set its size based on container div
  console.log("IN CANVASAPP");
  var theCanvas = new fabric.Canvas("canvas");
  var container = document.getElementById("canvas_wrapper");
  theCanvas.setHeight(container.clientHeight);
  theCanvas.setWidth(container.clientWidth);
  // theCanvas.on("object:moving", function(options) {
  //   options.target.set({
  //     // preserveObjectStacking: true,
  //     left: Math.round(options.target.left / gridSpace) * gridSpace,
  //     top: Math.round(options.target.top / gridSpace) * gridSpace,
  //   });
  // });

  var canvasWidth = 2000;
  var canvasHeight = 2000;
  var sidebar = 200;
  const spacing = 20;
  let gridGroup = new fabric.Group([]);
  // SET UP BACKGROUND MAP
  var background = "img/siteplan_rot.jpg";
  let backgroundImgWidth = null;
  fabric.Image.fromURL(background, function(Img) {
    // Create resize var which controls aspect ratio
    resize = scaleAR(
      Img.width,
      Img.height,
      theCanvas.width - sidebar,
      theCanvas.height
    );
    Img.set({ left: sidebar }).scale(resize[2]); //position background image
    Img.selectable = false;
    Img.hoverCursor = "auto";
    theCanvas.setBackgroundImage(Img, theCanvas.renderAll.bind(theCanvas));
    backgroundImgWidth = Img.width/resize[2];
    drawGrid(spacing);
    drawObjs();
  });

  var resize;
  // var gridSpace = 14;
  console.log(backgroundImgWidth);
  var rotateIcon = "img/Rotate_right_arrow.png";
  var img = document.createElement("img");
  img.src = rotateIcon;


  const hideControls = {
    bl: false,
    br: false,
    tl: false,
    tr: false,
    mt: false,
    mb: false,
    mtr: false,
  };

  // SET UP CUSTOM CONTROLLERS FOR fabricjs OBJECTS
  fabric.Object.prototype.controls.rotateCWControl = new fabric.Control({
    x: 0,
    y: -0.5,
    // offsetY: 16,
    cursorStyle: "pointer",
    mouseUpHandler: rotateCW,
    render: renderIcon,
    cornerSize: 24,
  });

  // FUNCTIONS

  function drawGrid(spacing) {
    var gridSpace = scaleObj(backgroundImgWidth, spacing);
    const gridParams = {
      fill: "none",
      stroke: "white",
      strokeWidth: 0.2,
      selectable: false,
      evented: false,
    };
    for (var i = 0; i < Math.ceil(canvasWidth / gridSpace); i++) {
      const line = new fabric.Line(
        [i * gridSpace, 0, i * gridSpace, canvasHeight],
        gridParams
      );
      gridGroup = new fabric.Group([gridGroup, line]);
    }
    for (var j = 0; j < Math.ceil(canvasHeight / gridSpace); j++) {
      const line = new fabric.Line(
        [0, j * gridSpace, canvasWidth, j * gridSpace],
        gridParams
      );
      gridGroup = new fabric.Group([gridGroup, line]);
    }
    gridGroup.set({
      selectable: false,
      evented: false,
    });
    theCanvas.add(gridGroup);
  }

  function scaleAR(srcW, srcH, destW, destH) {
    var returnx = 0;
    var returny = 0;
    var scale = 0;
    var srcAR = srcW / srcH;
    var destAR = destW / destH;
    if (destAR > srcAR) {
      scale = destH / srcH;
      returnx = srcW * scale;
      returny = destH;
    } else {
      scale = destW / srcW;
      returnx = destW;
      returny = srcH * scale;
    }
    return [returnx, returny, scale];
  }

  // DRAW PIECES

  function drawObjs() {
    // FIRST BUILDING ELEMENTS

    let menuHeight = 0; // running tally of piece positions for sidebar

    // CREATE RECT PIECES
    function numberArray(a,b){
 b=[];while(a--)b[a]=a+1;return b
}
   function fy(a,b,c,d){c=a.length;while(c)b=Math.random()*(--c+1)|0,d=a[c],a[c]=a[b],a[b]=d} 
   const a = numberArray(pieces.length)
   const test = fy(a);
   console.log(a);
   console.log(test);
    for (var ind in a) {
      const el = pieces[ind];
      console.log("IND", ind);
      const bldgRect = new fabric.Rect({
        width: scaleObj(backgroundImgWidth, el.length),
        height: scaleObj(backgroundImgWidth, el.width),
        scaleX: 1,
        rx: el.cornerRad,
        ry: el.cornerRad,
        fill: el.color,
        strokeColor: "white",
        centeredRotation: true,
      });

      bldgRect.label = el.name;
      const bldgGroup = addLabel(bldgRect);
      bldgGroup.set({
        left: 30,
        top: menuHeight,
      });

      bldgGroup.my = { type: "program" };
      bldgGroup.setControlsVisibility({
        ...hideControls,
        ...{ ml: false, mr: false },
      });

      theCanvas.add(bldgGroup);
      draggable(bldgGroup);

      menuHeight += bldgRect.height + 15;
    }

    // ADD LINEAR ELEMENTS

    //   for (let obj = 0; obj < Object.entries(lineObj).length; obj++) {
    //     const el = Object.entries(lineObj)[obj];
    //     const lineRect = new fabric.Rect({
    //       width: gridSpace,
    //       height: gridSpace,
    //       scaleY: el[1][0][0] / gridSpace,
    //       scaleX: el[1][0][1] / gridSpace,
    //       fill: el[1][1],
    //       strokeWidth: 0,
    //       centeredRotation: true,
    //       left: 30,
    //       top: menuHeight,
    //       label: el[0],
    //     });
    //     menuHeight += lineRect.height * lineRect.scaleY + 15;
    //     lineRect.label = el[[0]];
    //     const lineGroup = addLabel(lineRect);
    //     lineGroup.my = { type: "pathway" };
    //     lineGroup.setControlsVisibility({
    //       ...hideControls,
    //     });
    //     lineGroup.on("scaling", function() {
    //       const functScale = Math.round(this.width / gridSpace);
    //       this.scaleX =
    //         Math.round(this.getScaledWidth() / gridSpace) / functScale;
    //     });
    //     theCanvas.add(lineGroup);
    //     draggable(lineGroup);
    //   }
  }

  // CONTROL FUNCTIONS
  function rotateCW(eventData, transform) {
    const target = transform.target;
    const canvas = target.canvas;
    if (target.angle == 0) {
      target.rotate(90);
    } else {
      target.rotate(0);
    }

    canvas.requestRenderAll();
  }

  function renderIcon(ctx, left, top) {
    var size = this.cornerSize;
    ctx.save();
    ctx.translate(left, top);
    // ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(img, -size / 2, -size / 2, size, size);
    ctx.restore();
  }

  // SELECTION CONTROL - PREVENT MASS SELECTIONS OF MENU ITEMS
  theCanvas.selection = false;

  // DELETE OBJECTS BY DRAGGING THEM BACK OVER THE SIDEBAR
  theCanvas.on("mouse:up", (e) => {
    if (e.pointer.x < sidebar) {
      theCanvas.discardActiveObject();
    }
  });

  // DRAG TO CLONE FUNCTION -= Thanks to https://stackoverflow.com/questions/28183763/fabric-js-copy-paste-object-on-mouse-down
  function draggable(object) {
    let clicked = false;
    object.on("mousedown", function() {
      this.clone(function(clone) {
        clone.set({
          //   hasControls: false,
          hasBorders: false,
        });
        clone.my = { type: object.my.type };
        clone.label = object.label;
        // if (clone.my.type == "program") {
        //   clone.setControlsVisibility({
        //     ...hideControls,
        //     ...{ ml: false, mr: false },
        //   });
        // } else {
        //   clone.on("scaling", function() {
        //     console.log(clone._objects[1]);
        //     clone._objects[1].set({
        //       scaleX: 1 / clone.scaleX,
        //     });
        //     theCanvas.requestRenderAll();
        //     const functScale = Math.round(this.width / gridSpace);
        //     this.scaleX =
        //       Math.round(this.getScaledWidth() / gridSpace) / functScale;
        //   });
        //   clone.setControlsVisibility({
        //     ...hideControls,
        //   });
        // }
        theCanvas.add(clone);
        draggable(clone);
        clicked = true;
      });
    });
    object.on("mouseup", function() {
      if (clicked) {
        this.off("mousedown");
        if (this.left < sidebar) {
          theCanvas.remove(this);
        }
      }
      theCanvas.bringToFront(gridGroup);
      theCanvas.getObjects().forEach(function(target) {
        if (target.my) {
          target._objects[1].set({
            scaleX: 1 / target.scaleX,
          });
        }
      });
    });
  }

  function addLabel(object) {
    const lineText = new fabric.Text(object.label, {
      fontFamily: "arial",
      fontSize: 10,
      fill: "white",
      selectable: false,
    });
    console.log(lineText);
    lineText.set({
      left:
        object.left + (object.width * object.scaleX) / 2 - lineText.width / 2,
      top:
        object.top + (object.height * object.scaleY) / 2 - lineText.height / 2,
    });
    return new fabric.Group([object, lineText]);
  }
}
