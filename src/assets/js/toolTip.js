// import { asyncIterator } from "core-js/fn/symbol";
import { fabric } from "fabric";
export const toolTipPopup = (e) => {
  let targ = e.target;
  const padding = 2;
  let tipText = null;
  let tipTextBox = null;
  let tipGroup = null;
  let offsetX = 0;
  let offsetY = 0;
  if (targ) {
    targ = targ.setCoords()
    const brect = targ.getBoundingRect();
    console.log(brect);
    if ("name" in targ && targ.name !== "toolTip") {
      // make blank rect so it renders below text

      tipText = new fabric.Text(targ.displayName, {
        fontSize: 20,
        fill: "black",
        top: brect.top,
        left: brect.left,
        selectable: false,
        evented: false,
        fontFamily: "Arial" 
      });
      // if (targ.angle == 90) {
      //   offsetX = tipText.left - tipText.width / 2 -  brect.height / 2;
      // } else {
        offsetX = tipText.left - tipText.width / 2 + (brect.width) / 2;
      // }
      if (brect.top < tipText.height+4){
        offsetY = tipText.height *2 
      } else {
        offsetY = tipText.top - tipText.height - 4
      }


      tipText.set({
        left: offsetX,
        top: offsetY
      });
      if (tipText.left < 0){
        tipText.left = offsetX - tipText.left + 5;
      }
      tipTextBox = new fabric.Rect({
        selectable: false,
        evented: false,
        top: tipText.top - padding,
        fill: "white",
        stroke: 2,
        left: tipText.left - padding,
        width: tipText.width + padding * 2,
        height: tipText.height + padding * 2,
      });

      tipGroup = new fabric.Group([tipTextBox, tipText]);
      tipGroup.name = "toolTip";
    }
  }
  // const tipText = e.target;
  return tipGroup;
};
