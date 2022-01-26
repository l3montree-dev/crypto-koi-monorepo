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
}

function NextFeedButton(props: Props) {
    const { cryptogotchi, onPress, loading } = props;
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        ticker.addTickHandler("feeding-button", () => {
            const seconds = cryptogotchi.nextFeeding.diff(moment(), "seconds");

            // if seconds is negative - the date is in the past.
            if (seconds < 0) {
                setSeconds(0);
                return;
            }
            setSeconds(Config.secondsBetweenFeeding - seconds);
        });
    }, []);
    return (
        <ProgressButton
            title={
                seconds === 0
                    ? "Feed"
                    : "Feed (" +
                      moment
                          .utc((Config.secondsBetweenFeeding - seconds) * 1000)
                          .format("HH:mm:ss") +
                      ")"
            }
            progress={
                seconds === 0 ? 1 : seconds / Config.secondsBetweenFeeding
            }
            loading={loading}
            onPress={onPress}
        />
    );
}

export default NextFeedButton;
