import asyncHandler from "express-async-handler";
import OtherBooking from "../models/otherBookingModel.js";

const createFacilityBooking = asyncHandler(async (req, res) => {
  const { startDate, endDate, facilityId, paymentAmount } = req.body;
  const email = req.user.email;

  if (startDate && endDate && facilityId && paymentAmount) {
    const otherbooking = new OtherBooking({
      startDate,
      endDate,
      facilityId,
      paymentAmount,
      customerEmail: email,
    });

    const { success, error } = await OtherBooking.create(otherbooking);

    if (!error && success) {
      res.status(200).send({
        success: true,
      });
    } else {
      res.status(500);
      console.log(error);
      throw new Error("Other booking failed");
    }
  } else {
    res.status(500);
    throw new Error("For other booking all fields must be filled");
  }
});
const getAllFacilityBookings = asyncHandler(async (req, res) => {
  const { otherbookings, error } = await OtherBooking.getAllBooking();

  if (!error) {
    res.json({ otherbookings });
  } else {
    res.status(500);
    console.log(error);
  }
});
const giveRating = asyncHandler(async (req, res) => {
  const { rating, id } = req.body;

  console.log("rating, id -> ", rating, id);

  try {
    if (1 <= Number(rating) && Number(rating) <= 5) {
      const { success, error } = await OtherBooking.isCustomerBooking(
        id,
        req.user.email
      );

      if (success) {
        const response = await OtherBooking.givenRating(id, rating);
        if (!response.error && response.success) {
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

const myOtherBookings = asyncHandler(async (req, res) => {
  const { email } = req.user;

  const { otherbookings, error } = await OtherBooking.getBookingsByEmail(email);

  // console.log("otherbookings, error => ", otherbookings, error);

  if (!error) {
    res.json(otherbookings);
  } else {
    res.status(500);
    console.log(error);
  }
});

const filterFacility = asyncHandler(async (req, res) => {
  const { checkinDate, checkoutdate } = req.body;

  // console.log("body => ", req.body);

  // console.log("[controller]  checkinDate -> ", checkinDate);
  // console.log("[controller]  checkOutdate -> ", checkoutdate);
  // console.log("[controller]  noOfBedrooms -> ", noOfBedrooms);
  // console.log("[controller]  noOfPeople -> ", noOfPeople);
  // console.log("[controller]  acRequired -> ", acRequired);

  const { otherbookings, error } = await OtherBooking.filterFacility(
    checkinDate,
    checkoutdate
  );

  if (!error) {
    res.json(otherbookings);
  } else {
    res.status(500);
    console.log(error);
  }
});
const isFacilityBookingPossible = asyncHandler(async (req, res) => {
  const { id, checkinDate, checkoutdate } = req.body;

  console.log(
    "id, checkinDate, checkoutdate => ",
    id,
    checkinDate,
    checkoutdate
  );

  if (id && checkinDate && checkoutdate) {
    const { response, error } = await OtherBooking.isBookingPossible(
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
  createFacilityBooking,
  getAllFacilityBookings,
  giveRating,
  filterFacility,
  isFacilityBookingPossible,
  myOtherBookings,
};
