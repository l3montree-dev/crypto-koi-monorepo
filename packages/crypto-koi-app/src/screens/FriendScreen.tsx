import { observer } from "mobx-react-lite";
import React from "react";
import useAppState from "../hooks/useAppState";
import { selectFirstCryptogotchi } from "../mobx/selectors";
import CryptogotchiView from "../views/CryptogotchiView";

const FriendsScreen = observer(() => {
    const cryptogotchi = useAppState(selectFirstCryptogotchi);

    if (!cryptogotchi) {
        return null;
    }

    return (
        <CryptogotchiView
            clockIdPrefix="friend-screen"
            cryptogotchi={cryptogotchi}
        />
    );
});

export default FriendsScreen;
