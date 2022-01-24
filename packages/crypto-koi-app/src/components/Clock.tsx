import moment, { Moment } from "moment";
import React, { useEffect, useState } from "react";
import { Text, TextStyle } from "react-native";

interface Props {
    style?: TextStyle;
    date: Moment;
}

const secondsPerDay = 60 * 60 * 24;
const getTimeStr = (now: Moment, since: Moment) => {
    let seconds = now.diff(since, "second") % secondsPerDay;
    let minutes = 0;
    let hours = 0;
    // Calculate number of minutes
    if (seconds >= 60) {
        minutes = Math.floor(seconds / 60);
        seconds -= minutes * 60;
    }
    // Calculate number of hours
    if (minutes >= 60) {
        hours = Math.floor(minutes / 60);
        minutes -= hours * 60;
    }
    const timeString = hours + "h " + minutes + "m " + seconds + "s";
    return timeString;
};
function Clock(props: Props) {
    const [value, setValue] = useState(moment());
    useEffect(() => {
        const interval = setInterval(() => {
            setValue(moment());
        }, 1 * 1000);
        return () => clearInterval(interval);
    }, [props.date]);

    return (
        <Text style={props.style}>
            {value.diff(props.date, "day")}d {getTimeStr(value, props.date)}
        </Text>
    );
}

export default Clock;
