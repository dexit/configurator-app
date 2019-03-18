import * as constants from '../store/constants';

const settingsLocalStorage = JSON.parse(localStorage.getItem('userSettings'));

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
          imgThumb: './img/model-1.png',
          imgLarge: './img/model-1.png',
          indexCss: 0,
          active: false
        },
        {
          id: 1,
          name: 'model 2',
          imgThumb: './img/model-2.png',
          imgLarge: './img/model-2.png',
          indexCss: 0,
          active: false
        }
      ]
    },
    {
      id: 1,
      slug: 'kolor-dodatkow',
      name: 'Kolor dodatków',
      items: [
        {
          id: 2,
          name: 'dodatek 1',
          imgThumb: './img/dodatki-1.png',
          imgLarge: './img/dodatki-1.png',
          indexCss: 1,
          active: false
        },
        {
          id: 3,
          name: 'dodatek 2',
          imgThumb: './img/dodatki-2.png',
          imgLarge: './img/dodatki-2.png',
          indexCss: 1,
          active: false
        }
      ]
    },
    {
      id: 2,
      slug: 'kolor-rekawkow',
      name: 'Kolor rękawków',
      items: [
        {
          id: 4,
          name: 'kolor 1',
          imgThumb: './img/rekawki-1.png',
          imgLarge: './img/rekawki-1.png',
          indexCss: 1,
          active: false
        },
        {
          id: 5,
          name: 'kolor 2',
          imgThumb: './img/rekawki-2.png',
          imgLarge: './img/rekawki-2.png',
          indexCss: 1,
          active: false
        }
      ]
    }
  ],
  userSettings: {
    activeCategory: '',
    activeItems: null,
    ...settingsLocalStorage
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.CONFIGURATOR_SET_DEFAULT_ACTIVE_ITEMS:
      const defaultActiveItems = [...state.categories]
        .map(item => {
          return {
            [item.slug]: item.items[0].id
          };
        })
        .reduce((obj1, obj2) => {
          return {
            ...obj1,
            ...obj2
          };
        });

      const userSettingsDefaultItems = {
        ...state.userSettings,
        activeItems: defaultActiveItems
      };

      return {
        ...state,
        userSettings: userSettingsDefaultItems
      };
    case constants.CONFIGURATOR_SET_ACTIVE_ITEMS:
      const stateActiveItems = state.userSettings.activeItems;
      const categories = state.categories.map(category => {
        const activeItem = stateActiveItems[category.slug];
        let items = [];
        let activeItemExist = false;

        items = category.items.map(item => {
          if (item.id === activeItem) {
            activeItemExist = true;

            return {
              ...item,
              active: true
            };
          }

          return {
            ...item,
            active: false
          };
        });

        if (!activeItemExist) {
          items[0].active = true;
        }

        return {
          ...category,
          items
        };
      });

      return { ...state, categories };
    case constants.CONFIGURATOR_SET_ACTIVE_ITEM_USER_SETTINGS:
      const activeItems = {
        ...state.userSettings.activeItems,
        [action.payload.activeCategorySlug]: action.payload.itemId
      };

      const userSettingsActiveItems = {
        ...state.userSettings,
        activeItems
      };

      localStorage.setItem(
        'userSettings',
        JSON.stringify(userSettingsActiveItems)
      );

      return {
        ...state,
        userSettings: userSettingsActiveItems
      };
    case constants.CONFIGURATOR_SET_ACTIVE_CATEGORY:
      const activeCategory = action.payload.categorySlug
        ? action.payload.categorySlug
        : state.categories[0].slug;

      const userSettingsActiveCategory = {
        ...state.userSettings,
        activeCategory
      };

      localStorage.setItem(
        'userSettings',
        JSON.stringify(userSettingsActiveCategory)
      );

      return {
        ...state,
        userSettings: userSettingsActiveCategory
      };
    default:
      return state;
  }
};
