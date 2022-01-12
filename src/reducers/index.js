import { combineReducers } from "redux";
import * as actiontype from "../actions/type";

const initialState = {
  currentUser: null,
  isLoading: true,
};

const user_reducer = (state = initialState, action) => {
  switch (action.type) {
    case actiontype.SET_USER:
      return {
        currentUser: action.payload.currentUser,
        isLoading: false,
      };
    case actiontype.CLEAR_USER:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const initialStateGroup = {
  currentGroup: null,
};

const group_reducer = (state = initialStateGroup, action) => {
  switch (action.type) {
    case actiontype.SET_CURRENT_GROUP:
      return {
        ...state,
        currentGroup: action.payload.currentGroup,
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: user_reducer,
  group: group_reducer,
});

export default rootReducer;
