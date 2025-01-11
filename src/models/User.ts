import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { Document, model, Schema, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId,
  username: string,
  password: string,
  token?: string,
  comparePassword(password: string): Promise<boolean>
}


// Create a Schema corresponding to the document interface.
const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true,
    minlength: [6, 'Password must be at least 6 characters long']
  }
});


UserSchema.pre("save", async function (next) {
  const user = this as IUser;
  if (!user.isModified("password")) return next();
  
  const salt = genSaltSync(10);
  const hash = hashSync(user.password, salt);
  user.password = hash;
  return next();
})

UserSchema.methods.comparePassword = async function (password: string){
  const user = this as IUser;
  return compareSync(password, user.password);
}

const User = model<IUser>('User', UserSchema);

export default User;


