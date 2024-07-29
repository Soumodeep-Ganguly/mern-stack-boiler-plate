const jwt = require('jsonwebtoken');

module.exports.authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    jwt.verify(token, process.env.JWT_TOKEN_SECRET || "mern-stack-boiler-plate", (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') return res.status(401).json({ error: 'Token expired' });
            return res.status(403).json({ error: 'Forbidden' });
        }
        req.user = user;
        next();
    });
};