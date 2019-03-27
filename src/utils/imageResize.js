export default function imageResize(image, width, height, format = 'jpeg') {
  return new Promise(function(success, reject) {
    image.addEventListener('load', () => {
      const newCanvas = document.createElement('canvas');
      let ctx = newCanvas.getContext('2d');
      newCanvas.width = width;
      newCanvas.height = height;
      ctx.drawImage(image, 0, 0, width, height);

      const imageResizedUrl = newCanvas.toDataURL(`image/${format}`);

      success(imageResizedUrl);
    });
  });
}
