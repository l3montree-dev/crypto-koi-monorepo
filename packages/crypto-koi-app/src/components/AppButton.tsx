import React, { FunctionComponent } from "react";
import {
    Pressable,
    PressableProps,
    StyleProp,
    Text,
    View,
    ViewStyle,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";

interface Props extends PressableProps {
    style?: StyleProp<ViewStyle>;
    title: string;
}

const android_ripple = {
    color: "rgba(0,0,0,0.2)",
};
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
            <Pressable android_ripple={android_ripple} {...rest}>
                <View style={tailwind("px-5 py-4")}>
                    <Text style={tailwind("text-white text-center")}>
                        {title}
                    </Text>
                </View>
            </Pressable>
        </View>
    );
};
