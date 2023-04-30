import { getFormattedDuration } from "../../../components/episodeCard/episodeCard_helpers";

describe('Test getFormattedDuration', () => {
    it('should return duration string with format MM:SS when duration in milliseconds is passed as argument', () => {
        const duration = 2016000;
        const stringDuration = getFormattedDuration(duration);

        expect(stringDuration).toEqual('33:36');
        expect(typeof stringDuration).toEqual('string');
    })

    it('should return duration string with format "N/A" when no duration is passed as argument', () => {
        const duration = getFormattedDuration();
        
        expect(duration).toEqual('N/A');
        expect(typeof duration).toEqual('string');
    })

    it('should return duration string with original format when argument is not in milliseconds format', () => {
        const duration = '33:36';
        const stringDuration = getFormattedDuration(duration);

        expect(stringDuration).toEqual('33:36');
        expect(typeof stringDuration).toEqual('string');
    })
})