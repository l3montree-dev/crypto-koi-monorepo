import React, { FunctionComponent } from "react";
import {
    ActivityIndicator,
    GestureResponderEvent,
    Pressable,
    PressableProps,
    StyleProp,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { android_ripple } from "../styles/commonStyles";

interface Props extends PressableProps {
    style?: StyleProp<ViewStyle>;
    title: string;
    // value between 0 and 1
    progress: number;
    loading?: boolean;
    buttonProgressUnfilled: string;
    buttonProgressFilled: string;
    buttonBackgroundColor: string;
    buttonTextColor: string;
}

const style = StyleSheet.create({
    loadingContainer: {
        height: 51,
    },
});

export const ProgressButton: FunctionComponent<Props> = (props) => {
    const tailwind = useTailwind();

    const { title, progress, ...rest } = props;
    const handlePress = (ev: GestureResponderEvent) => {
        if (props.loading) {
            return;
        }
        props.onPress && props.onPress(ev);
    };

    return (
        <View
            style={[
                props.disabled && tailwind("opacity-50"),
                tailwind("rounded-lg flex-row overflow-hidden"),
                { backgroundColor: props.buttonProgressUnfilled },
                props.style,
            ]}
        >
            <View
                style={[
                    { width: progress * 100 + "%" },
                    tailwind("h-full absolute"),
                    {
                        backgroundColor:
                            progress === 1
                                ? props.buttonBackgroundColor
                                : props.buttonProgressFilled,
                    },
                ]}
            />
            {props.loading ? (
                <View
                    style={[
                        style.loadingContainer,
                        tailwind("px-5 w-full py-2"),
                    ]}
                >
                    <ActivityIndicator
                        color={props.buttonTextColor}
                        size="large"
                    />
                </View>
            ) : (
                <Pressable
                    style={tailwind("w-full")}
                    android_ripple={android_ripple}
                    {...rest}
                    onPress={handlePress}
                >
                    <View style={tailwind("px-5 w-full py-4")}>
                        <Text
                            style={[
                                tailwind("text-center"),
                                { color: props.buttonTextColor },
                            ]}
                        >
                            {title}
                        </Text>
                    </View>
                </Pressable>
            )}
        </View>
    );
};
