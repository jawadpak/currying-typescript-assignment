export const converInAbsoluteNumber = (num: number): number => Math.abs(num);
import { Point, Station, StationSpeed, DistanceSpeed, FnCalculateDeviceDistance } from './datatype';

const calculateDistance = (point1: Point, point2: Point): number => {
	const pointDiff: Point = {
		x: converInAbsoluteNumber(point1.x - point2.x),
		y: converInAbsoluteNumber(point2.y - point1.y)
	};
	return Math.sqrt(pointDiff.x * pointDiff.x + pointDiff.y * pointDiff.y);
};

const calculateSpeed = (reach: number, distanceFromStation: number): number => {
	return Math.pow(reach - distanceFromStation, 2);
};

const calculateSpeedFromTower = (station: Station, devicePointObj: Point): DistanceSpeed => {
	const stationPoint: Point = station;
	const distance = calculateDistance(stationPoint, devicePointObj);
	const speed = calculateSpeed(station.reach, distance);
	const distanceSpeed: DistanceSpeed = { distance, speed };
	return distanceSpeed;
};

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

export const calculateDeviceDistance = (deviceX: number, deviceY: number) => {
	const devicePoint: Point = { x: deviceX, y: deviceY };

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
			const stationPoint: Point = station;
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
			const devicePointInfo = { ...acc, devicePoint: current.devicePoint };
			return current.speed > acc.speed ? current : devicePointInfo;
		}, initialValue);
	return maxStationSpeed;
};
