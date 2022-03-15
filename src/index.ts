import { StationSpeed, FnCalculateDeviceDistance } from './datatype';
import { calculateDeviceDistance, showBestNetworkInfo } from './util';

const infiniteCurry = (fn: FnCalculateDeviceDistance) => {
	const next = (...args: number[]) => {
		return (...deviceParam: any) => {
			if (!deviceParam.length) {
				return args.reduce((acc: any, currentDeviceParam: any) => {
					const deviceNearestPointStation = fn.apply(fn, currentDeviceParam);
					return acc.concat([ deviceNearestPointStation ]);
				}, []);
			}
			return next(...args, deviceParam);
		};
	};
	return next();
};

const findNearestPointDevice = infiniteCurry(calculateDeviceDistance);
const bestNetworkDevicePoints: StationSpeed[] = findNearestPointDevice(0, 0)(100, 100)(15, 10)(18, 18)(13, 13)();
bestNetworkDevicePoints.forEach(showBestNetworkInfo);
