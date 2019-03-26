import * as constants from '../store/constants';

const settingsLocalStorage = JSON.parse(localStorage.getItem('userSettings'));

const initialState = {
  categories: [
    {
      id: 0,
      slug: 'model',
      name: 'Model',
      active: false,
      items: [
        {
          id: 0,
          name: 'model 1',
          imgThumb: '/img/model-1.png',
          imgLarge: '/img/model-1.png',
          indexCss: 0,
          active: false
        },
        {
          id: 1,
          name: 'model 2',
          imgThumb: '/img/model-2.png',
          imgLarge: '/img/model-2.png',
          indexCss: 0,
          active: false
        }
      ]
    },
    {
      id: 1,
      slug: 'kolor-dodatkow',
      name: 'Kolor dodatków',
      active: false,
      items: [
        {
          id: 2,
          name: 'dodatek 1',
          imgThumb: '/img/dodatki-1.png',
          imgLarge: '/img/dodatki-1.png',
          indexCss: 1,
          active: false
        },
        {
          id: 3,
          name: 'dodatek 2',
          imgThumb: '/img/dodatki-2.png',
          imgLarge: '/img/dodatki-2.png',
          indexCss: 1,
          active: false
        }
      ]
    },
    {
      id: 2,
      slug: 'kolor-rekawkow',
      name: 'Kolor rękawków',
      active: false,
      items: [
        {
          id: 4,
          name: 'kolor 1',
          imgThumb: '/img/rekawki-1.png',
          imgLarge: '/img/rekawki-1.png',
          indexCss: 1,
          active: false
        },
        {
          id: 5,
          name: 'kolor 2',
          imgThumb: '/img/rekawki-2.png',
          imgLarge: '/img/rekawki-2.png',
          indexCss: 1,
          active: false
        }
      ]
    }
  ],
  savedProductsModal: false,
  userSettings: {
    activeCategorySlug: '',
    activeItems: null,
    savedProducts: [],
    ...settingsLocalStorage
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.CONFIGURATOR_SET_DEFAULT_ACTIVE_ITEMS:
      const defaultActiveItems =
        state.categories.length > 0 &&
        [...state.categories]
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
      let categories = [];
      let userSettingsActiveItems = {};

      function saveActiveItemsUserSettings() {
        const activeItems = {
          ...state.userSettings.activeItems,
          ...action.payload.items
        };

        userSettingsActiveItems = {
          ...state.userSettings,
          activeItems
        };

        localStorage.setItem(
          'userSettings',
          JSON.stringify(userSettingsActiveItems)
        );
      }

      function setActiveItems() {
        categories = state.categories.map(category => {
          const activeItem = userSettingsActiveItems.activeItems[category.slug];
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
      }

      saveActiveItemsUserSettings();
      setActiveItems();

      return { ...state, userSettings: userSettingsActiveItems, categories };
    case constants.CONFIGURATOR_SET_ACTIVE_CATEGORY:
      const firstCategorySlug =
        state.categories.length > 0 && state.categories[0].slug;
      const activeCategorySlug = action.payload.categorySlug
        ? action.payload.categorySlug
        : firstCategorySlug;

      const categoriesSetActive = state.categories.map(category => {
        if (category.slug === activeCategorySlug) {
          return {
            ...category,
            active: true
          };
        } else {
          return {
            ...category,
            active: false
          };
        }
      });

      const userSettingsActiveCategory = {
        ...state.userSettings,
        activeCategorySlug
      };

      localStorage.setItem(
        'userSettings',
        JSON.stringify(userSettingsActiveCategory)
      );

      return {
        ...state,
        categories: categoriesSetActive,
        userSettings: userSettingsActiveCategory
      };
    case constants.CONFIGURATOR_SAVED_PRODUCTS_TOGGLE:
      return {
        ...state,
        savedProductsModal: !state.savedProductsModal
      };
    case constants.CONFIGURATOR_OPEN_SAVED_PRODUCTS:
      return {
        ...state,
        savedProductsModal: true
      };
    case constants.CONFIGURATOR_REMOVE_PRODUCT:
      const index = action.payload.index;
      let savedProductsRemove = [...state.userSettings.savedProducts];

      savedProductsRemove.splice(index, 1);

      const userSettingsRemoveProduct = {
        ...state.userSettings,
        savedProducts: savedProductsRemove
      };

      localStorage.setItem(
        'userSettings',
        JSON.stringify(userSettingsRemoveProduct)
      );

      return {
        ...state,
        userSettings: userSettingsRemoveProduct
      };
    case constants.CONFIGURATOR_ADD_PRODUCT:
      let savedProductsAdd = [...state.userSettings.savedProducts];
      const newProduct = {
        img: action.payload.img,
        productParts: state.userSettings.activeItems
      };

      savedProductsAdd = [newProduct, ...savedProductsAdd];

      const userSettingsAddProduct = {
        ...state.userSettings,
        savedProducts: savedProductsAdd
      };

      localStorage.setItem(
        'userSettings',
        JSON.stringify(userSettingsAddProduct)
      );

      return {
        ...state,
        userSettings: userSettingsAddProduct
      };
    case constants.CONFIGURATOR_SAVE_PRODUCT_IMG:
      return {
        ...state
      };
    default:
      return state;
  }
};
