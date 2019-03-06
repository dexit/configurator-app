import * as constants from '../store/constants';

const initialState = {
  categories: [
    {
      id: 0,
      slug: 'model',
      name: 'Model',
      items: [
        {
          id: 0,
          name: 'model 1',
          imgThumb: './product.jpg',
          imgLarge: './product.jpg',
          indexCss: 0
        },
        {
          id: 1,
          name: 'model 2',
          imgThumb: './product.jpg',
          imgLarge: './product.jpg',
          indexCss: 0
        }
      ]
    },
    {
      id: 1,
      slug: 'kolor-dodatkow',
      name: 'Kolor dodatków',
      items: [
        {
          id: 0,
          name: 'dodatek 1',
          imgThumb: './product.jpg',
          imgLarge: './product.jpg',
          indexCss: 1
        },
        {
          id: 1,
          name: 'dodatek 2',
          imgThumb: './product.jpg',
          imgLarge: './product.jpg',
          indexCss: 1
        }
      ]
    },
    {
      id: 2,
      slug: 'kolor-rekawkow',
      name: 'Kolor rękawków',
      items: [
        {
          id: 0,
          name: 'kolor 1',
          imgThumb: './product.jpg',
          imgLarge: './product.jpg',
          indexCss: 1
        },
        {
          id: 1,
          name: 'kolor 2',
          imgThumb: './product.jpg',
          imgLarge: './product.jpg',
          indexCss: 1
        }
      ]
    }
  ],
  activeItems: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_DEFAULT_ACTIVE_ITEMS:
      console.log('SET_DEFAULT_ACTIVE_ITEMS');
      const defaultActiveItems = [...state.categories].map(item => {
        return {
          categorySlug: item.slug,
          itemId: 0
        };
      });

      return { ...state, activeItems: defaultActiveItems };
    case constants.SET_LOCAL_STORAGE_ACTIVE_ITEMS:
      const defaultLocalStorageItems = JSON.parse(
        localStorage.getItem('activeItems')
      );

      return { ...state, activeItems: defaultLocalStorageItems };
    case constants.SET_ACTIVE_ITEM:
      const activeItems = [...state.activeItems].map(item => {
        if (item.categorySlug === action.payload.activeCategorySlug) {
          return {
            ...item,
            itemId: action.payload.itemId
          };
        } else {
          return item;
        }
      });

      const activeItemsJson = JSON.stringify(activeItems);

      localStorage.setItem('activeItems', activeItemsJson);

      return { ...state, activeItems };
    default:
      return state;
  }
};
