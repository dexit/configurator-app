export default function imageResize(imgUrl, width, height, format = 'jpeg') {
  return new Promise(function(success, reject) {
    const image = new Image();
    image.src = imgUrl;

    image.addEventListener('load', () => {
      const newCanvas = document.createElement('canvas');
      let ctx = newCanvas.getContext('2d');
      newCanvas.width = width;
      newCanvas.height = height;
      ctx.drawImage(image, 0, 0, width, height);

      const imageResized = newCanvas.toDataURL(`image/${format}`);

      success(imageResized);
    });
  });
}
