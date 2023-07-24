import { DURATION_CONVERT } from "./constants";

export function getHoursAndMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / DURATION_CONVERT);
    const minutes = totalMinutes % DURATION_CONVERT;

    if (hours === 0) {
        return `${minutes > 0 ? ` ${minutes}м` : ''}`;
    } else {
        return `${hours}ч${minutes > 0 ? ` ${minutes}м` : ''}`;
    }
}