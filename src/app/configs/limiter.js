const limiter = {
    development: {
        windowsMs: 15 * 60 * 1000, // 15 minutes
        max: 2500,
        delayMs: 0
    },
    production: {
        windowsMs: 15 * 60 * 1000, // 15 minutes
        max: 100,
        delayMs: 0
    },
    test: {
        windowsMs: 15 * 60 * 1000, // 15 minutes
        max: 100,
        delayMs: 0
    }
};
export default limiter[process.env.NODE_ENV || 'development'];
