"use client";

import { createContext, useState, useContext } from "react";

const EventContext = createContext();

export const useEventContext = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const [eventState, setEventState] = useState("dfg");

  return (
    <EventContext.Provider value={{ eventState, setEventState }}>
      {children}
    </EventContext.Provider>
  );
};
