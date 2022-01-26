import moment, { Moment } from "moment";
import React, { useEffect, useState } from "react";
import { Text, TextStyle } from "react-native";
import { ticker } from "../services/Ticker";
import TimeUtils from "../utils/TimeUtils";

interface Props {
    style?: TextStyle;
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
