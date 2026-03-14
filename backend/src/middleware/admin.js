import { prisma } from "../db/prisma.js";
import { errorData } from "../utils/response.js";

export async function adminMiddleware(req, res, next) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, isAdmin: true },
    });
    if (!user || !user.isAdmin) {
      return errorData(res, "Admin access required", 403);
    }
    req.user.isAdmin = true;
    next();
  } catch (err) {
    next(err);
  }
}
