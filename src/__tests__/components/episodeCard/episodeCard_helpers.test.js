import { getFormattedDuration } from '../../../components/episodeCard/episodeCard_helpers';

describe('Test getFormattedDuration', () => {
	it('should return duration string with format MM:SS when duration in milliseconds is passed as argument', () => {
		const duration = 2016000;
		const expectedStringDuration = getFormattedDuration(duration);

		expect(expectedStringDuration).toEqual('33:36');
		expect(typeof expectedStringDuration).toEqual('string');
	});

	it('should return duration string with format "N/A" when no duration is passed as argument', () => {
		const expecteDuration = getFormattedDuration();

		expect(expecteDuration).toEqual('N/A');
		expect(typeof expecteDuration).toEqual('string');
	});

	it('should return duration string with original format when argument is not in milliseconds format', () => {
		const duration = '33:36';
		const expectedStringDuration = getFormattedDuration(duration);

		expect(expectedStringDuration).toEqual('33:36');
		expect(typeof expectedStringDuration).toEqual('string');
	});
});
