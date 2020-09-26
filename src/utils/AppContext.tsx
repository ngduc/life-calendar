import React from "react";
const AppStateContext = React.createContext({});
const CountDispatchContext = React.createContext({});

function countReducer(state: any, action: any) {
  switch (action.type) {
    case "increment": {
      return { count: state.count + 1 };
    }
    case "decrement": {
      return { count: state.count - 1 };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function AppContextProvider({ children }: { children: any }) {
  const [state, dispatch] = React.useReducer(countReducer, { count: 0 });
  return (
    <AppStateContext.Provider value={state}>
      <CountDispatchContext.Provider value={dispatch}>
        {children}
      </CountDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

function useAppState() {
  const context = React.useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within a AppContextProvider");
  }
  return context;
}

function useAppDispatch() {
  const context = React.useContext(CountDispatchContext);
  if (context === undefined) {
    throw new Error("useAppDispatch must be used within a AppContextProvider");
  }
  return context;
}

function useAppContext() {
  return [useAppState(), useAppDispatch()]
}

export { AppContextProvider, useAppState, useAppDispatch, useAppContext };
