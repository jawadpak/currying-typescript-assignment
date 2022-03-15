export type Point = {
	x: number;
	y: number;
};

export type Station = Point & { reach: number };

export type StationSpeed = {
	station: Station;
	speed: number;
	devicePoint: Point;
	speedAndDistance: DistanceSpeed;
};

export type DistanceSpeed = {
	distance: number;
	speed: number;
};

export type FnCalculateDeviceDistance = (x: number, y: number) => StationSpeed;
