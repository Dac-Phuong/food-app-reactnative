import types from "../types";
const initial_state = {
    userData: {},
  };
  
  export default function (state = initial_state, action) {
    switch (action.type) {
      case types.USERDATA:
        return {
          ...state,
          userData: action.payload,
        };
      default:
        return { ...state };
    }
  }