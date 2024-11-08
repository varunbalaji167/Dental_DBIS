const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).send({ message: "No token provided" });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        req.userData=decoded;
        
        next();
    } catch (error) {
        res.status(401).send({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;