import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { observer } from "mobx-react-lite";
import Cryptogotchi from "../mobx/Cryptogotchi";
import CircularProgress from "./CircularProgress";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import { ticker } from "../services/Ticker";
import TimeUtils from "../utils/TimeUtils";

interface Props {
    cryptogotchi: Cryptogotchi;
    clockId: string;
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
                backgroundStrokeColor={
                    tailwind("text-amber-100").color as string
                }
                radius={25}
                svgStyle={tailwind("text-amber-500")}
                strokeWidth={6}
            >
                <View
                    style={tailwind(
                        "flex-row flex-1 justify-center items-center"
                    )}
                >
                    <Icon
                        style={tailwind("text-amber-500 text-2xl")}
                        name="heart"
                    />
                </View>
            </CircularProgress>
            <Text style={tailwind("text-white text-xs mt-1")}>
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
