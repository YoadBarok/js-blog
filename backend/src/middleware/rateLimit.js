import RateLimit from 'express-rate-limit'

var limiter = RateLimit({
    windowMs: 1 * 60 * 1000,
    max: 60
});

export { limiter };