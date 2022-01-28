import { useNavigation as useNavigationBase } from "@react-navigation/core";
import { NavigationProp } from "@react-navigation/native";

export type RootStackParamList = {
    readonly OnboardingScreen: undefined;
    readonly FriendScreen: undefined;
    readonly CryptogotchiScreen: {
        cryptogotchiId: string;
    };
    readonly SnakeGameScreen: undefined;
    readonly TabNavigator: undefined;
    readonly FriendEditScreen: {
        cryptogotchiId: string;
        name: string;
        isAlive: boolean;
    };
};

export function useNavigation() {
    const navigation = useNavigationBase<NavigationProp<RootStackParamList>>();
    return navigation;
}
