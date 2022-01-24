import React, { useEffect } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

interface Props {
    // value between 0 and 1
    progress: number;
    // do not try to set the width :-)
    innerStyle: StyleProp<ViewStyle>;
    outerStyle: StyleProp<ViewStyle>;
}

function Progressbar(props: Props) {
    const progressWidth = useSharedValue(0);
    useEffect(() => {
        if (props.progress > 1 || props.progress < 0) {
            throw new Error(
                "Invalid range (progress should be between 0 and 1). Progress: " +
                    props.progress
            );
        }

        progressWidth.value = withSpring(props.progress * 100);
    }, [props.progress]);

    const progressStyle = useAnimatedStyle(() => {
        return {
            width: progressWidth.value + "%",
        };
    });

    return (
        <View style={props.outerStyle}>
            <Animated.View style={[props.innerStyle, progressStyle]} />
        </View>
    );
}

export default Progressbar;
