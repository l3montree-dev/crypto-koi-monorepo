import Toast from "react-native-root-toast";

export default class ViewUtils {
    static toast(
        message: string,
        duration = Toast.durations.LONG,
        position = Toast.positions.BOTTOM
    ) {
        Toast.show(message, {
            duration,
            position,
            animation: true,
            hideOnPress: true,
            delay: 0,
            backgroundColor: "rgba(250,250,250,0.9)",
            textColor: "rgba(0,0,0,1)",
            textStyle: {
                fontSize: 13,
            },
            containerStyle: {
                paddingVertical: 15,
                paddingHorizontal: 20,
                borderRadius: 100,
            },
            opacity: 1,
            shadow: false,
        });
    }
}
