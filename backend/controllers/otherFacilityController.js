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
  const { category, error } = await OtherFacility.getCategory();

  // console.log("category, error => ", category, error);

  const allFacility = {}; // Use an object to store facility data by category

  if (category) {
    // Use Promise.all to await all async operations
    await Promise.all(
      category.map(async (categoryObject) => {
        try {
          const facilityData = await OtherFacility.getCategoryWiseFacility(
            categoryObject.category
          );

          // console.log("facility data -> ", facilityData);

          if (!allFacility[categoryObject.category]) {
            allFacility[categoryObject.category] = []; // Initialize the array for the category
          }

          allFacility[categoryObject.category].push(...facilityData.facilities); // Spread the facility objects into the array
        } catch (error) {
          console.error(
            `Error fetching facility data for category ${categoryObject.category}:`,
            error
          );
        }
      })
    );
  }

  if (!error) {
    res.json(allFacility);
  } else {
    res.status(500);
    throw new Error("Error while fetching all facilities");
  }
});

const getFacilityById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  // console.log("id => ", id);

  if (id) {
    const { facility, error } = await OtherFacility.getFacilityById(id);
    // console.log("facility, error -> ", facility, error);
    if (error) {
      res.status(500);
      console.log(error);
    } else {
      res.json(facility);
    }
  } else {
    res.status(500);
    throw new Error("Cant get faclity without id.");
  }
});

export { createFacility, getAllFacility, getFacilityById };
