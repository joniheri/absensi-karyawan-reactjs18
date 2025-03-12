import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

export const GlobalContext = createContext();

export const GlobalContextProvider = (props) => {
  const [state, dispatch] = useReducer(reduces, initialState);

  return (
    <GlobalContext.Provider value={[state, dispatch]}>
      {props.children}
    </GlobalContext.Provider>
  );
};

// Tambahkan propTypes
GlobalContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const initialState = {
  isLogin: false,
  userLogin: [],
};

const reduces = (state, action) => {
  if (action.type === "PROCESS_LOGIN") {
    return {
      ...state,
      isLogin: true,
      userLogin: action.data,
    };
  } else if (action.type === "PROCESS_LOGOUT") {
    localStorage.clear();
    return {
      ...state,
      isLogin: false,
    };
  } else {
    return {
      state,
    };
  }
};
