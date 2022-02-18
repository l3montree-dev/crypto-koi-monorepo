import * as NavigationBar from "expo-navigation-bar";
import { makeAutoObservable } from "mobx";
import tinycolor from "tinycolor2";
import { Colors } from "../styles/colors";
import AuthStore from "./AuthStore";

const getBestTextColor = (c: string): string => {
    return tinycolor(c).isDark() ? "#ffffff" : "#000000";
};
/**
 * The mobx root store of the application
 */
export default class RootStore {
    authStore: AuthStore;

    primaryColor = "#ffffff";
    secondaryColor = "#ffffff";
    backgroundColor = "#ffffff";
    onSecondary = "#000000";
    onBackground = "#000000";
    buttonTextColor = "#000000";
    buttonBackgroundColor = "#000000";
    buttonProgressFilled = "#000000";
    buttonProgressUnfilled = "#000000";

    // used to set the status bar.
    secondaryIsDark = true;
    backgroundIsDark = true;

    tabBarColor: string = Colors.bgColorVariant;
    currentHeaderTintColor = "#ffffff";

    static calculateColorVariants(base: string) {
        const obj = tinycolor(base);
        if (obj.isDark()) {
            const secondaryColor = obj.clone().darken(10).toString();
            const backgroundColor = obj.clone().brighten(50).toString();
            return {
                primaryColor: base,
                secondaryColor,
                backgroundColor,
                onSecondary: getBestTextColor(secondaryColor),
                onBackground: getBestTextColor(backgroundColor),
                buttonTextColor: "#000000",
                buttonBackgroundColor: "#ffffff",
                buttonProgressFilled: "rgba(255,255,255,0.6)",
                buttonProgressUnfilled: "rgba(255,255,255,0.3)",
                secondaryIsDark: obj.clone().darken(10).isDark(),
                backgroundIsDark: obj.clone().lighten(50).isDark(),
            };
        }
        const secondaryColor = obj.clone().darken(10).toString();
        const backgroundColor = obj.clone().brighten(50).toString();
        return {
            primaryColor: base,
            secondaryColor,
            backgroundColor,
            onBackground: getBestTextColor(backgroundColor),
            onSecondary: getBestTextColor(secondaryColor),
            buttonTextColor: "#ffffff",
            buttonBackgroundColor: "#000000",
            buttonProgressFilled: "rgba(0,0,0,0.5)",
            buttonProgressUnfilled: "rgba(0,0,0,0.2)",
            secondaryIsDark: obj.clone().darken(20).isDark(),
            backgroundIsDark: obj.clone().lighten(30).isDark(),
        };
    }

    constructor() {
        makeAutoObservable(this);
        this.authStore = new AuthStore();
    }

    setTabBarColor(color: string) {
        this.tabBarColor = color;
    }

    setCurrentHeaderTintColor(color: string) {
        this.currentHeaderTintColor = color;
    }

    setColor(color: string) {
        const colorVariants = RootStore.calculateColorVariants(color);
        this.primaryColor = colorVariants.primaryColor;
        this.secondaryColor = colorVariants.secondaryColor;
        this.backgroundColor = colorVariants.backgroundColor;
        this.buttonBackgroundColor = colorVariants.buttonBackgroundColor;
        this.buttonProgressUnfilled = colorVariants.buttonProgressUnfilled;
        this.buttonProgressFilled = colorVariants.buttonProgressFilled;
        this.onSecondary = colorVariants.onSecondary;
        this.onBackground = colorVariants.onBackground;
        this.buttonTextColor = colorVariants.buttonTextColor;
        this.secondaryIsDark = colorVariants.secondaryIsDark;
        this.backgroundIsDark = colorVariants.backgroundIsDark;

        this.setCurrentHeaderTintColor(colorVariants.onSecondary);

        NavigationBar.setBackgroundColorAsync(colorVariants.secondaryColor);
        this.setTabBarColor(colorVariants.secondaryColor);
    }

    getColorObj() {
        return tinycolor(this.primaryColor);
    }
}

// create a singleton instance.
export const rootStore = new RootStore();
export const authStore = rootStore.authStore;
