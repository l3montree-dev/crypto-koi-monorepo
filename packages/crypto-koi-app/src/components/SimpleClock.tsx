import moment, { Moment } from "moment";
import React, { useEffect, useState } from "react";
import { Text, TextStyle } from "react-native";

interface Props {
    style?: TextStyle;
    date: Moment;
}

function SimpleClock(props: Props) {
    const [value, setValue] = useState(moment());
    useEffect(() => {
        const interval = setInterval(() => {
            setValue(moment());
        }, 1 * 1000);
        return () => clearInterval(interval);
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
