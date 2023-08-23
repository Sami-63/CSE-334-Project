import OtherFacility from "../models/otherFacilityModel.js";
import asyncHandler from "express-async-handler";

const createFacility = asyncHandler(async (req, res) => {
  const newFacility = new OtherFacility({
    category: req.body.category,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    rating: req.body.rating,
    imgUrl: req.body.imgUrl,
  });

  const { facility, error } = await OtherFacility.create(newFacility);

  if (!error) {
    res.json(facility);
  } else {
    res.status(500);
    console.log(error);
  }
});

export { createFacility };
