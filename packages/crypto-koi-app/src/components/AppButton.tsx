import React, { FunctionComponent } from "react";
import {
    Pressable,
    PressableProps,
    Text,
    TouchableNativeFeedback,
    TouchableNativeFeedbackProps,
    View,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";

interface Props extends PressableProps {
    variant: "primary" | "secondary" | "tertiary";
    title: string;
}

const variant2TailwindClass = (
    variant: "primary" | "secondary" | "tertiary"
) => {
    switch (variant) {
        case "primary":
            return "px-5 py-4 text-white";
        case "secondary":
            return "bg-gray-500 text-white";
        case "tertiary":
            return "bg-gray-600 text-white";
    }
};

export const AppButton: FunctionComponent<Props> = (props) => {
    const tailwind = useTailwind();

    const { variant, title, ...rest } = props;
    return (
        <View style={tailwind("rounded-lg bg-amber-500 overflow-hidden")}>
            <Pressable android_ripple={{ color: "rgba(0,0,0,0.2)" }} {...rest}>
                <View style={tailwind(variant2TailwindClass(variant))}>
                    <Text style={tailwind("text-white text-center")}>
                        {title}
                    </Text>
                </View>
            </Pressable>
        </View>
    );
};
