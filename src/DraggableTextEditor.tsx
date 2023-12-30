import React, { Ref, forwardRef, useMemo, useRef, useState } from "react";
import {
  Keyboard,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInputFocusEventData,
  TextProps,
  TextStyle,
  ViewStyle,
} from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import CustomTextInput from "./CustomTextInput";
import { RNDTExternalProvider } from "./External";
import { RNDTInternalProvider } from "./Internal";

interface DragTextRef {
  setBorderStatus: (value: boolean) => void;
}

export type Props = TextProps & {
  onChangeText?: ((text: string) => void) | undefined;
  blurOnSubmit?: boolean | undefined;
  value?: string | undefined;
  onBlur?:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;

  onItemActive?: () => void;
  visible?: boolean;
  externalTextStyles?: StyleProp<TextStyle | ViewStyle>;
  externalBorderStyles?: StyleProp<ViewStyle>;
  placeholder?: string;
  defaultTextValue?: string;
};

const DraggableTextEditor = forwardRef(
  (
    {
      externalTextStyles,
      externalBorderStyles,
      blurOnSubmit,
      placeholder,
      value,
      defaultTextValue,
      visible = true,
      onChangeText,
      onBlur,
      onItemActive,
    }: Props,
    ref: Ref<DragTextRef>,
  ) => {
    const x = useSharedValue<number>(30);
    const y = useSharedValue<number>(100);
    const boxWidth = useSharedValue<number>(240);
    const isResize = useSharedValue<boolean>(false);
    const borderStatus = useSharedValue<boolean>(true);
    const textInputLayout = {
      width: 100,
      height: 100,
    };
    const fontSize = useSharedValue<number>(30);
    const panRef = useRef(null);
    const pinchRef = useRef(null);
    const [text, setText] = useState(defaultTextValue || "");

    const onStartRoutine = () => {
      Keyboard.dismiss();
      onItemActive?.();
    };

    const pinchHandler = useAnimatedGestureHandler<
      PinchGestureHandlerGestureEvent,
      { baseFontSize: number }
    >({
      onStart: (_, ctx) => {
        ctx.baseFontSize = fontSize.value;
      },
      onActive: (event, ctx) => {
        const newFontSize = ctx.baseFontSize * event.scale;
        fontSize.value = newFontSize < 8 ? 8 : newFontSize;
      },
      onEnd: () => {},
    });

    const dragHandler = useAnimatedGestureHandler({
      onStart: (_ev: any, ctx: any) => {
        runOnJS(onStartRoutine)();
        borderStatus.value = true;
        ctx.startX = x.value;
        ctx.startY = y.value;
      },
      onActive: (_ev: any, ctx: any) => {
        if (borderStatus.value) {
          y.value = ctx.startY + _ev.translationY;
          x.value = ctx.startX + _ev.translationX;
        }
      },
      onEnd: () => {
        borderStatus.value = false;
      },
    });

    const externalContextVariables = useMemo(
      () => ({
        externalTextStyles,
        externalBorderStyles,
        placeholder,
        onChangeText,
        defaultTextValue,
        blurOnSubmit,
        value,
        onBlur,
      }),
      [
        externalTextStyles,
        externalBorderStyles,
        placeholder,
        onChangeText,
        defaultTextValue,
        blurOnSubmit,
        value,
        onBlur,
      ],
    );

    const internalContextVariables = useMemo(
      () => ({
        x,
        y,
        boxWidth,
        isResize,
        textInputLayout,
        borderStatus,
      }),
      [x, y, boxWidth, isResize, textInputLayout, borderStatus],
    );

    const animatedDragStyles = useAnimatedStyle(
      () => ({
        transform: [{ translateX: x.value }, { translateY: y.value }],
        width: boxWidth.value,
        display: visible ? "flex" : "none",
      }),
      [x, y, boxWidth, visible],
    );

    return (
      <RNDTExternalProvider value={externalContextVariables}>
        <RNDTInternalProvider value={internalContextVariables}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <PanGestureHandler
              ref={panRef}
              simultaneousHandlers={pinchRef}
              onGestureEvent={dragHandler}
            >
              <Animated.View style={[animatedDragStyles, styles.dragContainer]}>
                <PinchGestureHandler
                  ref={pinchRef}
                  simultaneousHandlers={panRef}
                  onGestureEvent={pinchHandler}
                >
                  <Animated.View>
                    <CustomTextInput
                      text={text}
                      setText={setText}
                      style={useAnimatedStyle(() => {
                        return { fontSize: fontSize.value };
                      })}
                    />
                  </Animated.View>
                </PinchGestureHandler>
              </Animated.View>
            </PanGestureHandler>
          </GestureHandlerRootView>
        </RNDTInternalProvider>
      </RNDTExternalProvider>
    );
  },
);

const styles = StyleSheet.create({
  dragContainer: {
    position: "absolute",
  },
  rotationStyles: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputCoverStyle: {
    width: "100%",
    height: "100%",
    position: "absolute",
    elevation: 5,
  },
});

export default DraggableTextEditor;
