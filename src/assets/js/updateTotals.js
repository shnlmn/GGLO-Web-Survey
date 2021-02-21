export const updateTotals = (activeObjects) => {
  let totalData = {
    DU: 0,
    bldgArea: 0,
    floorArea: 0,
    publicArea: 0,
    greenArea: 0,
    playArea: 0,
  };
    let dut = 0;
  for (let index = 0; index < activeObjects.length; index++) {
    const el = activeObjects[index];
    dut += el.du;
    if (el.type  == "apt") {
    console.log(el);
      totalData["DU"] += el.du;
      totalData["bldgArea"] += el.bldgArea;
      totalData["floorArea"] += el.bldgArea * el.floors;
    }
    if (el.type == "public") {
      totalData["publicArea"] += el.bldgArea;
    }
    if (el.type == "green") {
      totalData["greenArea"] += el.bldgArea;
    }
    if (el.type == "play") {
      totalData["playArea"] += el.bldgArea;
    }
    // totalData['DU'] = el;
  }
  // console.log(activeObjects);
  // vm.$children.$refs.totalDU = totalData["DU"];
  console.log("DU TOTAL", dut);
  document.querySelector(
    "#app"
  ).__vue__.$children[0].$refs.displayData._data.surveyData = totalData;
};
