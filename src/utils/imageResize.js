export default function imageResize(imgUrl, width, height, format = 'jpeg') {
  const image = new Image();
  image.src = imgUrl;

  const newCanvas = document.createElement('canvas');
  var ctx = newCanvas.getContext('2d');
  newCanvas.width = width;
  newCanvas.height = height;
  ctx.drawImage(image, 0, 0, width, height);

  return newCanvas.toDataURL(`image/${format}`);
}
