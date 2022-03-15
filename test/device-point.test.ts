import { StationSpeed } from '../src/datatype';
import { showBestNetworkInfo, calculateDeviceDistance } from '../src/util';

const deviceNearestStationExpected: StationSpeed = {
	station: { x: 5, y: 5, reach: 13 },
	speed: 2.843579026396227,
	devicePoint: { x: 13, y: 13 },
	speedAndDistance: { distance: 11.313708498984761, speed: 2.843579026396227 }
};

const zeroSpeedExpected = {
	station: { x: 0, y: 0, reach: 0 },
	speed: 0,
	devicePoint: { x: 100, y: 100 },
	speedAndDistance: { distance: 0, speed: 0 }
};

describe('test device nearest station message', () => {
	it('Device point (13, 13) to station { x: 5, y: 5, reach: 13 ', () => {
		const result: string = showBestNetworkInfo(deviceNearestStationExpected);
		expect(result).toEqual('Best network station for point 13,13 is 5,5 with speed 2.843579026396227');
	});
});

describe('test device not in range message', () => {
	it('Device point (13, 13) to station { x: 5, y: 5, reach: 13 ', () => {
		const result: string = showBestNetworkInfo(zeroSpeedExpected);
		expect(result).toEqual('No network station within reach for point 100,100');
	});
});

describe('test device nearest station', () => {
	it('Device point (13, 13) find nearest station', () => {
		const deviceNearestStation = calculateDeviceDistance(13, 13);
		expect(deviceNearestStation).toEqual(deviceNearestStationExpected);
	});
});

describe('test device station is not in range', () => {
	it('Device point (100, 100) speed should be 0', () => {
		const zeroSpeedObj = calculateDeviceDistance(100, 100);
		expect(zeroSpeedObj).toEqual(zeroSpeedExpected);
	});
});
