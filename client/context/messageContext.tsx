import React from "react";

type Action =
  | {
      type: "setReceiver";
      payload: { username: string; id: number };
    }
  | { type: "removeReceiver" };
type Dispatch = (action: Action) => void;
type State = {
  receiver: {
    username: string | null;
    id: number | null;
  };
};
type ReceiverProviderProps = { children: React.ReactNode };

const ReceiverStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function receiverReducer(state: State, action: Action) {
  switch (action.type) {
    case "setReceiver": {
      console.log("context payload: ", action.payload);
      return { receiver: action.payload };
    }

    case "removeReceiver": {
      return {
        receiver: { username: null, id: null },
      };
    }

    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
}

function ReceiverProvider({ children }: ReceiverProviderProps) {
  const [state, dispatch] = React.useReducer(receiverReducer, {
    receiver: { username: null, id: null },
  });

  // NOTE: you *might* need to memoize this value

  // Learn more in http://kcd.im/optimize-context

  const value = { state, dispatch };

  return (
    <ReceiverStateContext.Provider value={value}>
      {children}
    </ReceiverStateContext.Provider>
  );
}

function useReceiver() {
  const context = React.useContext(ReceiverStateContext);
  if (context === undefined) {
    throw new Error("useReceiver must be used within a ReceiverProvider");
  }
  return context;
}

export { ReceiverProvider, useReceiver };
