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
  userSettings: {
    activeCategory: '',
    activeItems: []
  }
};

let userSettings;

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.CONFIGURATOR_SET_DEFAULT_ACTIVE_ITEMS:
      const defaultActiveItems = [...state.categories].map(item => {
        return {
          categorySlug: item.slug,
          itemId: 0
        };
      });

      userSettings = {
        ...state.userSettings,
        activeItems: defaultActiveItems
      };

      return {
        ...state,
        userSettings
      };
    case constants.CONFIGURATOR_SET_ACTIVE_ITEM:
      const activeItems = [...state.userSettings.activeItems].map(item => {
        if (item.categorySlug === action.payload.activeCategorySlug) {
          return {
            ...item,
            itemId: action.payload.itemId
          };
        } else {
          return item;
        }
      });

      userSettings = {
        ...state.userSettings,
        activeItems: activeItems
      };

      localStorage.setItem('userSettings', JSON.stringify(userSettings));

      return {
        ...state,
        userSettings
      };
    case constants.CONFIGURATOR_SET_ACTIVE_CATEGORY:
      const activeCategory = action.payload.categorySlug
        ? action.payload.categorySlug
        : state.categories[0].slug;

      userSettings = {
        ...state.userSettings,
        activeCategory
      };

      localStorage.setItem('userSettings', JSON.stringify(userSettings));

      return {
        ...state,
        userSettings
      };
    case constants.CONFIGURATOR_LOAD_SETTINGS_FROM_LOCAL_STORAGE:
      const settingsLocalStorage = action.payload.settingsLocalStorage;

      return {
        ...state,
        userSettings: settingsLocalStorage
      };
    default:
      return state;
  }
};
