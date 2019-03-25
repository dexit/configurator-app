import html2canvas from 'html2canvas';
import imageResize from './imageResize';

export default function createProductThumb(action) {
  html2canvas(document.querySelector('#product'), {
    logging: false,
    ignoreElements: element => element.id === 'btnAdd'
  }).then(canvas => {
    const imgUrl = canvas.toDataURL('image/jpeg');

    imageResize(imgUrl, 186, 124).then(imgResized => {
      action(imgResized);
    });
  });
}
