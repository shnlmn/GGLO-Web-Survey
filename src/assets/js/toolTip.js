import { fabric } from "fabric";
export const toolTipPopup = (e) => {
  const targ = e.target;
  const padding = 2;
  let tipText = null;
  let tipTextBox = null;
  let tipGroup = null;
  let offsetX = 0;
  let offsetY = 0;
  if (targ) {
    if ("name" in targ && targ.name !== "toolTip") {
      // make blank rect so it renders below text

      tipText = new fabric.Text(targ.name, {
        fontSize: 20,
        fill: "black",
        top: targ.top,
        left: targ.left,
        selectable: false,
        evented: false,
      });
      if (targ.angle == 90) {
        offsetX = tipText.left - tipText.width / 2 -  targ.height / 2;
      } else {
        offsetX = tipText.left - tipText.width / 2 + targ.width / 2;
      }
      if (targ.top < tipText.height+4){
        offsetY = tipText.height + targ.height/2 + 4
      } else {
        offsetY = tipText.top - tipText.height - 4
      }

      tipText.set({
        left: offsetX,
        top: offsetY
      });
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
