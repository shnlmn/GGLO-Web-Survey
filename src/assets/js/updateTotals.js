export const updateTotals = (activeObjects) => {
  let totalData = {
    DU: {label: "Total Units", total: 0},
    // bldgArea: {label: "Total Built Area", total: 0},
    // floorArea: {label: "Total Floor Area", total: 0},
    publicArea: {label: "Total Public Area", total: 0},
    greenArea: {label: "Total Green Area", total: 0},
    playArea: {label: "Total Play Area", total: 0},
  }
  ;
  for (let index = 0; index < activeObjects.length; index++) {
    const el = activeObjects[index];
    if (el.type  == "apt") {
    console.log(el);
      totalData["DU"]['total'] += el.du;
      // totalData["bldgArea"]['total'] += el.bldgArea;
      totalData["floorArea"]['total'] += el.bldgArea * el.floors;
    }
    if (el.type == "public") {
      totalData["publicArea"]['total'] += el.bldgArea;
    } 
    if (el.type == "green") {
      totalData["greenArea"]['total'] += el.bldgArea;
    }
    if (el.type == "play") {
      totalData["playArea"]['total'] += el.bldgArea;
    }
  }
  return totalData;
};
