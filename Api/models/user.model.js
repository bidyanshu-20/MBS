import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    rollno: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
    }
})
const User = mongoose.model('Userdata', userSchema);
export default User;