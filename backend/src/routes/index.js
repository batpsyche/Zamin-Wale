import { Router } from "express";
import authRoutes from "./auth.js";
import userRoutes from "./user.js";
import propertyRoutes from "./property.js";
import enquiryRoutes from "./enquiry.js";
import adminRoutes from "./admin.js";

export const apiRouter = Router();

apiRouter.use("/client", authRoutes);
apiRouter.use("/user", userRoutes);
apiRouter.use("/property", propertyRoutes);
apiRouter.use("/enquiry", enquiryRoutes);
apiRouter.use("/admin", adminRoutes);
