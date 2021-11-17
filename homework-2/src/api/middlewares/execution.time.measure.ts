import { logger } from '../../loaders/logger.loader';

export const Measure = (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        const start = performance.now();
        const result = originalMethod.apply(this, args);
        const finish = performance.now();
        logger.info(`Execution time: ${finish - start} milliseconds`);
        return result;
    };

    return descriptor;
};
