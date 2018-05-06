const corsOptions = {
    development: {
        origin: /localhost:3000/,
        credentials: true,
        allowedHeaders: [
            'Content-Type',
            'Authorization'
        ]
    },
    production: {
        origin: /localhost:3000/,
        credentials: true,
        allowedHeaders: [
            'Content-Type',
            'Authorization'
        ]
    }
};

export default corsOptions[process.env.NODE_ENV || 'development'];
