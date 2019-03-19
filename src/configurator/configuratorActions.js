import * as constants from '../store/constants';

export const setDefaultActiveItems = () => {
  return {
    type: constants.CONFIGURATOR_SET_DEFAULT_ACTIVE_ITEMS
  };
};

export const setActiveItems = () => {
  return {
    type: constants.CONFIGURATOR_SET_ACTIVE_ITEMS
  };
};

export const setActiveItemUserSettings = (activeCategorySlug, itemId) => {
  return {
    type: constants.CONFIGURATOR_SET_ACTIVE_ITEM_USER_SETTINGS,
    payload: {
      activeCategorySlug,
      itemId
    }
  };
};

export const setActiveCategory = categorySlug => {
  return {
    type: constants.CONFIGURATOR_SET_ACTIVE_CATEGORY,
    payload: {
      categorySlug
    }
  };
};

export const openSummary = () => {
  return {
    type: constants.CONFIGURATOR_OPEN_SUMMARY
  };
};

export const savedProductsToggle = () => {
  return {
    type: constants.CONFIGURATOR_SAVED_PRODUCTS_TOGGLE
  };
};

export const savedProductsOpen = () => {
  return {
    type: constants.CONFIGURATOR_SAVED_PRODUCTS_OPEN
  };
};

export const changeActiveItems = items => {
  return {
    type: constants.CONFIGURATOR_CHANGE_ACTIVE_ITEMS,
    payload: {
      items
    }
  };
};

export const removeProduct = index => {
  return {
    type: constants.CONFIGURATOR_REMOVE_PRODUCT,
    payload: {
      index
    }
  };
};

export const addProduct = () => {
  return {
    type: constants.CONFIGURATOR_ADD_PRODUCT
  };
};
