import mongoose from "mongoose";
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const UserDataSchema = new Schema(
    {
    user_id: {
        type: String,
        required: true,
        trim: true,
    },
    user_name: {
        type: String,
        required: true,
        trim: true,
    },
    user_picture: {
        type: String,
        required: true,
        trim: true,
    },
});

const UserModel = mongoose.model("UserModel", UserDataSchema, 'UserModel');

export default UserModel;