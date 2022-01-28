import React, { FunctionComponent } from "react";
import { ActivityIndicator } from "react-native";
import {
    Pressable,
    PressableProps,
    StyleProp,
    Text,
    View,
    ViewStyle,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { android_ripple } from "../styles/commonStyles";

interface Props extends PressableProps {
    style?: StyleProp<ViewStyle>;
    title: string;
    loading?: boolean;
}

export const AppButton: FunctionComponent<Props> = (props) => {
    const tailwind = useTailwind();

    const { title, ...rest } = props;
    return (
        <View
            style={[
                props.disabled && tailwind("opacity-50"),
                tailwind("rounded-lg bg-amber-500 overflow-hidden"),
                props.style,
            ]}
        >
            {props.loading ? (
                <View style={tailwind("px-5 py-2")}>
                    <ActivityIndicator color={"white"} size="large" />
                </View>
            ) : (
                <Pressable android_ripple={android_ripple} {...rest}>
                    <View style={tailwind("px-5 py-4")}>
                        <Text style={tailwind("text-white text-center")}>
                            {title}
                        </Text>
                    </View>
                </Pressable>
            )}
        </View>
    );
};
