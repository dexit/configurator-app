import * as constants from '../store/constants';

const initialState = {
  categories: [
    {
      id: 1,
      slug: 'model',
      name: 'Model',
      items: [
        {
          id: 1,
          name: 'model 1',
          imgThumb: './product.jpg',
          imgLarge: './product.jpg',
          indexCss: 0
        },
        {
          id: 2,
          name: 'model 2',
          imgThumb: './product.jpg',
          imgLarge: './product.jpg',
          indexCss: 0
        }
      ]
    },
    {
      id: 2,
      slug: 'kolor-dodatkow',
      name: 'Kolor dodatków',
      items: [
        {
          id: 1,
          name: 'dodatek 1',
          imgThumb: './product.jpg',
          imgLarge: './product.jpg',
          indexCss: 1
        },
        {
          id: 2,
          name: 'dodatek 2',
          imgThumb: './product.jpg',
          imgLarge: './product.jpg',
          indexCss: 1
        }
      ]
    },
    {
      id: 3,
      slug: 'kolor-rekawkow',
      name: 'Kolor rękawków',
      items: [
        {
          id: 1,
          name: 'kolor 1',
          imgThumb: './product.jpg',
          imgLarge: './product.jpg',
          indexCss: 1
        },
        {
          id: 2,
          name: 'kolor 2',
          imgThumb: './product.jpg',
          imgLarge: './product.jpg',
          indexCss: 1
        }
      ]
    }
  ]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.TEST_ACTION:
      return { ...state, itWorks: true };
    default:
      return state;
  }
};
