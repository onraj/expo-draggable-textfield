import React, { FC, memo } from "react";
import { StyleProp, StyleSheet, TextInput, TextStyle } from "react-native";
import Animated from "react-native-reanimated";

import { useAnimationContext } from "./AnimationProvider";
import { useTextInput } from "./TextInputProvider";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface CustomTextInputProps {
  style?: StyleProp<TextStyle>;
  text: string;
  setText: (text: string) => void;
}

const CustomTextInput: FC<CustomTextInputProps> = ({
  style,
  text,
  setText,
}) => {
  const {
    externalTextStyles,
    placeholder,
    onChangeText,
    onBlur,
    blurOnSubmit,
    defaultTextValue,
  } = useTextInput();
  const { isResize } = useAnimationContext();

  return (
    <>
      <AnimatedTextInput
        value={text}
        onChangeText={(newText) => {
          setText(newText);
          if (onChangeText) {
            onChangeText(newText);
          }
        }}
        onBlur={onBlur}
        blurOnSubmit={blurOnSubmit}
        multiline
        underlineColorAndroid="transparent"
        defaultValue={defaultTextValue}
        returnKeyType="none"
        scrollEnabled={false}
        spellCheck={false}
        autoCorrect={false}
        onFocus={() => (isResize.value = false)}
        style={[
          styles.textStyles,
          externalTextStyles,
          style,
          { fontFamily: "pragmatica-black" },
        ]}
        placeholder={placeholder ? placeholder : "Write something..."}
      />
    </>
  );
};

const styles = StyleSheet.create({
  textStyles: {
    width: "190%",
    alignSelf: "flex-start",
    margin: 10,
  },
});

export default memo(CustomTextInput);
