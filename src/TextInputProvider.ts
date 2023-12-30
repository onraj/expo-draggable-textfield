import { createContext, useContext } from "react";
import {
  NativeSyntheticEvent,
  StyleProp,
  TextInputFocusEventData,
  TextStyle,
  ViewStyle,
} from "react-native";

export interface TextInputContextProps {
  onChangeText?: ((text: string) => void) | undefined;
  onBlur?:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
  defaultTextValue?: string;
  blurOnSubmit?: boolean | undefined;
  placeholder?: string;
  value?: string | undefined;
  externalTextStyles?: StyleProp<TextStyle | ViewStyle>;
  externalBorderStyles?: StyleProp<ViewStyle>;
}

export const TextInputContext = createContext<TextInputContextProps | null>(
  null
);

export const TextInputProvider = TextInputContext.Provider;

export const useTextInput = () => {
  const context = useContext(TextInputContext);

  if (!context) {
    throw new Error("useTextInput must be used within a TextInputProvider");
  }

  return context;
};
