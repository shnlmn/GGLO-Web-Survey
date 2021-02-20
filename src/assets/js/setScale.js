export const scaleObj = (imgWnew, number) => {
  const imgW = 926; // in pixels
 const actualW = 1400; // in feet
 const imgScale = imgW/actualW; // 1 pixel = (imgScale)ft
 const screenScale = imgW/imgWnew * imgScale; // ratio of orig image and scaled image on canvas
  return (number * screenScale);
}