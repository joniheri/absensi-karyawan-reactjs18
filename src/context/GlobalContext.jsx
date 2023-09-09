import { createContext, useReducer } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = (props) => {
  const [state, dispatch] = useReducer(reduces, initialState);

  return (
    <GlobalContext.Provider value={[state, dispatch]}>
      {props.children}
    </GlobalContext.Provider>
  );
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
