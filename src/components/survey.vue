<template>
  <div>
    <canvas id="canvas"></canvas>
    <div id="clearButtonContainer">
      <v-dialog
        v-model="dialog"
        width="300"
        transition="dialog-bottom-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-on="on" v-bind="attrs">CLEAR</v-btn>
        </template>
        <v-card>
          <v-card-text class="pa-5">
            Are you sure you want to remove all the pieces?
          </v-card-text>
          <v-btn class="ma-5" @click="dialog = false">No</v-btn>
          <v-btn
            class="ma-5"
            @click="
              clear();
              dialog = false;
            "
            >Yes</v-btn
          >
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>


<script>
import pieces from "@/assets/data/pieces.json";
import { fabric } from "fabric";
import { toolTipPopup } from "@/assets/js/toolTip.js";
import { updateTotals } from "@/assets/js/updateTotals.js";
import { scaleObj } from "@/assets/js/setScale.js";
export default {
  data: function () {
    return {
      dialog: false,
      totalDU: 0,

      // APP VARS
      canvas: null,
      canvasWidth: 2000,
      rotateIconSize: 25,
      canvasHeight: 2000,
      sidebar: 200,
      gridSpace: 0,
      spacing: 10,
      allPieces: [],
      gridGroup: null,
      background: "img/siteplan_rot.jpg",
      backgroundImgWidth: 0,
      resize: null,
      rotateIcon: "img/Rotate_right_arrow.png",
      img: null,
      activeObjs: [{}],
      hideControls: {
        bl: false,
        br: false,
        tl: false,
        tr: false,
        mt: false,
        mb: false,
        mtr: false,
      },
    };
  },
  name: "survey",
  surveyApp: null,
  props: {
    msg: String,
  },
  mounted: function () {
    /// ------------------------------------------------------------------
    this.canvas = new fabric.Canvas("canvas", {
      // backgroundColor: "red",
    });
    this.canvas.selection = false;


    let container = document.getElementById("canvas_wrapper");
    this.canvas.setHeight(container.clientHeight);
    this.canvas.setWidth(container.clientWidth);
    this.canvas.on("object:moving", function (options) {
      options.target.set({
        // preserveObjectStacking: true,
        left: Math.round(options.target.left / that.gridSpace) * that.gridSpace,
        top: Math.round(options.target.top / that.gridSpace) * that.gridSpace,
      });
    });
    // const bkgImg = new Image();
    // const bkgImg = {width: 100, height: 100}

    var that = this;
    this.bkg = fabric.Image.fromURL(this.background, function (Img) {
      that.resize = that.scaleAR(
        Img.width,
        Img.height,
        that.canvas.width - that.sidebar,
        that.canvas.height
      );
      // Create resize var which controls aspect ratio
    fabric.Object.prototype.controls.rotateCWControl = new fabric.Control({
      x: 0,
      y: -0.5,
      // offsetY: 16,
      cursorStyle: "pointer",
      mouseUpHandler: that.rotateCW,
      render: that.renderIcon,
      cornerSize: 24,
    });
      Img.set({ left: that.sidebar }).scale(that.resize[2]); //position background image
      Img.selectable = false;
      Img.hoverCursor = "auto";
      that.canvas.setBackgroundImage(
        Img,
        that.canvas.renderAll.bind(that.canvas)
      );
      that.backgroundImgWidth = Img.width / that.resize[2];
      that.drawObjs();
      that.drawGrid(that.spacing);
      that.canvas.renderAll();
    });

    let tipText = null;
    this.canvas.on("mouse:over", function (e) {
      tipText = toolTipPopup(e);
      if (tipText) {
        that.canvas.add(tipText);
      }
    });
    this.canvas.on("mouse:down", function (e) {
      if (tipText && e.target) {
        // e.target.removeWithUpdate(tipText);
        that.canvas.remove(tipText);
        that.canvas.renderAll();
        // e.target.setCoords();
        // e.target.addWithUpdate(tipText);
      }
    });
    this.canvas.on("mouse:out", function (e) {
      if (tipText && e.target) {
        // e.target.removeWithUpdate(tipText);
        that.canvas.remove(tipText);
        that.canvas.renderAll();
        // e.target.setCoords();
      }
    });

    this.$root.$on("submit", (e) => {
      console.log(this.submit());
      console.log(e);
    });
    this.canvas.renderAll();
    this.img = document.createElement("img");
    this.img.src = this.rotateIcon;
    /// ------------------------------------------------------------------
  },
  methods: {
    /////////////////////////////////////////////////
    drawGrid(spacing) {
      this.gridSpace = scaleObj(this.backgroundImgWidth, spacing);

      let gridGroup = new fabric.Group([]);

      const gridParams = {
        fill: "none",
        stroke: "white",
        strokeWidth: 0.2,
        selectable: false,
        evented: false,
      };
      for (var i = 0; i < Math.ceil(this.canvasWidth / this.gridSpace); i++) {
        const line = new fabric.Line(
          [i * this.gridSpace, 0, i * this.gridSpace, this.canvasHeight],
          gridParams
        );
        gridGroup = new fabric.Group([gridGroup, line]);
      }
      for (var j = 0; j < Math.ceil(this.canvasHeight / this.gridSpace); j++) {
        const line = new fabric.Line(
          [0, j * this.gridSpace, this.canvasWidth, j * this.gridSpace],
          gridParams
        );
        gridGroup = new fabric.Group([gridGroup, line]);
      }
      gridGroup.set({
        selectable: false,
        evented: false,
      });
      let that = this;
      this.canvas.on("mouse:move", function(){
        that.canvas.bringToFront(gridGroup);
      })
      this.canvas.add(gridGroup);
    },

    scaleAR(srcW, srcH, destW, destH) {
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
    },
    drawObjs() {
      // FIRST BUILDING ELEMENTS

      // let menuHeight = 0; // running tally of piece positions for sidebar

      // CREATE RECT PIECE
      let that = this;

      for (let ind = 0; ind < pieces.length; ind++) {
        const el = pieces[ind];
        const bldgRect = new fabric.Rect({
          width: scaleObj(that.backgroundImgWidth, el.length),
          height: scaleObj(that.backgroundImgWidth, el.width),
          scaleX: 1,
          rx: el.cornerRad,
          ry: el.cornerRad,
          fill: el.color,
          strokeColor: "white",
          centeredRotation: true,
        });
        bldgRect.name = el.name;
        el.bldgArea = el.width * el.length;
        let bldgGroup = this.addLabel(bldgRect);

        bldgGroup = this.applyData(bldgGroup, el);

        this.setControls(bldgGroup);
        this.canvas.add(bldgGroup);
        this.draggable(bldgGroup, this.canvas);
        this.allPieces.push(bldgGroup);

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

      for (var t = 0; t < this.allPieces.length; t++) {
        const onePiece = this.allPieces[t];
        // set rowWidth and maxHeight

        if (rowWidth + onePiece.width < this.sidebar) {
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
        let tempWidth = (this.sidebar - rows[2]) / 2;
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

      this.canvas.renderAll();
    },
    addLabel(object) {
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
          object.top +
          (object.height * object.scaleY) / 2 -
          lineText.height / 2,
      });
      return new fabric.Group([object, lineText]);
    },
    applyData(clone, orig) {
      clone.my = { type: "program" };
      clone.name = orig.name;
      clone.shapeType = orig.shape;
      clone.du = orig.du;
      clone.type = orig.type;
      clone.bldgArea = orig.bldgArea;
      clone.floors = orig.floors;
      return clone;
    },
    setControls(object) {
      const that = this;
      if (object.shapeType !== "Line") {
        object.setControlsVisibility({
          ...that.hideControls,
          ...{ ml: false, mr: false },
        });
      } else {
        object.on("scaling", function () {
          object._objects[1].set({
            scaleX: 1 / object.scaleX,
          });
          const functScale = Math.round(this.width / that.gridSpace);
          this.scaleX =
            Math.round(this.getScaledWidth() / that.gridSpace) / functScale;
        });
        object.setControlsVisibility({
          ...that.hideControls,
        });
      }
    },
    draggable(object) {
      let clicked = false;
      let that = this;
      object.on("mousedown", function () {
        object.active = true;
        // that.activeObjs.push(object);
        this.clone(function (clone) {
          clone = that.applyData(clone, object);
          that.setControls(clone);
          that.canvas.add(clone);
          that.draggable(clone, that.canvas);
          clicked = true;
        });
      });
      object.on("mouseup", function () {
        if (clicked) {
          this.off("mousedown");
          if (this.left < that.sidebar) {
            that.activeObjs = that.activeObjs.filter(
              (data) => data.name == this.name
            );
            that.canvas.remove(this);
          }
        }
        that.canvas.bringToFront(that.gridGroup);
        that.canvas.getObjects().forEach(function (target) {
          if (target.my) {
            target._objects[1].set({
              scaleX: 1 / target.scaleX,
            });
          }
        });
        // updateTotals(that.getAllActive(this.canvas));
        that.$root.$emit("update-data", updateTotals(that.getAllActive()));
      });
    },
    getAllActive() {
      let activeObjs = [];
      this.canvas.getObjects().forEach(function (targ) {
        if (targ.active) {
          activeObjs.push(targ);
        }
      });
      return activeObjs;
    },
    renderIcon(ctx, left, top) {
      var size = this.rotateIconSize;
      ctx.save();
      ctx.translate(left, top);
      // ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
      ctx.drawImage(this.img, -size / 2, -size / 2, size, size);
      ctx.restore();
    },
    rotateCW(eventData, transform) {
      const target = transform.target;
      const canvas = target.canvas;
      if (target.angle == 0) {
        target.rotate(90);
      } else {
        target.rotate(0);
      }

      canvas.requestRenderAll();
    },
    /////////////////////////////////////////////////
    clear() {
      const that = this;
      this.canvas.getObjects().forEach(function (targ) {
        if (targ.active) {
          that.canvas.remove(targ);
        }
      });
      this.$root.$emit("update-data", updateTotals(this.getAllActive()));
      this.canvas.renderAll();
    },
    submit() {
      console.log(JSON.stringify(this.canvas));
    },
  },
};
</script>

<style scoped>
#clearButtonContainer {
  position: relative;
  top: -680px;
  left: 500px;
}
</style>