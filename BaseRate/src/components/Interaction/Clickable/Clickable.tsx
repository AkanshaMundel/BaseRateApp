import React, { useRef } from "react";
import { TouchableOpacity, Vibration } from "react-native";
import { Animated, StyleProp, ViewStyle } from "react-native";

export interface RIClickable {
    children?: React.ReactNode;
    onPress?: () => void;
    compressAmount?: number;
    width?: number;
    className?: string;
    style?: StyleProp<ViewStyle> | undefined;
}
export namespace PIClickable { }

export default function Clickable(props: RIClickable) {
    const scale = useRef(new Animated.Value(1)).current;
    const scaleTo = (ratio: number) => {
        Animated.timing(scale, {
            toValue: ratio,
            duration: 50,
            useNativeDriver: true,
        }).start();
    }
    const {
        onPress = () => { },
        compressAmount = 0.95,
        className = '',
        style
    } = props
    return (
        <Animated.View
            style={[{ transform: [{ scale }], width: props.width }, style]}
            className={className}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPressIn={() => scaleTo(compressAmount)}
                onPressOut={() => scaleTo(1)}
                onPress={e => {
                    onPress();
                    Vibration.vibrate(30);
                }}
            >
                {props.children}
            </TouchableOpacity>
        </Animated.View>
    )
}