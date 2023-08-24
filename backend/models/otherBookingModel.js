import conn from "../config/db.js";

const OtherBooking = function (booking) {
  this.id = booking.id;
  this.startDate = booking.startDate;
  this.endDate = booking.endDate;
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

OtherBooking.filterFacility = async (checkinDate, checkoutdate) => {
  try {
    const otherbookings = await new Promise((resolve, reject) => {
      conn.query(
        `SELECT *
        FROM otherfacility
        WHERE id NOT IN (
            SELECT DISTINCT facilityId
            FROM otherbooking
            WHERE (startDate <= ? AND endDate >= ?)
               OR (startDate <= ? AND endDate >= ?)
               OR (? <= startDate AND ? >= startDate)
               OR (? <= endDate AND ? >= endDate)
        )
        `,
        [
          checkinDate,
          checkinDate,
          checkoutdate,
          checkoutdate,
          checkinDate,
          checkoutdate,
          checkinDate,
          checkoutdate,
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

OtherBooking.isBookingPossible = async (id, startDate, endDate) => {
  try {
    const response = await new Promise((resolve, reject) => {
      conn.query(
        `SELECT *
        FROM otherfacility
        WHERE id = ? AND id NOT IN (
            SELECT DISTINCT facilityId
            FROM otherbooking
            WHERE (startDate <= ? AND endDate >= ?)
               OR (startDate <= ? AND endDate >= ?)
               OR (? <= startDate AND ? >= startDate)
               OR (? <= endDate AND ? >= endDate)
        )`,
        [
          id,
          startDate,
          startDate,
          endDate,
          endDate,
          startDate,
          endDate,
          startDate,
          endDate,
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

export default OtherBooking;
