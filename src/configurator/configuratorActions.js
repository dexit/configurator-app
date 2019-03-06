import * as constants from '../store/constants';

export const setDefaultActiveItems = () => {
  return {
    type: constants.SET_DEFAULT_ACTIVE_ITEMS
  };
};

export const setLocalStorageActiveItems = () => {
  return {
    type: constants.SET_LOCAL_STORAGE_ACTIVE_ITEMS
  };
};

export const setInitialActiveItems = () => {
  return dispatch => {
    if (localStorage.getItem('activeItems')) {
      dispatch(setLocalStorageActiveItems());
    } else {
      dispatch(setDefaultActiveItems());
    }
  };
};

export const setActiveItem = (activeCategorySlug, itemId) => {
  return {
    type: constants.SET_ACTIVE_ITEM,
    payload: {
      activeCategorySlug,
      itemId
    }
  };
};

export const setActiveCategory = categorySlug => {
  return {
    type: constants.SET_ACTIVE_CATEGORY,
    payload: {
      categorySlug
    }
  };
};
