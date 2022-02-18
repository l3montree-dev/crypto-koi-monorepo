import moment from "moment";
import React, { useEffect, useState } from "react";
import { Config } from "../config";
import Cryptogotchi from "../mobx/Cryptogotchi";
import { ticker } from "../services/Ticker";
import { ProgressButton } from "./ProgressButton";

interface Props {
    cryptogotchi: Cryptogotchi;
    onPress: () => void;
    loading: boolean;
    disabled: boolean;
    clockId: string;
    buttonProgressUnfilled: string;
    buttonProgressFilled: string;
    buttonBackgroundColor: string;
    buttonTextColor: string;
}

function NextFeedButton(props: Props) {
    const { cryptogotchi, onPress, loading, disabled } = props;
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        ticker.addTickHandler(props.clockId, () => {
            const seconds = cryptogotchi.nextFeeding.diff(moment(), "seconds");

            // if seconds is negative - the date is in the past.
            if (seconds <= 0) {
                setSeconds(-1);
                return;
            }
            setSeconds(Config.secondsBetweenFeeding - seconds);
        });
        return () => {
            ticker.removeTickHandler(props.clockId);
        };
    }, []);
    return (
        <ProgressButton
            title={
                seconds === -1
                    ? "Feed"
                    : "Feed (" +
                      moment
                          .utc((Config.secondsBetweenFeeding - seconds) * 1000)
                          .format("HH:mm:ss") +
                      ")"
            }
            progress={
                seconds === -1 ? 1 : seconds / Config.secondsBetweenFeeding
            }
            {...props}
            disabled={disabled}
            loading={loading}
            onPress={onPress}
        />
    );
}

export default NextFeedButton;
