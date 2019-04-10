import * as constants from '../store/constants';

const settingsLocalStorage = JSON.parse(localStorage.getItem('userSettings'));

const initialState = {
  isLoading: false,
  isError: false,
  categories: [],
  isCategoriesLoaded: false,
  savedProductsModal: false,
  productExists: false,
  productEmailModal: false,
  userSettings: {
    activeCategoryId: null,
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
              [item.id]: item.items[0].id
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
          const activeItem = userSettingsActiveItems.activeItems[category.id];
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
      const firstCategoryId =
        state.categories.length > 0 && state.categories[0].id;
      const activeCategoryId = action.payload.categoryId
        ? action.payload.categoryId
        : firstCategoryId;

      const categoriesSetActive = state.categories.map(category => {
        if (category.id === activeCategoryId) {
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
        activeCategoryId
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
    case constants.CONFIGURATOR_CHECK_PRODUCT_EXIST:
      const productExists =
        state.userSettings.savedProducts.findIndex(
          item =>
            JSON.stringify(item.productParts) ===
            JSON.stringify(state.userSettings.activeItems)
        ) > -1
          ? true
          : false;

      return {
        ...state,
        productExists
      };
    case constants.CONFIGURATOR_CHECK_SAVED_PRODUCTS:
      const existingSavedProducts = [
        ...state.userSettings.savedProducts
      ].filter(product => {
        return Object.keys(product.productParts).every(function(key) {
          const categoryIndex = state.categories.findIndex(category => {
            return category.id === Number(key);
          });

          if (categoryIndex > -1) {
            const itemIndex = state.categories[categoryIndex].items.findIndex(
              item => item.id === product.productParts[key]
            );

            if (itemIndex > -1) {
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        });
      });

      return {
        ...state,
        userSettings: {
          ...state.userSettings,
          savedProducts: existingSavedProducts
        }
      };
    case constants.CONFIGURATOR_GET_CATEGORIES_START:
      return { ...state, isLoading: true };
    case constants.CONFIGURATOR_GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isCategoriesLoaded: true,
        categories: action.payload.data
      };
    case constants.CONFIGURATOR_GET_CATEGORIES_ERROR:
      return { ...state, isLoading: false, isError: true };
    case constants.PRODUCT_EMAIL_MODAL_TOGGLE:
      return {
        ...state,
        productEmailModal: !state.productEmailModal
      };
    case constants.PRODUCT_EMAIL_MODAL_OPEN:
      return {
        ...state,
        productEmailModal: true
      };
    default:
      return state;
  }
};
