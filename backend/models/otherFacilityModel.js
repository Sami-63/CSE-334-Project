import conn from "../config/db.js";

const capitalizeEveryWord = (inputString) => {
  return inputString
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const OtherFacility = function (room) {
  this.category = capitalizeEveryWord(room.category);
  this.id = room.id;
  this.title = room.title;
  this.description = room.description;
  this.price = room.price || 0;
  this.rating = room.rating || 0;
  this.imgUrl = room.imgUrl || null;
};

const makeJson = (otherFacility) => {
  return {
    category: otherFacility.category,
    title: otherFacility.title,
    description: otherFacility.description,
    price: otherFacility.price,
    rating: otherFacility.rating,
    imgUrl: otherFacility.imgUrl,
  };
};

OtherFacility.create = async (facility) => {
  try {
    const success = await new Promise((resolve, reject) => {
      conn.query("Insert INTO otherFacility SET ?", facility, (err, res) => {
        if (err) reject(err);
        else resolve(true);
      });
    });

    if (success) {
      const data = makeJson(facility);
      return { facility: data, error: null };
    } else {
      return { error: "Facility insertion failed" };
    }
  } catch (error) {
    return { error };
  }
};

export default OtherFacility;
