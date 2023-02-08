import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getBookingUser, postBookingUser, putBookingUser } from "@/controllers";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", getBookingUser)
  .post("/", postBookingUser)
  .put("/:bookingId", putBookingUser);

export { bookingRouter };
