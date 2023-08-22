import conn from "../config/db.js";
import bcrypt from "bcryptjs";

// Class for User
const User = function (user) {
  this.name = user.name;
  this.email = user.email;
  this.password = user.password;
  this.userType = user.userType || "customer";

  this.nidNumber = user.nidNumber;
  this.phoneNumber = user.phoneNumber;

  this.bankName = user.bankName;
  this.accountNumber = user.accountNumber;

  this.bkashNumber = user.bkashNumber;
};

const makeJson = (user) => {
  return {
    name: user.name,
    email: user.email,
    userType: user.userType,

    nidNumber: user.nidNumber,
    phoneNumber: user.phoneNumber,

    bankName: user.bankName,
    accountNumber: user.accountNumber,

    bkashNumber: user.bkashNumber,
  };
};

User.create = async (name, email, password) => {
  try {
    const user = new User({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await new Promise((resolve, reject) => {
      conn.query("INSERT INTO user SET ?", user, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    const data = makeJson(user);

    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};

User.findUserByEmail = async (email) => {
  try {
    const data = await new Promise((resolve, reject) => {
      conn.query("SELECT * FROM user WHERE email = ?", [email], (err, res) => {
        if (err) reject(err);
        else {
          if (res.length) {
            resolve(res[0]);
          } else {
            resolve(null);
          }
        }
      });
    });

    const jsonData = JSON.parse(JSON.stringify(data));

    return { data: jsonData, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

User.checkLogin = async (email, password) => {
  try {
    const hashPassword = await new Promise((resolve, reject) => {
      conn.query(
        "SELECT password FROM user WHERE email = ?",
        [email],
        (err, res) => {
          if (err) reject(err);
          else {
            if (res.length) {
              resolve(res[0].password);
            } else {
              resolve(null);
            }
          }
        }
      );
    });

    // console.log("password -> ", password);
    // console.log("hashPassword -> ", hashPassword);

    const match = await bcrypt.compare(password, hashPassword);
    console.log("Password match:", match);

    return { data: match, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

User.updateProfile = async (
  email,
  nidNumber,
  phoneNumber,
  bankName,
  accountNumber,
  bkashNumber
) => {
  const update = {
    nidNumber,
    phoneNumber,
    bankName,
    accountNumber,
    bkashNumber,
  };
  try {
    const success = new Promise((resolve, reject) => {
      conn.query(
        "UPDATE user SET ? WHERE email = ?",
        [update, email],
        (err, res) => {
          if (err) reject(err);
          else {
            resolve(true);
          }
        }
      );
    });

    if (success) return (await User.findUserByEmail(email)).data;
    else {
      return { data: null, error: "could not update" };
    }
  } catch (error) {
    return { data: null, error };
  }
};

export default User;
