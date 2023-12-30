import { createContext, useContext } from "react";
import Animated from "react-native-reanimated";

type TextInputLayout = {
  height: number;
  width: number;
};

export interface AnimationContextProps {
  borderStatus: Animated.SharedValue<boolean>;
  textInputLayout: TextInputLayout;
  isResize: Animated.SharedValue<boolean>;
  x: Animated.SharedValue<number>;
  y: Animated.SharedValue<number>;
  boxWidth: Animated.SharedValue<number>;
}

export const AnimationContext = createContext<AnimationContextProps | null>(
  null,
);

export const AnimationProvider = AnimationContext.Provider;

export const useAnimationContext = () => {
  const context = useContext(AnimationContext);

  if (!context) {
    throw new Error(
      "useAnimationContext must be used within an AnimationProvider",
    );
  }

  return context;
};
