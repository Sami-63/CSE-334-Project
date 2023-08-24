import conn from "../config/db.js";

const Room = function (room) {
  this.id = room.id;
  this.title = room.title;
  this.description = room.description;
  this.price = room.price || 0;
  this.rating = room.rating || 0;
  this.personCount = room.personCount || 0;
  this.bedroomCount = room.bedroomCount || 0;
  this.acCount = room.acCount || false;
  this.imgUrl = room.imgUrl || null;
};

const makeJson = (room) => {
  return {
    title: room.title,
    description: room.description,
    price: room.price,
    rating: room.rating,
    personCount: room.personCount,
    bedroomCount: room.bedroomCount,
    acCount: room.acCount,
    imgUrl: room.imgUrl,
  };
};

Room.create = async (
  title,
  description,
  price,
  personCount,
  bedroomCount,
  acCount,
  imgUrl
) => {
  try {
    const room = new Room({
      title,
      description,
      price,
      personCount,
      bedroomCount,
      acCount,
      imgUrl,
    });

    const success = await new Promise((resolve, reject) => {
      conn.query("Insert INTO room SET ?", room, (err, res) => {
        if (err) reject(err);
        else resolve(true);
      });
    });

    if (success) {
      const data = makeJson(room);
      return { room: data, error: null };
    } else {
      return { room: null, error: "Room insertion failed" };
    }
  } catch (error) {
    return { room: null, error };
  }
};

Room.getAllRooms = async () => {
  try {
    const rooms = await new Promise((resolve, reject) => {
      conn.query("SELECT * FROM room", (err, res) => {
        if (err) reject(err);
        else {
          resolve(res);
        }
      });
    });

    if (rooms) {
      return { rooms, error: null };
    } else {
      return { rooms: null, error: null };
    }
  } catch (error) {
    return { rooms: null, error };
  }
};

Room.deleteById = async (id) => {
  try {
    const success = await new Promise((resolve, reject) => {
      conn.query("DELETE FROM room WHERE id = ?", id, (err, res) => {
        if (err) reject(err);
        else {
          resolve(true);
        }
      });
    });
    if (success) return { success: success, error: null };
    else return { success: null, error: "deletion failed" };
  } catch (error) {
    return { success: null, error };
  }
};
Room.getRoomById = async (id) => {
  try {
    const room = await new Promise((resolve, reject) => {
      conn.query("SELECT * FROM room WHERE id = ?", id, (err, res) => {
        if (err) reject(err);
        else {
          if (res.length)
            resolve({
              id: res[0].id,
              title: res[0].title,
              description: res[0].description,
              price: res[0].price,
              rating: res[0].rating,
              personCount: res[0].personCount,
              bedroomCount: res[0].bedroomCount,
              acCount: res[0].acCount,
              imgUrl: res[0].imgUrl,
            });
          else resolve(null);
        }
      });
    });
    if (room) return { room, error: null };
    else return { room: null, error: "No room found by the id" };
  } catch (error) {
    return { room: null, error };
  }
};
Room.update = async (id, update) => {
  try {
    const success = await new Promise((resolve, reject) => {
      conn.query("UPDATE room SET ? WHERE id = ?", [update, id], (err, res) => {
        if (err) reject(err);
        else {
          resolve(true);
        }
      });
    });
    if (success) return { success: success, error: null };
    else return { success: null, error: "updation failed" };
  } catch (error) {
    return { success: null, error };
  }
};

export default Room;
