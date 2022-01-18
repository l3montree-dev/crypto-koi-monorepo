import { useEffect, useRef } from "react";
import { Animated as RNAnimated } from "react-native";

export function useFloating() {
    const translateX = useRef(new RNAnimated.Value(0)).current;
    const translateY = useRef(new RNAnimated.Value(0)).current;
    useEffect(() => {
        RNAnimated.loop(
            RNAnimated.sequence([
                RNAnimated.parallel([
                    RNAnimated.timing(translateX, {
                        toValue: -10,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                    RNAnimated.timing(translateY, {
                        toValue: -10,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                ]),
                RNAnimated.parallel([
                    RNAnimated.timing(translateX, {
                        toValue: -5,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                    RNAnimated.timing(translateY, {
                        toValue: 0,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                ]),
                RNAnimated.parallel([
                    RNAnimated.timing(translateX, {
                        toValue: 10,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                    RNAnimated.timing(translateY, {
                        toValue: 10,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                ]),
            ])
        ).start();
    });
    return {
        translateX,
        translateY,
    };
}
