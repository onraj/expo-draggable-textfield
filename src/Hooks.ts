import { useContext } from "react";

import { RNDTExternalContext } from "./External";
import { RNDTInternalContext } from "./Internal";

export const useRNDTExternal = () => {
  const context = useContext(RNDTExternalContext);

  if (context === null) {
    throw new Error("'useRNDT' cannot be used out of the RNDT!");
  }

  return context;
};

export const useRNDTInternal = () => {
  const context = useContext(RNDTInternalContext);

  if (context === null) {
    throw new Error("'useRNDT' cannot be used out of the RNDT!");
  }

  return context;
};
