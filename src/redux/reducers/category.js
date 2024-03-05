import types from "../types";
const initial_state = {
    categoryData: {},
  };
  
  export default function (state = initial_state, action) {
    switch (action.type) {
      case types.CATEGORIES:
        return {
          ...state,
          categoryData: action.payload,
        };
      default:
        return { ...state };
    }
  }