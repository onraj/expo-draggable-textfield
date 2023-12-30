import { createContext } from "react";
import Animated from "react-native-reanimated";

type textInputLayoutTypes = {
  height: number;
  width: number;
};

export interface RNDTInternalContextVariables {
  borderStatus: Animated.SharedValue<boolean>;
  textInputLayout: textInputLayoutTypes;
  isResize: Animated.SharedValue<boolean>;
  x: Animated.SharedValue<number>;
  y: Animated.SharedValue<number>;
  boxWidth: Animated.SharedValue<number>;
}

export const RNDTInternalContext =
  createContext<RNDTInternalContextVariables | null>(null);

export const RNDTInternalProvider = RNDTInternalContext.Provider;
