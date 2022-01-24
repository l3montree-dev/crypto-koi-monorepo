import moment, { Moment } from "moment";
import React, { useEffect, useState } from "react";
import { Text, TextStyle } from "react-native";
import { ticker } from "../services/Ticker";

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

    return (
        <Text style={props.style}>
            {props.date
                .clone()
                .subtract(value.unix(), "second")
                .format("HH:mm:ss")}
        </Text>
    );
}

export default SimpleClock;
