import React from "react";
import { Pressable, PressableProps, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTailwind } from "tailwind-rn/dist";

interface Props extends PressableProps {
    name: string;
}

const android_ripple = {
    color: "rgba(0,0,0,0.2)",
};

const style = StyleSheet.create({
    view: {
        width: 45,
        height: 45,
    },
});
const IconButton = (props: Props) => {
    const { name, ...rest } = props;
    const tailwind = useTailwind();
    return (
        <View style={[tailwind("overflow-hidden rounded-lg"), style.view]}>
            <Pressable android_ripple={android_ripple} {...rest}>
                <View
                    style={[
                        style.view,
                        tailwind(
                            "flex-row items-center justify-center flex-row"
                        ),
                    ]}
                >
                    <Icon
                        style={tailwind("text-white text-2xl ")}
                        name={name}
                    />
                </View>
            </Pressable>
        </View>
    );
};

export default IconButton;
