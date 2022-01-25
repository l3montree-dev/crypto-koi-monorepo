import { Moment } from "moment";

const secondsPerDay = 60 * 60 * 24;
export default class TimeUtils {
    static getTimeString(now: Moment, since: Moment) {
        let seconds = now.diff(since, "second") % secondsPerDay;

        let minutes = 0;
        let hours = 0;
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

        const timeString = hours + "h " + minutes + "m " + seconds + "s";
        return timeString;
    }
}
