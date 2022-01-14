import { useNavigation as useNavigationBase } from "@react-navigation/core";
import { NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
    readonly HomeScreen: undefined;
    readonly SnakeGameScreen: undefined;
};

export function useNavigation() {
    const navigation = useNavigationBase<NavigationProp<RootStackParamList>>();
    return navigation;
}
