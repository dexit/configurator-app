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
