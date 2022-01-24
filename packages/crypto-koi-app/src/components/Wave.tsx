import React, { FunctionComponent, useEffect } from "react";
import { View, Dimensions, StyleSheet, ViewStyle } from "react-native";
import Svg, { Path } from "react-native-svg";
import Animated, {
    useAnimatedProps,
    useDerivedValue,
    useSharedValue,
    withRepeat,
    withTiming,
    Easing,
} from "react-native-reanimated";
import { mix } from "react-native-redash";

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "black",
    },
});
const AnimatedPath = Animated.createAnimatedComponent(Path);

interface Props {
    svgStyle?: ViewStyle | ViewStyle[];
    disableAnimation?: boolean;
}

const Wave: FunctionComponent<Props> = (props) => {
    const progress = useSharedValue(props.disableAnimation ? 0.35 : 0);
    useEffect(() => {
        if (!props.disableAnimation)
            progress.value = withRepeat(
                withTiming(1, {
                    duration: 3000,
                    easing: Easing.inOut(Easing.ease),
                }),
                -1,
                true
            );
    }, [progress]);

    const data1 = useDerivedValue(() => {
        const m = mix.bind(null, progress.value);

        return {
            from: {
                x: m(-0.1, -1),
                y: m(0.2, 0.5),
            },
            c1: { x: m(0, 0.5), y: m(0.7, 1) },
            c2: { x: m(1, 0.5), y: m(0.3, 0) },
            to: { x: m(1.1, 2), y: m(0.8, 0.5) },
        };
    });

    const path1 = useAnimatedProps(() => {
        const { from, c1, c2, to } = data1.value;

        return {
            d: `M ${from.x} ${from.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y} L 1 1 L 0 1 Z`,
        };
    });

    return (
        <View style={style.container}>
            <Svg style={props.svgStyle} viewBox="0 0 1 1">
                {/* @ts-ignore */}
                <AnimatedPath fill={"currentColor"} animatedProps={path1} />
            </Svg>
        </View>
    );
};

export default Wave;
