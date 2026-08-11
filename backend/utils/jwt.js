import jwt from "jsonwebtoken";
import crypto from "crypto";

/**
 * Generate a short-lived JWT access token.
 *
 * Access tokens are used to authenticate API requests.
 * They should contain only the minimum information required.
 */
export const generateAccessToken = (user) => {
    return jwt.sign(
        {
            sub: user._id.toString(),
            role: user.role?.toString(),
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m",
            issuer: "alpha-holdings",
            audience: "alpha-api",
        }
    );
};


/**
 *  a cryptographically secure refresh token.
 *
 * Unlike the access token, this is NOT a JWT.
 * It is an opaque random token.
 */
export const generateRefreshToken = () => {
    return crypto.randomBytes(64).toString("hex");
};


/**
 * Hashing a refresh token before storing it in the database.
 *
 * Never store the raw refresh token in MongoDB.
 */
export const hashRefreshToken = (token) => {
    return crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
};


/**
 * Verify an access token.
 */
export const verifyAccessToken = (token) => {
    return jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        {
            issuer: "alpha-holdings",
            audience: "alpha-api",
        }
    );
};