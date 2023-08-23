import conn from "../config/db.js";

const Booking = function (booking) {
  this.id = booking.id;
  this.startDate = booking.startDate;
  this.endDate = booking.endDate;
  this.customerEmail = booking.customerEmail;
  this.roomId = booking.roomId;
  this.paymentAmount = booking.paymentAmount;
  this.paymentStatus = booking.paymentStatus || "not paid";
  this.givenRating = booking.givenRating || null;
};

/**
 *
 * @param booking = {startDate, endDate, customerEmail, roomId, paymentAmount}
 */
Booking.create = async (booking) => {
  try {
    const success = await new Promise((resolve, reject) => {
      conn.query("INSERT INTO booking SET ?", booking, (err, res) => {
        if (err) reject(err);
        else {
          resolve(true);
        }
      });
    });

    if (success) return { success: true };
    else return { error: "Booking failed" };
  } catch (error) {
    return { error };
  }
};

Booking.getAllBooking = async () => {
  try {
    const bookings = await new Promise((resolve, reject) => {
      conn.query("SELECT * FROM booking", (err, res) => {
        if (err) reject(err);
        else {
          resolve(res);
        }
      });
    });

    return { bookings };
  } catch (error) {
    return { error };
  }
};

Booking.getBookingById = async (id) => {
  try {
    const booking = await new Promise((resolve, reject) => {
      conn.query("SELECT * FROM booking WHERE id = ?", id, (err, res) => {
        if (err) reject(err);
        else {
          if (res.length) resolve(res[0]);
          else resolve(null);
        }
      });
    });

    if (booking) return { booking };
    else return { error: "No booking found by id" };
  } catch (error) {
    return { error };
  }
};

Booking.confirmPayment = async (id) => {
  try {
    const success = await new Promise((resolve, reject) => {
      conn.query(
        "UPDATE booking SET paymentStatus = 'paid'  WHERE id = ?",
        id,
        (err, res) => {
          if (err) reject(err);
          else {
            resolve(true);
          }
        }
      );
    });

    if (success) return { success };
    else return { error: "No booking" };
  } catch (error) {
    return { error };
  }
};

Booking.isCustomerBooking = async (id, email) => {
  try {
    const success = await new Promise((resolve, reject) => {
      conn.query(
        "SELECT * FROM booking WHERE customerEmail = ? AND id = ?",
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

Booking.givenRating = async (id, rating) => {
  console.log("in model, rating, id -> ", id, rating);
  try {
    const success = await new Promise((resolve, reject) => {
      conn.query(
        "UPDATE booking SET givenRating = ?  WHERE id = ?",
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
    else return { error: "No booking" };
  } catch (error) {
    return { error };
  }
};

Booking.getBookingsByEmail = async (email) => {
  try {
    const bookings = await new Promise((resolve, reject) => {
      conn.query(
        "SELECT * FROM booking WHERE customerEmail = ?",
        [email],
        (err, res) => {
          if (err) reject(err);
          else {
            resolve(res);
          }
        }
      );
    });

    return { bookings };
  } catch (error) {
    return { error };
  }
};

Booking.filterRoom = async (
  checkinDate,
  checkOutdate,
  noOfBedrooms = 0,
  noOfPeople = 0,
  acRequired = 0
) => {
  try {
    const bookings = await new Promise((resolve, reject) => {
      conn.query(
        `SELECT *
        FROM room
        WHERE id NOT IN (
            SELECT DISTINCT roomId
            FROM booking
            WHERE (startDate <= ? AND endDate >= ?)
               OR (startDate <= ? AND endDate >= ?)
               OR (? <= startDate AND ? >= startDate)
               OR (? <= endDate AND ? >= endDate)
        )
        AND bedroomCount >= ?
        AND personCount >= ?
        AND acCount >= ?;
        `,
        [
          checkinDate,
          checkinDate,
          checkOutdate,
          checkOutdate,
          checkinDate,
          checkOutdate,
          checkinDate,
          checkOutdate,
          noOfBedrooms,
          noOfPeople,
          acRequired,
        ],
        (err, res) => {
          if (err) reject(err);
          else {
            resolve(res);
          }
        }
      );
    });

    return { bookings };
  } catch (error) {
    return { error };
  }
};

export default Booking;
