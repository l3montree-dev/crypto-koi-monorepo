import React from "react";
import { useEffect } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { View } from "react-native";
import Animated, {
    useAnimatedProps,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { useTailwind } from "tailwind-rn/dist";

interface Props {
    // value between 0 and 1
    progress: number;
    radius: number;
    strokeWidth: number;
    children?: React.ReactNode;
    svgStyle: StyleProp<ViewStyle>;
    backgroundStrokeColor: string;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function CircularProgress(props: Props) {
    const sharedProgress = useSharedValue(0);
    const animatedProps = useAnimatedProps(() => {
        return {
            strokeDashoffset:
                Math.PI * 2 * props.radius * (1 - sharedProgress.value),
        };
    });

    useEffect(() => {
        sharedProgress.value = withSpring(props.progress);
    }, [props.progress]);

    const tailwind = useTailwind();
    return (
        <View
            style={[
                tailwind("relative"),
                {
                    width: props.radius * 2 + props.strokeWidth,
                    height: props.radius * 2 + props.strokeWidth,
                },
            ]}
        >
            <Svg
                style={[
                    tailwind("absolute bottom-0 left-0 right-0 top-0"),
                    props.svgStyle,
                ]}
            >
                <Circle
                    fill="transparent"
                    strokeWidth={props.strokeWidth}
                    r={props.radius}
                    cx={props.radius + props.strokeWidth / 2}
                    cy={props.radius + props.strokeWidth / 2}
                    strokeLinecap="round"
                    stroke={props.backgroundStrokeColor}
                />
                <AnimatedCircle
                    strokeWidth={props.strokeWidth}
                    r={props.radius}
                    fill="transparent"
                    cx={props.radius + props.strokeWidth / 2}
                    cy={props.radius + props.strokeWidth / 2}
                    strokeDasharray={props.radius * 2 * Math.PI}
                    strokeLinecap="round"
                    stroke="currentColor"
                    animatedProps={animatedProps}
                ></AnimatedCircle>
            </Svg>
            {props.children}
        </View>
    );
}

export default CircularProgress;
