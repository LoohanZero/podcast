import { Duration } from 'luxon';

const getFormattedDuration = duration => {
	if (duration.includes(':')) {
		return duration;
	} else {
		const millisDuration = duration * 1000;
		const objectDuration = Duration.fromMillis(millisDuration).shiftTo('minutes', 'seconds').toObject();
		return `${objectDuration.minutes}:${objectDuration.seconds}`;
	}
};

export { getFormattedDuration };
