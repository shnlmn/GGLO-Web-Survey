export const scaleObj = (imgWnew, number) => {
  const imgW = 544; // in pixels
 const actualW = 895; // in feet
 const imgScale = imgW/actualW; // 1 pixel = (imgScale)ft
 console.log(imgScale);
 const screenScale = imgW/imgWnew * imgScale; // ratio of orig image and scaled image on canvas
  return (number * screenScale);
}