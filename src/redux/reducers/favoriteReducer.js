import types from "../types";
const initial_state = {
    favoriteData: {},
  };
  
  export default function (state = initial_state, action) {
    switch (action.type) {
      case types.FAVORITES:
        return {
          ...state,
          favoriteData: action.payload,
        };
      default:
        return { ...state };
    }
  }