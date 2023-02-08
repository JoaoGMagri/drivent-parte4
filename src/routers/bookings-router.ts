import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getBookingUser } from "@/controllers";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", getBookingUser);

export { bookingRouter };
