import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
        trim: true, // Trim whitespace from both sides of a string
        minLength: [3, 'Name must be at least 3 characters long'],
        maxLength: [50, 'Name must be at most 50 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true, // Trim whitespace from both sides of a string
        lowercase: true, // Force all email addresses to lowercase
        match: [/\S+@\S+\.\S+/, 'Invalid email'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password must be at least 8 characters long'],
        maxLength: [100, 'Password must be at most 100 characters long'],
    },

}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;