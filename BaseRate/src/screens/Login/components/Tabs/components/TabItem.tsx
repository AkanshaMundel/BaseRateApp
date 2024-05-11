import { useRef } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";

export interface RITabItem {
    text: string;
    isActive: boolean;
    onPress?: () => void;
}

export namespace PITabItem { }

export default function TabItem(props: RITabItem) {
    const scale = useRef(new Animated.Value(1)).current;
    const scaleTo = (ratio: number) => {
        Animated.timing(scale, {
            toValue: ratio,
            duration: 50,
            useNativeDriver: true,
        }).start();
    }
    const { onPress = () => { } } = props;
    return (
        <Animated.View style={{ transform: [{ scale }] }}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPressIn={() => scaleTo(0.95)}
                onPressOut={() => scaleTo(1)}
                onPress={e => {
                    onPress();
                }}>
                <View
                    className="w-full rounded-full flex items-center"
                    style={{
                        paddingVertical: 12,
                        backgroundColor: props.isActive ? 'white' : 'transparent',
                    }}>
                    <Text
                        className="text-slate-700"
                        style={{
                            fontFamily: 'Inter-SemiBold',
                            fontSize: 14,
                        }}>
                        {props.text}
                    </Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    )
}