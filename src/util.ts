import { Point, Station, StationSpeed, DistanceSpeed } from './datatype';

//absolute function convert the minus in positive -6 => 6
const converInAbsoluteNumber = (num: number): number => Math.abs(num);

/*find the distance between two point distance
 a = x1 - x2;
 b = y1 - y2;
 distance = Math.sqrt( a*a + b*b );
*/
const calculateDistance = (point1: Point, point2: Point): number => {
	const pointDiff: Point = {
		x: converInAbsoluteNumber(point1.x - point2.x),
		y: converInAbsoluteNumber(point2.y - point1.y)
	};
	return Math.sqrt(pointDiff.x * pointDiff.x + pointDiff.y * pointDiff.y);
};

/*find the speeed
  speed = (reach - distance)^2
*/
const calculateSpeed = (reach: number, distanceFromStation: number): number => {
	return Math.pow(reach - distanceFromStation, 2);
};
//calculate the device distance from station
const calculateSpeedFromTower = (station: Station, devicePointObj: Point): DistanceSpeed => {
	const stationPoint: Point = station;
	const distance = calculateDistance(stationPoint, devicePointObj);
	const speed = calculateSpeed(station.reach, distance);
	const distanceSpeed: DistanceSpeed = { distance, speed };
	return distanceSpeed;
};
//show the result of the device point
export const showBestNetworkInfo = (deviceNetworkInfo: StationSpeed) => {
	const result: string =
		deviceNetworkInfo.speed > 0
			? `Best network station for point ${deviceNetworkInfo.devicePoint.x},${deviceNetworkInfo.devicePoint
					.y} is ${deviceNetworkInfo.station.x},${deviceNetworkInfo.station
					.y} with speed ${deviceNetworkInfo.speed}`
			: `No network station within reach for point ${deviceNetworkInfo.devicePoint.x},${deviceNetworkInfo
					.devicePoint.y}`;

	console.log(result);
	return result;
};
//calculate the device distance from all station and find nearest station
export const calculateDeviceDistance = (deviceX: number, deviceY: number) => {
	const devicePoint: Point = { x: deviceX, y: deviceY };
	//the initial value which we use in reducer
	const initialValue = {
		station: { x: 0, y: 0, reach: 0 },
		speed: 0,
		devicePoint: { x: 0, y: 0 },
		speedAndDistance: { distance: 0, speed: 0 }
	};

	const stations: ReadonlyArray<Station> = [
		{ x: 0, y: 0, reach: 9 },
		{ x: 20, y: 20, reach: 6 },
		{ x: 10, y: 0, reach: 12 },
		{ x: 5, y: 5, reach: 13 },
		{ x: 99, y: 25, reach: 2 }
	];

	const maxStationSpeed = stations
		.map((station: Station) => {
			const speedAndDistance: DistanceSpeed = calculateSpeedFromTower(station, devicePoint);
			const stationSpeed: StationSpeed = {
				station,
				speed: speedAndDistance.distance > station.reach ? 0 : speedAndDistance.speed,
				devicePoint,
				speedAndDistance
			};
			return stationSpeed;
		})
		.reduce((acc: StationSpeed, current: StationSpeed) => {
			//rewrite the device point in acc because it's possibilites, it have initial device point value
			const devicePointInfo = { ...acc, devicePoint: current.devicePoint };
			return current.speed > acc.speed ? current : devicePointInfo;
		}, initialValue);
	return maxStationSpeed;
};
