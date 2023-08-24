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
      conn.query("Insert INTO otherfacility SET ?", facility, (err, res) => {
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

OtherFacility.getAllFacility = async () => {
  try {
    const facilities = await new Promise((resolve, reject) => {
      conn.query("SELECT * FROM otherfacility", (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });

    return { facilities };
  } catch (error) {
    return { error };
  }
};

OtherFacility.getFacilityById = async (id) => {
  try {
    const facility = await new Promise((resolve, reject) => {
      conn.query("SELECT * FROM otherfacility WHERE id = ?", id, (err, res) => {
        if (err) reject(err);
        else {
          if (res.length) resolve(res[0]);
          else resolve(null);
        }
      });
    });

    return { facility };
  } catch (error) {
    return { error };
  }
};

OtherFacility.getCategory = async () => {
  try {
    const category = await new Promise((resolve, reject) => {
      conn.query("SELECT DISTINCT category FROM otherfacility;", (err, res) => {
        if (err) reject(err);
        else {
          resolve(res);
        }
      });
    });

    return { category };
  } catch (error) {
    return { error };
  }
};

OtherFacility.getCategoryWiseFacility = async (category) => {
  // console.log("[model] category => ", category);
  try {
    // console.log("model => facility started");
    const facilities = await new Promise((resolve, reject) => {
      conn.query(
        "SELECT * FROM otherfacility WHERE category = ?",
        [category],
        (err, res) => {
          // console.log("category, res, err => ", category, res, err);
          if (err) reject(err);
          else {
            resolve(res);
          }
        }
      );
    });

    return { facilities };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export default OtherFacility;
