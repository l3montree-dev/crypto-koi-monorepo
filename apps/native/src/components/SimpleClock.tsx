import moment, { Moment } from "moment";
import React, { useEffect, useState } from "react";
import { Text, TextStyle } from "react-native";
import { ticker } from "@crypto-koi/common/lib/Ticker";
import TimeUtils from "../utils/TimeUtils";

interface Props {
    style?: TextStyle;
    date: Moment;
    id: string;
}

function SimpleClock(props: Props) {
    const [value, setValue] = useState(moment());
    useEffect(() => {
        ticker.addTickHandler(props.id, () => setValue(moment()));
        return () => ticker.removeTickHandler(props.id);
    }, [props.date]);

    const diffSeconds = props.date.diff(value, "second");
    if (diffSeconds < 0) {
        // remove the ticker
        ticker.removeTickHandler(props.id);
    }

    return (
        <Text style={props.style}>
            {diffSeconds < 0
                ? "0h 0m 0s"
                : TimeUtils.getTimeString(
                      moment().add(diffSeconds, "second"),
                      value
                  )}
        </Text>
    );
}

export default SimpleClock;
