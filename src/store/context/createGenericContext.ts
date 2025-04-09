import { createContext, useContext, useState } from "react";


export const createGenericContext=<T,>() => {
  const Context = createContext<T | undefined>(undefined);

  const useCtx = () => {
    const ctx = useContext(Context);
    if (!ctx) throw new Error("Context value is undefined. Did you forget the Provider?");
    return ctx;
  };

  return [useCtx, Context.Provider] as const;
}