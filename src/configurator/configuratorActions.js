import * as constants from '../store/constants';

export const setDefaultActiveItems = () => {
  return {
    type: constants.CONFIGURATOR_SET_DEFAULT_ACTIVE_ITEMS
  };
};

export const setLocalStorageActiveItems = () => {
  return {
    type: constants.CONFIGURATOR_SET_LOCAL_STORAGE_ACTIVE_ITEMS
  };
};

export const setInitialActiveItems = () => {
  return dispatch => {
    const userSettings = JSON.parse(localStorage.getItem('userSettings'));
    const activeCategory = userSettings.activeItems.length;

    if (activeCategory) {
      dispatch(setLocalStorageActiveItems());
    } else {
      dispatch(setDefaultActiveItems());
    }
  };
};

export const setActiveItem = (activeCategorySlug, itemId) => {
  return {
    type: constants.CONFIGURATOR_SET_ACTIVE_ITEM,
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

export const loadSettingsFromLocalStorage = settingsLocalStorage => {
  return {
    type: constants.CONFIGURATOR_LOAD_SETTINGS_FROM_LOCAL_STORAGE,
    payload: {
      settingsLocalStorage
    }
  };
};
