import Booking from "../models/bookingModel.js";
import asyncHandler from "express-async-handler";

const createBooking = asyncHandler(async (req, res) => {
  const { startDate, endDate, roomId, paymentAmount } = req.body;
  const email = req.user.email;

  console.log("startDate -> ", startDate);
  console.log("endDate -> ", endDate);
  console.log("roomId -> ", roomId);
  console.log("paymentAmount -> ", paymentAmount);
  console.log("email -> ", email);

  if (startDate && endDate && roomId && paymentAmount) {
    const booking = new Booking({
      startDate,
      endDate,
      roomId,
      paymentAmount,
      customerEmail: email,
    });

    const { success, error } = await Booking.create(booking);

    if (!error && success) {
      res.status(200).send({
        success: true,
      });
    } else {
      res.status(500);
      console.log(error);
      throw new Error("Booking failed");
    }
  } else {
    res.status(500);
    throw new Error("For booking all fields must be filled");
  }
});

const getAllBooking = asyncHandler(async (req, res) => {
  const { bookings, error } = await Booking.getAllBooking();

  if (!error) {
    res.json({ bookings });
  } else {
    res.status(500);
    console.log(error);
  }
});
const confirmPayment = asyncHandler(async (req, res) => {
  const bookingId = req.body;
  const email = req.user.email;

  const { booking, error } = await Booking.getBookingById(bookingId);

  console.log("email -> ", email);
  console.log("booking -> ", booking);

  if (!error) {
    if (booking) {
      if (email !== booking.customerEmail) {
        res.send(500);
        throw Error("You are not authorized seeing this booking");
      } else if (booking.paymentStatus === "paid") {
        res.send(500);
        throw Error("Payment already confirmed");
      } else {
        const response = await Booking.confirmPayment(bookingId);
        const success = response.success;
        const paymentError = response.error;

        if (!paymentError && success) res.status(200).send({ success: true });
        else {
          res.status(500);
          throw new Error("Error while confirming payment");
        }
      }
    } else {
      res.send(500);
      throw Error("Invalid booking id");
    }
  } else {
    res.send(500);
    console.log(error);
  }
});

const giveRating = asyncHandler(async (req, res) => {
  const { rating, id } = req.body;

  console.log("rating, id -> ", rating, id);

  try {
    if (1 <= Number(rating) && Number(rating) <= 5) {
      const { success, error } = await Booking.isCustomerBooking(
        id,
        req.user.email
      );

      if (success) {
        const response = await Booking.givenRating(id, rating);
        if (!response.error && response.success) {
          await Booking.updateRating(id);

          res.status(200).send({ success: true });
        } else {
          res.status(500);
          console.log(response.error);
        }
      } else {
        res.status(500);
        console.log("is customer booking error -> ", error);
      }
    } else {
      res.status(500);
      throw new Error("Rating must be between 1 and 5");
    }
  } catch (error) {
    res.status(500);
    console.log(error);
  }
});
const myBookings = asyncHandler(async (req, res) => {
  const { email } = req.user;

  const { bookings, error } = await Booking.getBookingsByEmail(email);

  if (!error) {
    res.json(bookings);
  } else {
    res.status(500);
    console.log(error);
  }
});

const filterRoom = asyncHandler(async (req, res) => {
  const { checkinDate, checkoutdate, noOfBedrooms, noOfPeople, acRequired } =
    req.body;

  // console.log("body => ", req.body);

  // console.log("[controller]  checkinDate -> ", checkinDate);
  // console.log("[controller]  checkOutdate -> ", checkoutdate);
  // console.log("[controller]  noOfBedrooms -> ", noOfBedrooms);
  // console.log("[controller]  noOfPeople -> ", noOfPeople);
  // console.log("[controller]  acRequired -> ", acRequired);

  const { bookings, error } = await Booking.filterRoom(
    checkinDate,
    checkoutdate,
    noOfBedrooms,
    noOfPeople,
    acRequired
  );

  if (!error) {
    res.json(bookings);
  } else {
    res.status(500);
    console.log(error);
  }
});

const isBookingPossible = asyncHandler(async (req, res) => {
  const { id, checkinDate, checkoutdate } = req.body;

  if (id && checkinDate && checkoutdate) {
    const { response, error } = await Booking.isBookingPossible(
      id,
      checkinDate,
      checkoutdate
    );

    res.json({
      response,
      error,
    });
  } else {
    res.status(500);
    throw new Error(
      "id, checkinDate, checkoutdate, all the fields must not be null or undefined"
    );
  }
});

export {
  createBooking,
  getAllBooking,
  giveRating,
  confirmPayment,
  myBookings,
  filterRoom,
  isBookingPossible,
};
