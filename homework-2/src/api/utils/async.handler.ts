export const asyncHandler = (fn: (...args: any[]) => Promise<any>) =>
    (...args: any[]) : Promise<any> => {
        const fnReturn = fn(...args);
        const next = args[args.length - 1];
        return Promise.resolve(fnReturn).catch(next);
    };
