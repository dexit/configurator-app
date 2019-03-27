import * as constants from '../store/constants';

export const setDefaultActiveItems = () => {
  return {
    type: constants.CONFIGURATOR_SET_DEFAULT_ACTIVE_ITEMS
  };
};

export const setActiveItems = items => {
  return {
    type: constants.CONFIGURATOR_SET_ACTIVE_ITEMS,
    payload: {
      items
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

export const savedProductsToggle = () => {
  return {
    type: constants.CONFIGURATOR_SAVED_PRODUCTS_TOGGLE
  };
};

export const openSavedProducts = () => {
  return {
    type: constants.CONFIGURATOR_OPEN_SAVED_PRODUCTS
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

export const addProduct = img => {
  return {
    type: constants.CONFIGURATOR_ADD_PRODUCT,
    payload: {
      img
    }
  };
};

export const checkProductExist = () => {
  return {
    type: constants.CONFIGURATOR_CHECK_PRODUCT_EXIST
  };
};

export const checkSavedProducts = () => {
  return {
    type: constants.CONFIGURATOR_CHECK_SAVED_PRODUCTS
  };
};

export function getCategories() {
  return dispatch => {
    dispatch(getCategoriesStart());

    return fetch('/categories.json')
      .then(response => response.json())
      .then(data => dispatch(getCategoriesSuccess(data)))
      .catch(error => dispatch(getCategoriesError(error)));
  };
}

export function getCategoriesStart() {
  return {
    type: constants.CONFIGURATOR_GET_CATEGORIES_START
  };
}

export function getCategoriesSuccess(data) {
  return {
    type: constants.CONFIGURATOR_GET_CATEGORIES_SUCCESS,
    payload: {
      data
    }
  };
}

export function getCategoriesError(error) {
  return {
    type: constants.CONFIGURATOR_GET_CATEGORIES_ERROR,
    payload: {
      error
    }
  };
}
