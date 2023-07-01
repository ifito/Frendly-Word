const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 2,
        required: true,
    },
    years: {
        type: Number, min:1, max:100,
        required: true,
    },
    kind: {
        type: String,
        minLength: 3,
        required: true,
    },
    image: {
        type: String,
        required: true,
        validate: /^https?:\/\//,
    },
    need: {
        type: String,
        minLength: 3,
        maxLength: 20,
        required: true,
    },
    location: {
        type: String,
        minLength: 5,
        maxLength: 15,
        required: true,
    },
    description: {
        type: String,
        minLength: 5,
        maxLength: 50,
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    buyers: [{
       type: mongoose.Types.ObjectId,
       ref: 'User', 
    }],
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;