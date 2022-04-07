import { observer } from "mobx-react-lite";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTailwind } from "tailwind-rn/dist";
import Cryptogotchi from "@crypto-koi/common/lib/mobx/Cryptogotchi";
import { ticker } from "@crypto-koi/common/lib/Ticker";
import TimeUtils from "@crypto-koi/common/lib/TimeUtils";
import CircularProgress from "./CircularProgress";

interface Props {
    cryptogotchi: Cryptogotchi;
    clockId: string;
    heartColor: string;
    onBackgroundColor: string;
}
const Lifetime = observer((props: Props) => {
    const { cryptogotchi } = props;
    const tailwind = useTailwind();
    const [value, setValue] = useState(moment());

    useEffect(() => {
        ticker.addTickHandler(props.clockId, () => setValue(moment()));
        return () => ticker.removeTickHandler(props.clockId);
    }, []);

    const diffSeconds = cryptogotchi.foodEmptyDate.diff(value, "second");
    if (diffSeconds < 0) {
        // remove the ticker
        ticker.removeTickHandler(props.clockId);
    }

    return (
        <View style={tailwind("flex-col items-center justify-center")}>
            <CircularProgress
                progress={Math.max(
                    0,
                    diffSeconds / (cryptogotchi.maxLifetimeMinutes * 60)
                )}
                backgroundStrokeColor={props.onBackgroundColor}
                radius={25}
                svgStyle={{ color: props.heartColor } as StyleProp<ViewStyle>}
                strokeWidth={6}
            >
                <View
                    style={tailwind(
                        "flex-row flex-1 justify-center items-center"
                    )}
                >
                    <Icon
                        style={[
                            tailwind("text-2xl"),
                            { color: props.heartColor },
                        ]}
                        name="heart"
                    />
                </View>
            </CircularProgress>
            <Text
                style={[
                    tailwind("text-xs mt-1"),
                    { color: props.onBackgroundColor },
                ]}
            >
                {diffSeconds < 0
                    ? "0h 0m 0s"
                    : TimeUtils.getTimeString(
                          moment().add(diffSeconds, "second"),
                          value
                      )}
            </Text>
        </View>
    );
});

export default Lifetime;
