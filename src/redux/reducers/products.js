import types from "../types";
const initial_state = {
    prdData: {},
  };
  
  export default function (state = initial_state, action) {
    switch (action.type) {
      case types.PRODUCTS:
        return {
          ...state,
          prdData: action.payload,
        };
      default:
        return { ...state };
    }
  }