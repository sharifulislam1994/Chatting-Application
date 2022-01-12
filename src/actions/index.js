import * as actiontype from "./type";

export const setuser = (user) => {
  return {
    type: actiontype.SET_USER,
    payload: {
      currentUser: user,
    },
  };
};

export const clearuser = () => {
  return {
    type: actiontype.CLEAR_USER,
  };
};

export const setcurrentgroup = (group) => {
  return {
    type: actiontype.SET_CURRENT_GROUP,
    payload: {
      currentGroup: group,
    },
  };
};
