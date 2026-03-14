import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../db/prisma.js";
import { successData, errorData } from "../utils/response.js";

const router = Router();

router.post("/signup", async (req, res, next) => {
  try {
    const { name, email, mobileNo, password } = req.body;
    if (!name || !email || !mobileNo || !password) {
      return errorData(res, "Name, email, mobile and password are required", 400);
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return errorData(res, "User already exists with this email", 400);
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, mobileNo, passwordHash },
      select: { id: true, name: true, email: true, mobileNo: true },
    });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return successData(res, {
      token,
      message: "Registration successful",
      ...user,
    }, 201);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return errorData(res, "Email and password are required", 400);
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return errorData(res, "Invalid email or password", 401);
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return successData(res, {
      token,
      message: "Login successful",
      id: user.id,
      name: user.name,
      email: user.email,
      mobileNo: user.mobileNo,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
