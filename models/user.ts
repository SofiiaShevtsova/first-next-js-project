import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    require: [true, "Email must exists!"],
  },
  username: {
    type: String,
    require: [true, "Name must exists!"],
    min: 3,
    max: 10,
  },
  image: {
    type: String,
  },
});

const Users = models.Users || model("Users", UserSchema);

export default Users;
