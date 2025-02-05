const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

// Define the person schema 
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ["chef", "waiter", "manager"],
        required: true
    },
    mail: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String

    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
});

personSchema.pre('save',async function(next){
    const person = this;
    if(!person.isModified('password')) return next();
    try {
        // password hashing 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(person.password, salt);
        person.password = hashedPassword;
        next();
    } catch (err) {
        return next(err);
    }
});

personSchema.methods.comparePassword = async function(password) {
    try {
        const isMatch = await bcrypt.compare(password,this.password);
        return isMatch;
    } catch (err) {
        throw err;
    }
};
    
// Create person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;