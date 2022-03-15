import { StationSpeed, FnCalculateDeviceDistance } from './datatype';
import { calculateDeviceDistance, showBestNetworkInfo } from './util';

// currying function for infinte function parameters
const infiniteCurry = (fn: FnCalculateDeviceDistance) => {
	//make a function which first collect the all parameter
	const next = (...args: number[]) => {
		return (...deviceParam: any) => {
			//if parameter length is empty =>() then call the main function
			if (!deviceParam.length) {
				// the args here look like this [ [ 0, 0 ], [ 100, 100 ], [ 15, 10 ], [ 18, 18 ], [ 13, 13 ] ]
				return args.reduce((acc: any, currentDeviceParam: any) => {
					//call function which we passed currying function
					const deviceNearestPointStation = fn.apply(fn, currentDeviceParam);
					// concate the result in array
					return acc.concat([ deviceNearestPointStation ]);
				}, []);
			}
			//recusrsive call next
			return next(...args, deviceParam);
		};
	};
	return next();
};

const findNearestPointDevice = infiniteCurry(calculateDeviceDistance);
const bestNetworkDevicePoints: StationSpeed[] = findNearestPointDevice(0, 0)(100, 100)(15, 10)(18, 18)(13, 13)();
//print the result
bestNetworkDevicePoints.forEach(showBestNetworkInfo);
