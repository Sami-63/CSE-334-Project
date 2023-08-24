import Room from "../models/roomModel.js";
import asyncHandler from "express-async-handler";

const createRoom = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    personCount,
    bedroomCount,
    acCount,
    imgUrl,
  } = req.body;

  const { room, error } = await Room.create(
    title,
    description,
    price,
    personCount,
    bedroomCount,
    acCount,
    imgUrl
  );

  if (!error && room) {
    res.json(room);
  } else {
    res.status(401);
    throw new Error("Error while creating room");
  }
});

const getAllRooms = asyncHandler(async (req, res) => {
  const { rooms, error } = await Room.getAllRooms();
  if (!error) {
    // console.log(rooms);

    res.json(rooms);
  } else {
    res.status(401);
    console.log(error);
    throw new Error("Error while getting all rooms");
  }
});

const deleteRoom = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const { room, error } = await Room.getRoomById(id);

  console.log("room and error -> ", room, error);

  if (room) {
    const { success, error } = await Room.deleteById(id);

    console.log("success and error -> ", success, error);

    if (success)
      res.json({
        success,
      });
    else res.status(500);
  } else {
    res.status(500);
    throw new Error("No room found by the given id");
  }
});

const getRoomById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const { room, error } = await Room.getRoomById(id);

  if (!error && room) {
    res.json(room);
  } else {
    res.status(500);
    console.log(error);
    throw new Error("Error while finding rooms");
  }
});

const updateRoom = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const { room, error } = await Room.getRoomById(id);
  if (room) {
    const {
      title,
      description,
      price,
      rating,
      personCount,
      bedroomCount,
      acCount,
      imgUrl,
    } = req.body;

    const update = {
      title,
      description,
      price,
      rating,
      personCount,
      bedroomCount,
      acCount,
      imgUrl,
    };

    const { success, error } = await Room.update(id, update);

    console.log("success and error -> ", success, error);

    if (success)
      res.json({
        success,
      });
    else res.status(500);
  } else {
    res.status(500);
    throw new Error("No room found by the given id");
  }
});

export { createRoom, getAllRooms, getRoomById, deleteRoom, updateRoom };
