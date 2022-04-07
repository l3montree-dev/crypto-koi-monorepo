import moment, { Moment } from "moment";
import React, { useEffect, useState } from "react";
import { Text, TextStyle } from "react-native";
import { ticker } from "@crypto-koi/common/lib/Ticker";
import TimeUtils from "@crypto-koi/common/lib/TimeUtils";

interface Props {
    style?: TextStyle | TextStyle[];
    date: Moment;
    id: string;
}

function Clock(props: Props) {
    const [value, setValue] = useState(moment());
    useEffect(() => {
        ticker.addTickHandler(props.id, () => setValue(moment()));
        return () => ticker.removeTickHandler(props.id);
    }, [props.date]);

    return (
        <Text style={props.style}>
            {TimeUtils.getTimeString(value, props.date)}
        </Text>
    );
}

export default Clock;
