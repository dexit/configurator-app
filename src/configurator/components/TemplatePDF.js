import React from 'react';
import ItemImg from './ItemImg';

function TemplatePDF(props) {
  const productDetails = (
    <table>
      <tbody>
        {props.categories.map(category => {
          let details = {
            categoryName: category.name,
            itemName: ''
          };

          category.items.forEach(item => {
            if (item.active === true) {
              details.itemName = item.name;
            }
          });

          return (
            <tr key={category.id}>
              <th className="py-2 px-4">{details.categoryName}:</th>
              <td className="py-2 px-4">{details.itemName}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  return (
    <div className="d-none">
      <div id="templatePDF">
        <h2 className="mt-5 mb-4 text-center text-uppercase">Twój produkt</h2>
        <div className="row">
          <div className="col-6 p-4">
            <ItemImg onlyImg={true} />
          </div>
          <div className="col-6 p-4">{productDetails}</div>
        </div>
      </div>
    </div>
  );
}

export default TemplatePDF;
