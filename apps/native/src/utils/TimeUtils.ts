import { Moment } from "moment";

export default class TimeUtils {
    static getTimeString(now: Moment, since: Moment) {
        let seconds = now.diff(since, "second");

        let minutes = 0;
        let hours = 0;
        let days = 0;
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

        if (hours >= 24) {
            days = Math.floor(hours / 24);
            hours -= days * 24;
        }

        let timeString = hours + "h " + minutes + "m " + seconds + "s";

        // only display days if it's more than a day
        if (days > 0) {
            timeString = days + "d " + timeString;
        }
        return timeString;
    }
}
