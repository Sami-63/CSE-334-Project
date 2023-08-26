import conn from "../config/db.js";

const OtherBooking = function (booking) {
  this.id = booking.id;
  this.bookingDate = booking.bookingDate;
  this.startTime = booking.startTime;
  this.endTime = booking.endTime;
  this.customerEmail = booking.customerEmail;
  this.facilityId = booking.facilityId;
  this.paymentAmount = booking.paymentAmount;
  this.givenRating = booking.givenRating || null;
};

OtherBooking.create = async (otherbooking) => {
  try {
    const success = await new Promise((resolve, reject) => {
      conn.query("INSERT INTO otherbooking SET ?", otherbooking, (err, res) => {
        if (err) reject(err);
        else {
          resolve(true);
        }
      });
    });

    if (success) return { success: true };
    else return { error: "Other facility booking failed" };
  } catch (error) {
    return { error };
  }
};

OtherBooking.getAllBooking = async () => {
  try {
    const otherbookings = await new Promise((resolve, reject) => {
      conn.query("SELECT * FROM otherbooking", (err, res) => {
        if (err) reject(err);
        else {
          resolve(res);
        }
      });
    });

    return { otherbookings };
  } catch (error) {
    return { error };
  }
};

OtherBooking.getBookingById = async (id) => {
  try {
    const otherbooking = await new Promise((resolve, reject) => {
      conn.query("SELECT * FROM otherbooking WHERE id = ?", id, (err, res) => {
        if (err) reject(err);
        else {
          if (res.length) resolve(res[0]);
          else resolve(null);
        }
      });
    });

    if (otherbooking) return { otherbooking };
    else return { error: "No booking found by id" };
  } catch (error) {
    return { error };
  }
};

OtherBooking.isCustomerBooking = async (id, email) => {
  try {
    const success = await new Promise((resolve, reject) => {
      conn.query(
        "SELECT * FROM otherbooking WHERE customerEmail = ? AND id = ?",
        [email, id],
        (err, res) => {
          if (err) reject(err);
          else {
            if (res.length) resolve(true);
            else resolve(false);
          }
        }
      );
    });

    return { success };
  } catch (error) {
    return { error };
  }
};

OtherBooking.givenRating = async (id, rating) => {
  try {
    const success = await new Promise((resolve, reject) => {
      conn.query(
        "UPDATE otherbooking SET givenRating = ?  WHERE id = ?",
        [rating, id],
        (err, res) => {
          if (err) reject(err);
          else {
            resolve(true);
          }
        }
      );
    });

    if (success) return { success };
    else return { error: "No other booking " };
  } catch (error) {
    return { error };
  }
};

OtherBooking.getBookingsByEmail = async (email) => {
  try {
    const otherbookings = await new Promise((resolve, reject) => {
      conn.query(
        "SELECT * FROM otherbooking WHERE customerEmail = ?",
        [email],
        (err, res) => {
          if (err) reject(err);
          else {
            if (res.length) resolve(res);
            else resolve([]);
          }
        }
      );
    });
    console.log("[model] otherbookings => ", otherbookings);
    return { otherbookings };
  } catch (error) {
    return { error };
  }
};

OtherBooking.filterFacility = async (bookingDate, startTime, endTime) => {
  try {
    const otherbookings = await new Promise((resolve, reject) => {
      conn.query(
        `SELECT *
        FROM otherFacility
        WHERE id NOT IN (
            SELECT facilityId
            FROM otherBooking
            WHERE bookingDate = ?
                AND (
                    (startTime <= ? AND ? <= endTime) OR
                    (? <= startTime AND ? <= endTime) OR
                    (startTime <= ? AND endTime <= ?) OR
                    (? <= startTime AND endTime <= ?) 
                )
        );
        `,
        [
          bookingDate,
          startTime,
          endTime,
          startTime,
          endTime,
          startTime,
          endTime,
          startTime,
          endTime,
        ],
        (err, res) => {
          if (err) reject(err);
          else {
            resolve(res);
          }
        }
      );
    });

    return { otherbookings };
  } catch (error) {
    return { error };
  }
};

OtherBooking.isBookingPossible = async (
  id,
  bookingDate,
  startTime,
  endTime
) => {
  try {
    const response = await new Promise((resolve, reject) => {
      conn.query(
        `SELECT *
        FROM otherfacility
        WHERE id = ? AND id NOT IN (
            SELECT DISTINCT facilityId
            FROM otherBooking
            WHERE bookingDate = ?
                AND (
                  (StartTime <= ? AND endTime >= ?)
                  OR (StartTime <= ? AND endTime >= ?)
                  OR (? <= StartTime AND ? >= StartTime)
                  OR (? <= endTime AND ? >= endTime)
                )
        )`,
        [
          id,
          bookingDate,
          startTime,
          startTime,
          endTime,
          endTime,
          startTime,
          endTime,
          startTime,
          endTime,
        ],
        (err, res) => {
          if (err) reject(err);
          else {
            resolve(res.length > 0);
          }
        }
      );
    });

    return { response };
  } catch (error) {
    return { error };
  }
};

OtherBooking.updateRating = async (id) => {
  try {
    const response = await new Promise((resolve, reject) => {
      conn.query(
        `UPDATE otherfacility SET rating = 
        (SELECT AVG(givenRating) FROM otherbooking WHERE roomId = ?) WHERE id = ?`,
        [id, id],
        (err, res) => {
          if (err) {
            reject(err);
          } else resolve(true);
        }
      );
    });

    return { success: response };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export default OtherBooking;
