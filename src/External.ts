import { createContext } from "react";
import {
  NativeSyntheticEvent,
  StyleProp,
  TextInputFocusEventData,
  TextStyle,
  ViewStyle,
} from "react-native";

export interface RNDTExternalContextVariables {
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

export const RNDTExternalContext =
  createContext<RNDTExternalContextVariables | null>(null);

export const RNDTExternalProvider = RNDTExternalContext.Provider;
