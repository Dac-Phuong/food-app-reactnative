import types from "../types";
const initial_state = {
    cartData: {},
  };
  
  export default function (state = initial_state, action) {
    switch (action.type) {
      case types.CART:
        return {
          ...state,
          cartData: action.payload,
        };
      default:
        return { ...state };
    }
  }