import { getEpisodeById } from '../../../pages/episode/episode_helpers';

describe('Test getEpisodeById', () => {
	const episodes = [ { episodeGuid: '123456' }, { episodeGuid: '123123' }, { episodeGuid: '34544' } ];
	const episodeId = '123456';

	it('should return object with episode information when array and episode Id is passed as argument', () => {
		const expectedEpisodeObject = getEpisodeById(episodes, episodeId);

		expect(expectedEpisodeObject.episodeGuid).toEqual(episodeId);
	});

	it('should return undefined when episodeId is falsy or not found', () => {
		const expectedResult = getEpisodeById(episodes, null);
		const expectedResult2 = getEpisodeById(episodes);
		const expectedResult3 = getEpisodeById(episodes, '3543-12232');

		expect(expectedResult).toBeUndefined();
		expect(expectedResult2).toBeUndefined();
		expect(expectedResult3).toBeUndefined();
	});

	it('should throw error when array argument is missing', () => {
		expect(() => getEpisodeById(null, episodeId)).toThrowError();
	});
});
