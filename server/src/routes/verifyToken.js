import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.header("auth_token");

    if (!token) return res.status(401).json({ error_message: "Access Denied" });

    try {
        const verification = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        req.user = verification;
        next();
    } catch (error) {
        res.status(400).json({
            error_message: "Invalid Token",
        });
    }
};
