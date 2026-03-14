import jwt from "jsonwebtoken";
import { errorData } from "../utils/response.js";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    return errorData(res, "Unauthorized", 401);
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch {
    return errorData(res, "Invalid or expired token", 401);
  }
}
