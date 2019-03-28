import html2pdf from 'html2pdf.js';

export default function createProductPdf() {
  const opt = {
    margin: 1,
    image: { type: 'png' },
    html2canvas: {
      logging: false
    },
    jsPDF: { orientation: 'landscape' }
  };

  return html2pdf()
    .set(opt)
    .from(document.querySelector('#templatePDF'))
    .outputPdf('blob');
}
