import types from "../types";
const initial_state = {
    addressData: {},
  };
  
  export default function (state = initial_state, action) {
    switch (action.type) {
      case types.ADRESS:
        return {
          ...state,
          addressData: action.payload,
        };
      default:
        return { ...state };
    }
  }