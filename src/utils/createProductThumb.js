// import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';
import imageResize from './imageResize';

export default function createProductThumb(action) {
  const opt = {
    html2canvas: {
      logging: false,
      ignoreElements: element => element.id === 'btnAdd'
    }
  };

  html2pdf()
    .set(opt)
    .from(document.querySelector('#product'))
    .toImg()
    .outputImg()
    .then(image => {
      imageResize(image, 186, 124).then(imgResizedUrl => {
        action(imgResizedUrl);
      });
    });
}
