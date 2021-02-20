import { fabric } from "fabric";
import { toolTipPopup } from "./toolTip.js";
import { scaleObj } from "./setScale.js";
const pieces = require("../data/pieces.json");

export function canvasApp() {
  //Set up the canvas, set its size based on container div
  var theCanvas = new fabric.Canvas("canvas");
  var container = document.getElementById("canvas_wrapper");
  theCanvas.setHeight(container.clientHeight);
  theCanvas.setWidth(container.clientWidth);
  theCanvas.on("object:moving", function(options) {
    options.target.set({
      // preserveObjectStacking: true,
      left: Math.round(options.target.left / gridSpace) * gridSpace,
      top: Math.round(options.target.top / gridSpace) * gridSpace,
    });
  });

  var canvasWidth = 2000;
  var canvasHeight = 2000;
  var sidebar = 200;
  let gridSpace = 0;
  const spacing = 20;
  let allPieces = [];
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
    backgroundImgWidth = Img.width / resize[2];
    drawObjs();
    drawGrid(spacing);
  });

  var resize;
  // var gridSpace = 14;
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
    gridSpace = scaleObj(backgroundImgWidth, spacing);
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

    // let menuHeight = 0; // running tally of piece positions for sidebar

    // CREATE RECT PIECES
    function numberArray(a, b) {
      b = [];
      while (a--) b[a] = a + 1;
      return b;
    }
    const a = numberArray(pieces.length);
    for (var ind in a) {
      const el = pieces[ind];
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

      bldgRect.name = el.name;
      const bldgGroup = addLabel(bldgRect);

      bldgGroup.my = { type: "program" };
      bldgGroup.name = el.name;
      bldgGroup.shapeType = el.shape;
      setControls(bldgGroup);

      theCanvas.add(bldgGroup);
      draggable(bldgGroup);
      allPieces.push(bldgGroup);

      // menuHeight += bldgRect.height + 15;
    }

    // PLACE PIECES IN SIDEBAR
    // let rowIndex = 0;
    let maxHeight = 0;
    let totalHeight = 0;
    let rowWidth = 0;
    let pieceMargin = 5;
    let tempRow = [];
    let pieceRows = [];

    for (var t = 0; t < allPieces.length; t++) {
      const onePiece = allPieces[t];
      // set rowWidth and maxHeight

      if (rowWidth + onePiece.width < sidebar) {
        rowWidth += onePiece.item(0).width + pieceMargin;
        if (onePiece.height > maxHeight) {
          maxHeight = onePiece.item(0).height + pieceMargin;
        }
        tempRow.push(onePiece);
      } else {
        pieceRows.push([tempRow, maxHeight, rowWidth]);
        tempRow = [];
        rowWidth = 0;
        maxHeight = 0;
        tempRow.push(onePiece);
        rowWidth += onePiece.item(0).width + pieceMargin;
        maxHeight = onePiece.item(0).height + pieceMargin;
      }
    }
    pieceRows.push([tempRow, maxHeight, rowWidth]);

    pieceRows.forEach((rows) => {
      let tempWidth = (sidebar - rows[2]) / 2;
      maxHeight = rows[1];
      rows[0].forEach((item) => {
        item.set({
          top: totalHeight + (maxHeight / 2 - item.getCenterPoint().y),
          // left: 100,
          left: tempWidth,
        });
        item.setCoords(); //<-- super important
        tempWidth += item.width + pieceMargin;
      });
      totalHeight += rows[1] + pieceMargin;
    });

    theCanvas.renderAll();
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

  function getAllActive() {
    let activeObjs = {};
    theCanvas.getObjects().forEach(function(targ) {
      if (targ.active) {
        console.log(targ);
        activeObjs = { ...activeObjs, targ };
      }
    });
    return activeObjs;
  }

  // set control limits by type
  function setControls(object) {
    if (object.shapeType !== "Line") {
      object.setControlsVisibility({
        ...hideControls,
        ...{ ml: false, mr: false },
      });
    } else {
      object.on("scaling", function() {
        object._objects[1].set({
          scaleX: 1 / object.scaleX,
        });
        theCanvas.requestRenderAll();
        const functScale = Math.round(this.width / gridSpace);
        this.scaleX =
          Math.round(this.getScaledWidth() / gridSpace) / functScale;
      });
      object.setControlsVisibility({
        ...hideControls,
      });
    }
  }

  // DRAG TO CLONE FUNCTION -= Thanks to https://stackoverflow.com/questions/28183763/fabric-js-copy-paste-object-on-mouse-down
  function draggable(object) {
    let clicked = false;
    object.on("mousedown", function() {
      object.active = true;
      this.clone(function(clone) {
        clone.shapeType = object.shapeType;
        clone.name = object.name;
        setControls(clone);
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
    console.log(getAllActive());
  }

  function addLabel(object) {
    const lineText = new fabric.Text(object.name[0], {
      fontFamily: "arial",
      fontSize: 10,
      fill: "black",
      selectable: false,
    });
    lineText.set({
      left:
        object.left + (object.width * object.scaleX) / 2 - lineText.width / 2,
      top:
        object.top + (object.height * object.scaleY) / 2 - lineText.height / 2,
    });
    return new fabric.Group([object, lineText]);
  }
  // console.log(toolTipPopup);
  let tipText = null;
  theCanvas.on("mouse:over", function(e) {
    tipText = toolTipPopup(e);
    if (tipText) {
      theCanvas.add(tipText);
    }
    console.log(toolTipPopup(e));
  });
  theCanvas.on("mouse:down", function(e) {
      console.log("DRAGGING");
    if (tipText && e.target) {
      e.target.removeWithUpdate(tipText);
      theCanvas.remove(tipText);
      theCanvas.renderAll();
      e.target.setCoords();
      console.log("DRAGGING");
      // e.target.addWithUpdate(tipText);
    }
  });
  theCanvas.on("mouse:out", function(e) {
    if (tipText && e.target) {
      e.target.removeWithUpdate(tipText);
      theCanvas.remove(tipText);
      theCanvas.renderAll();
      e.target.setCoords();
    }
  });
}
