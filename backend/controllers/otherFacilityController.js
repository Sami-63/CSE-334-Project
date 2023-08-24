import OtherFacility from "../models/otherFacilityModel.js";
import asyncHandler from "express-async-handler";

const createFacility = asyncHandler(async (req, res) => {
  const newFacility = new OtherFacility({
    category: req.body.category,
    title: req.body.title,
    description: req.body.description,
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

const getAllFacility = asyncHandler(async (req, res) => {
  const { facilities, error } = await OtherFacility.getAllFacility();

  if (!error) {
    res.json(facilities);
  } else {
    res.status(500);
    throw new Error("Error while getching all facilities");
  }
});

export { createFacility, getAllFacility };
