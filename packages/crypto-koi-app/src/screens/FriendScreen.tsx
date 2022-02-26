import { observer } from "mobx-react-lite";
import React from "react";
import useAppState from "../hooks/useAppState";
import { selectFirstCryptogotchi } from "../mobx/selectors";
import { userService } from "../services/UserService";
import CryptogotchiView from "../views/CryptogotchiView";

const FriendsScreen = observer(() => {
    const cryptogotchi = useAppState(selectFirstCryptogotchi);

    const [refreshing, setRefreshing] = React.useState(false);
    if (!cryptogotchi) {
        return null;
    }

    const handleRefresh = React.useCallback(async () => {
        setRefreshing(true);
        try {
            await userService.sync();
        } finally {
            setRefreshing(false);
        }
    }, []);

    return (
        <CryptogotchiView
            onRefresh={handleRefresh}
            refreshing={refreshing}
            clockIdPrefix="friend-screen"
            cryptogotchi={cryptogotchi}
        />
    );
});

export default FriendsScreen;
