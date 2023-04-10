/* eslint-disable no-console */
import { Duration } from 'luxon';

/**
* Returns string with duration
* @param {String} duration
* @returns {String}
*/
const getFormattedDuration = duration => {
	try {
		if (!duration) {
			return 'N/A';
		}
		if (duration.includes(':')) {
			return duration;
		} else {
			const millisDuration = duration * 1000;
			const objectDuration = Duration.fromMillis(millisDuration).shiftTo('minutes', 'seconds').toObject();
			return `${objectDuration.minutes}:${objectDuration.seconds}`;
		}
	} catch (error) {
		console.log(error);
		return duration;
	}
};

export { getFormattedDuration };
