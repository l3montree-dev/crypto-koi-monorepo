import moment from "moment";
import React, { useEffect, useState } from "react";
import { config } from "../config";
import Cryptogotchi from "@crypto-koi/common/lib/mobx/Cryptogotchi";
import { ticker } from "@crypto-koi/common/lib/Ticker";
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
            setSeconds(config.secondsBetweenFeeding - seconds);
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
                          .utc((config.secondsBetweenFeeding - seconds) * 1000)
                          .format("HH:mm:ss") +
                      ")"
            }
            progress={
                seconds === -1 ? 1 : seconds / config.secondsBetweenFeeding
            }
            {...props}
            disabled={disabled}
            loading={loading}
            onPress={onPress}
        />
    );
}

export default NextFeedButton;
