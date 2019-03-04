import * as constants from '../store/constants';

export const setActiveItem = (activeCategorySlug, itemId) => {
  return {
    type: constants.SET_ACTIVE_ITEM,
    payload: {
      activeCategorySlug,
      itemId
    }
  };
};
