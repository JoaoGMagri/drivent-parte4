import { notFoundError } from "@/errors";
import { forbiddenError } from "@/errors/forbidden-error";
import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function getBooking(userId: number) {
  const booking = await bookingRepository.findBooking(userId);
  if(!booking) {
    throw notFoundError();
  }
  return booking;
}

async function createBooking(userId: number, roomId: number) {
  await businessRules(userId, roomId);

  const newBooking = await bookingRepository.createBooking(userId, roomId );
  const body = { bookingId: newBooking.id };

  return body;
}

async function updateBooking(userId: number, roomId: number, bookingId: number) {
  await businessRules(userId, roomId);

  const booking = await bookingRepository.bookingToUser(bookingId, userId);
  if (!booking) {
    throw forbiddenError();
  } 

  const result = await bookingRepository.updateBooking(bookingId, roomId);
  const body = { bookingId: result.id };
  return body;
}

async function businessRules(userId: number, roomId: number) {
  const enrollment = await enrollmentRepository.findByUserId(userId);
  if(!enrollment) {
    throw forbiddenError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) {
    throw forbiddenError();
  }
  if (ticket.status !== "PAID" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw forbiddenError();
  } 

  const room = await bookingRepository.findByRoomId(roomId);
  if (!room) {
    throw notFoundError();
  } 
  if (room.Booking.length === room.capacity) {
    throw forbiddenError();
  } 
}

const bookingService = {
  getBooking,
  createBooking,
  updateBooking
};

export default bookingService;
